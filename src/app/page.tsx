'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, useDialog } from '@/components/Dialog';
import { Toast, useToast } from '@/components/Toast';
import { MediaCard, MediaItem, spinnerStyles } from '@/components/MediaCard';
import { UserPanel } from '@/components/UserPanel';
import { DriveCard } from '@/components/DriveCard';

type CompressionQuality = 'none' | 'high' | 'balanced' | 'small';

interface Settings {
  allowPublicUpload: boolean;
  allowRegistration?: boolean;
  defaultCompression: CompressionQuality;
  showNoCompression: boolean;
  showPrivateOption: boolean;
  forcePrivate: boolean;
}

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<{ username: string; isAdmin: boolean; mustChangePassword?: boolean } | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [noCompression, setNoCompression] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [lastUploadId, setLastUploadId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [myUploads, setMyUploads] = useState<MediaItem[]>([]);
  const [drives, setDrives] = useState<any[]>([]);
  const { dialog, showDialog, closeDialog } = useDialog();
  const { toast, showToast } = useToast();
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

          if (user && isPrivate) {
            formData.append('isPrivate', 'true');
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

        if (user && isPrivate) {
          formData.append('isPrivate', 'true');
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
    const name = prompt('Enter drive name:');
    if (!name) return;

    fetch('/api/drives', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description: '' })
    }).then(res => res.json()).then(data => {
      if (data.id) {
        showToast('Drive created!');
        refreshUploads();
      } else {
        showToast(data.error || 'Failed to create drive', 'error');
      }
    });
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0a0a',
        color: '#fff',
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '60px',
      paddingBottom: '40px',
      backgroundColor: '#0a0a0a',
      color: '#fff',
      padding: '20px',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <Dialog state={dialog} onClose={closeDialog} />
      <Toast message={toast.message} show={toast.show} type={toast.type} />

      <h1 style={{ marginBottom: '10px', fontSize: '2rem' }}>📁 SStorage</h1>

      {/* Privacy Disclaimer */}
      {settings && (
        <div style={{
          marginBottom: '16px',
          color: '#666',
          fontSize: '0.8rem',
          textAlign: 'center',
          maxWidth: '500px',
        }}>
          {settings.forcePrivate ? (
            'All uploads are private — hidden from admin view'
          ) : (
            'Uploads are visible to admin unless marked private'
          )}
        </div>
      )}

      {!canUpload ? (
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '20px', color: '#888' }}>
            Public uploads are disabled. Please login to upload.
          </p>
          <a
            href="/login"
            style={{
              padding: '12px 24px',
              backgroundColor: '#5865f2',
              color: '#fff',
              borderRadius: '8px',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Login
          </a>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          maxWidth: '500px',
          width: '100%',
        }}>
          {/* File Input */}
          <label
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '200px',
              border: '2px dashed #333',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
          >
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              style={{ display: 'none' }}
            />
            {file ? (
              <span style={{ color: '#5865f2' }}>{file.name}</span>
            ) : (
              <span style={{ color: '#666' }}>Click to select any file</span>
            )}
          </label>

          {/* Upload Options */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%',
          }}>
            {/* No Compression Checkbox - only for videos, controlled by admin */}
            {isVideo && settings?.showNoCompression && (
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                backgroundColor: '#1a1a1a',
                borderRadius: '8px',
                cursor: 'pointer',
              }}>
                <input
                  type="checkbox"
                  checked={noCompression}
                  onChange={(e) => setNoCompression(e.target.checked)}
                  style={{ accentColor: '#5865f2', width: '18px', height: '18px' }}
                />
                <div>
                  <div>🎬 No Compression</div>
                  <div style={{ fontSize: '0.8rem', color: '#888' }}>
                    Keep original quality (not recommended for large files)
                  </div>
                </div>
              </label>
            )}

            {/* Privacy Toggle - only for logged in users, controlled by admin */}
            {user && settings?.showPrivateOption && (
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                backgroundColor: '#1a1a1a',
                borderRadius: '8px',
                cursor: 'pointer',
              }}>
                <input
                  type="checkbox"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  style={{ accentColor: '#5865f2', width: '18px', height: '18px' }}
                />
                <div>
                  <div>🔒 Private Upload</div>
                  <div style={{ fontSize: '0.8rem', color: '#888' }}>
                    Hidden from admin view
                  </div>
                </div>
              </label>
            )}
          </div>

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            style={{
              padding: '12px 24px',
              backgroundColor: file && !uploading ? '#5865f2' : '#333',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: file && !uploading ? 'pointer' : 'not-allowed',
              fontSize: '1rem',
              width: '100%',
            }}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>

          {error && <p style={{ color: '#ff5555' }}>{error}</p>}

          {/* User Panel */}
          <UserPanel
            user={user}
            allowRegistration={settings?.allowRegistration}
            onLogout={handleLogout}
          />
        </div>
      )}

      {/* My Uploads Section */}
      {user && myUploads.length > 0 && (
        <div style={{ marginTop: '60px', width: '100%', maxWidth: '800px' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
            My Uploads ({myUploads.length})
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '16px',
          }}>
            {myUploads.map((media) => (
              <MediaCard
                key={media.id}
                media={media}
                onDelete={handleDelete}
                onCopyLink={copyToClipboard}
                showPrivateBadge={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* My Drives Section */}
      {user && (
        <div style={{ marginTop: '60px', width: '100%', maxWidth: '800px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
            <h2 style={{ fontSize: '1.2rem', margin: 0 }}>
              My Drives ({drives.length})
            </h2>
            <button
              onClick={handleCreateDrive}
              style={{
                backgroundColor: '#1a1a1a',
                color: '#fff',
                border: '1px solid #333',
                padding: '4px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
            >
              + Create Drive
            </button>
          </div>
          {drives.length === 0 ? (
            <p style={{ color: '#666', textAlign: 'center', padding: '20px' }}>No drives created yet</p>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '16px',
            }}>
              {drives.map((drive) => (
                <DriveCard key={drive.id} drive={drive} />
              ))}
            </div>
          )}
        </div>
      )}

      <style>{spinnerStyles}</style>
    </div>
  );
}

