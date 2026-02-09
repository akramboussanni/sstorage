'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, useDialog } from '@/components/Dialog';
import { Toast, useToast } from '@/components/Toast';
import { MediaCard, MediaItem, spinnerStyles } from '@/components/MediaCard';
import { UserPanel } from '@/components/UserPanel';
import { DriveCard } from '@/components/DriveCard';
import { ContextMenu, useContextMenu } from '@/components/ContextMenu';

type CompressionQuality = 'none' | 'high' | 'balanced' | 'small';

interface Settings {
  allowPublicUpload: boolean;
  allowRegistration?: boolean;
  defaultCompression: CompressionQuality;
  showNoCompression: boolean;
}

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<{ username: string; isAdmin: boolean; mustChangePassword?: boolean } | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [noCompression, setNoCompression] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [lastUploadId, setLastUploadId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [myUploads, setMyUploads] = useState<MediaItem[]>([]);
  const [drives, setDrives] = useState<any[]>([]);
  const { dialog, showDialog, closeDialog } = useDialog();
  const { toast, showToast } = useToast();
  const { contextMenu, closeContextMenu } = useContextMenu();
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const isVideo = file?.type.startsWith('video/');

  const copyToClipboard = async (url: string) => {
    await navigator.clipboard.writeText(url);
    showToast('Link copied!');
  };

  const refreshUploads = useCallback(() => {
    if (user) {
      fetch('/api/media/my').then(res => res.json()).then(data => {
        if (Array.isArray(data)) setMyUploads(data);
      });
      fetch('/api/drives').then(res => res.json()).then(data => {
        if (Array.isArray(data)) setDrives(data);
      });
    }
  }, [user]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.reload();
  };

  useEffect(() => {
    Promise.all([
      fetch('/api/auth/session').then(res => res.json()),
      fetch('/api/settings').then(res => res.json()),
    ]).then(([sessionData, settingsData]) => {
      if (sessionData.user?.mustChangePassword) {
        router.push('/change-password');
        return;
      }
      setUser(sessionData.user);
      setSettings(settingsData);
      if (sessionData.user) {
        Promise.all([
          fetch('/api/media/my').then(res => res.json()),
          fetch('/api/drives').then(res => res.json()),
        ]).then(([myUploadsData, drivesData]) => {
          if (Array.isArray(myUploadsData)) setMyUploads(myUploadsData);
          if (Array.isArray(drivesData)) setDrives(drivesData);
        });
      }
      setLoading(false);
    });
  }, [router]);

  const canUpload = user || settings?.allowPublicUpload;

  // Polling for transcode status
  useEffect(() => {
    if (!lastUploadId) return;

    const poll = async () => {
      try {
        const res = await fetch(`/api/media/${lastUploadId}/status`);
        const data = await res.json();

        setMyUploads(prev => prev.map(m =>
          m.id === lastUploadId ? { ...m, transcodeStatus: data.transcodeStatus, transcodeError: data.transcodeError } : m
        ));

        if (data.transcodeStatus === 'completed' || data.transcodeStatus === 'failed') {
          if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
            pollIntervalRef.current = null;
          }
          setLastUploadId(null);
        }
      } catch (err) {
        console.error('Failed to poll transcode status:', err);
      }
    };

    pollIntervalRef.current = setInterval(poll, 2000);
    poll();

    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, [lastUploadId]);

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const CHUNK_SIZE = 50 * 1024 * 1024; // 50MB

      if (file.size > CHUNK_SIZE) {
        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
        const uploadId = crypto.randomUUID();

        for (let i = 0; i < totalChunks; i++) {
          const start = i * CHUNK_SIZE;
          const end = Math.min(start + CHUNK_SIZE, file.size);
          const chunk = file.slice(start, end);

          const formData = new FormData();
          formData.append('file', chunk, file.name);

          // Use noCompression checkbox or default compression from admin settings
          if (isVideo) {
            const quality = noCompression ? 'none' : (settings?.defaultCompression || 'balanced');
            formData.append('quality', quality);
          }


          const params = new URLSearchParams({
            chunkIndex: i.toString(),
            totalChunks: totalChunks.toString(),
            uploadId
          });

          const res = await fetch(`/api/upload?${params.toString()}`, {
            method: 'POST',
            body: formData,
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.error || 'Upload failed');
          }

          if (i === totalChunks - 1) {
            setFile(null);
            setNoCompression(false);
            refreshUploads();

            if (data.transcodeStatus === 'pending') {
              setLastUploadId(data.id);
            }
          }
        }
      } else {
        const formData = new FormData();
        formData.append('file', file);

        // Use noCompression checkbox or default compression from admin settings
        if (isVideo) {
          const quality = noCompression ? 'none' : (settings?.defaultCompression || 'balanced');
          formData.append('quality', quality);
        }


        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Upload failed');
        }

        setFile(null);
        setNoCompression(false);
        refreshUploads();

        if (data.transcodeStatus === 'pending') {
          setLastUploadId(data.id);
        }
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (id: string) => {
    showDialog('Delete File', 'Are you sure you want to delete this file?', 'confirm', async () => {
      try {
        const res = await fetch(`/api/media/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setMyUploads(prev => prev.filter(m => m.id !== id));
        } else {
          showDialog('Error', 'Failed to delete file');
        }
      } catch (err) {
        showDialog('Error', 'Error deleting file');
      }
    });
  };

  const handleCreateDrive = () => {
    showDialog('Create Drive', 'Enter drive name:', 'prompt', undefined, (name: string) => {
      if (!name || !name.trim()) return;

      fetch('/api/drives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), description: '' })
      }).then(res => res.json()).then(data => {
        if (data.id) {
          showToast('Drive created!');
          refreshUploads();
        } else {
          showToast(data.error || 'Failed to create drive', 'error');
        }
      });
    }, 'Drive name');
  };

  const handleDeleteDrive = (id: string) => {
    const drive = drives.find(d => d.id === id);
    showDialog('Delete Drive', `Are you sure you want to delete "${drive?.name}"? This will delete all files and folders inside.`, 'confirm', async () => {
      try {
        const res = await fetch(`/api/drives/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setDrives(prev => prev.filter(d => d.id !== id));
          showToast('Drive deleted!');
        } else {
          showDialog('Error', 'Failed to delete drive');
        }
      } catch (err) {
        showDialog('Error', 'Error deleting drive');
      }
    });
  };

  const handleRenameDrive = (id: string, newName: string) => {
    fetch(`/api/drives/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName })
    }).then(async res => {
      const data = await res.json();
      if (res.ok) {
        showToast('Drive renamed!');
        refreshUploads();
      } else {
        showToast(data.error || 'Failed to rename drive', 'error');
      }
    }).catch(() => {
      showToast('Failed to rename drive', 'error');
    });
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--background)',
        color: 'var(--foreground)',
      }}>
        <span style={{ fontSize: '0.9375rem', color: 'var(--muted-foreground)' }}>Loading…</span>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 48,
      paddingBottom: 48,
      paddingLeft: 20,
      paddingRight: 20,
      background: 'var(--background)',
      color: 'var(--foreground)',
    }}>
      <Dialog state={dialog} onClose={closeDialog} />
      <Toast message={toast.message} show={toast.show} type={toast.type} />
      <ContextMenu
        items={contextMenu.items}
        position={contextMenu.position}
        onClose={closeContextMenu}
      />

      <h1 style={{ marginBottom: 8, fontSize: '1.75rem', fontWeight: 600 }}>SStorage</h1>
      <p style={{ marginBottom: 32, fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>Upload and share files</p>

      {!canUpload ? (
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: 20, color: 'var(--muted-foreground)', fontSize: '0.9375rem' }}>
            You need to sign in to upload.
          </p>
          <a href="/login" className="app-btn app-btn-primary" style={{ textDecoration: 'none' }}>
            Sign in
          </a>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          maxWidth: 420,
          width: '100%',
        }}>
          <label
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: 160,
              border: '2px dashed var(--border)',
              borderRadius: 'var(--radius-lg)',
              cursor: 'pointer',
              transition: 'border-color 0.2s, background 0.2s',
              background: 'var(--surface)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-focus)';
              e.currentTarget.style.background = 'var(--surface-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.background = 'var(--surface)';
            }}
          >
            <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} style={{ display: 'none' }} />
            {file ? (
              <span style={{ color: 'var(--accent)', fontWeight: 500 }}>{file.name}</span>
            ) : (
              <span style={{ color: 'var(--muted-foreground)', fontSize: '0.9375rem' }}>Choose a file</span>
            )}
          </label>

          {isVideo && settings?.showNoCompression && (
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              width: '100%',
              padding: '12px 14px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              cursor: 'pointer',
            }}>
              <input
                type="checkbox"
                checked={noCompression}
                onChange={(e) => setNoCompression(e.target.checked)}
                style={{ accentColor: 'var(--accent)', width: 18, height: 18 }}
              />
              <div>
                <span style={{ fontSize: '0.9375rem' }}>No compression</span>
                <div style={{ fontSize: '0.8125rem', color: 'var(--muted-foreground)' }}>Keep original video quality</div>
              </div>
            </label>
          )}

          <button
            type="button"
            onClick={handleUpload}
            disabled={!file || uploading}
            className="app-btn app-btn-primary"
            style={{ width: '100%', padding: '12px 24px', fontSize: '1rem' }}
          >
            {uploading ? 'Uploading…' : 'Upload'}
          </button>

          {error && <p style={{ color: 'var(--danger)', fontSize: '0.875rem', margin: 0 }}>{error}</p>}

          <UserPanel
            user={user}
            allowRegistration={settings?.allowRegistration}
            onLogout={handleLogout}
          />
        </div>
      )}

      {user && myUploads.length > 0 && (
        <section style={{ marginTop: 48, width: '100%', maxWidth: 800 }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 16, color: 'var(--muted-foreground)' }}>
            My uploads · {myUploads.length}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
            {myUploads.map((media) => (
              <MediaCard key={media.id} media={media} onDelete={handleDelete} onCopyLink={copyToClipboard} />
            ))}
          </div>
        </section>
      )}

      {user && (
        <section style={{ marginTop: 48, width: '100%', maxWidth: 800 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, color: 'var(--muted-foreground)' }}>
              My drives · {drives.length}
            </h2>
            <button type="button" onClick={handleCreateDrive} className="app-btn app-btn-secondary">
              New drive
            </button>
          </div>
          {drives.length === 0 ? (
            <p style={{ color: 'var(--muted-foreground)', textAlign: 'center', padding: 24, fontSize: '0.9375rem' }}>
              No drives yet. Create one to organize files in folders.
            </p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
              {drives.map((drive) => (
                <DriveCard 
                  key={drive.id} 
                  drive={drive} 
                  onDelete={handleDeleteDrive}
                  onRename={handleRenameDrive}
                />
              ))}
            </div>
          )}
        </section>
      )}

      <style>{spinnerStyles}</style>
    </div>
  );
}

