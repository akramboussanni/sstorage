'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

type TranscodeStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'not_required';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<{ username: string; isAdmin: boolean; mustChangePassword?: boolean } | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ url: string; id: string; transcodeStatus: TranscodeStatus } | null>(null);
  const [transcodeStatus, setTranscodeStatus] = useState<TranscodeStatus | null>(null);
  const [transcodeError, setTranscodeError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<{ allowPublicUpload: boolean; allowRegistration?: boolean } | null>(null);
  const [loading, setLoading] = useState(true);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [myUploads, setMyUploads] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/api/auth/session').then(res => res.json()),
      fetch('/api/settings').then(res => res.json()),
    ]).then(([sessionData, settingsData]) => {
      // Check if user must change password
      if (sessionData.user?.mustChangePassword) {
        router.push('/change-password');
        return;
      }

      setUser(sessionData.user);
      setSettings(settingsData);

      // Only fetch my uploads if user is logged in
      if (sessionData.user) {
        fetch('/api/media/my').then(res => res.json()).then(myUploadsData => {
          if (Array.isArray(myUploadsData)) {
            setMyUploads(myUploadsData);
          }
        });
      }

      setLoading(false);
    });
  }, [router]);

  const canUpload = user || settings?.allowPublicUpload;

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  const startPollingTranscodeStatus = (mediaId: string) => {
    // Clear any existing polling
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
    }

    pollIntervalRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/media/${mediaId}/status`);
        const data = await res.json();

        setTranscodeStatus(data.transcodeStatus);

        if (data.transcodeStatus === 'failed') {
          setTranscodeError(data.transcodeError || 'Transcoding failed');
          clearInterval(pollIntervalRef.current!);
          pollIntervalRef.current = null;
        }

        if (data.transcodeStatus === 'completed') {
          clearInterval(pollIntervalRef.current!);
          pollIntervalRef.current = null;
          // Refresh my uploads list
          fetch('/api/media/my').then(res => res.json()).then(data => {
            if (Array.isArray(data)) setMyUploads(data);
          });
        }
      } catch (err) {
        console.error('Failed to poll transcode status:', err);
      }
    }, 2000);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      const uploadResult = { url: window.location.origin + data.url, id: data.id, transcodeStatus: data.transcodeStatus };
      setResult(uploadResult);
      setTranscodeStatus(data.transcodeStatus);
      setTranscodeError(null);
      setFile(null);

      // If it's a video, start polling for transcode status
      if (data.transcodeStatus === 'pending') {
        startPollingTranscodeStatus(data.id);
      }

      // Refresh my uploads
      fetch('/api/media/my').then(res => res.json()).then(data => {
        if (Array.isArray(data)) setMyUploads(data);
      });

    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const res = await fetch(`/api/media/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMyUploads(prev => prev.filter(m => m.id !== id));
      } else {
        alert('Failed to delete');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting file');
    }
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
      <h1 style={{ marginBottom: '30px', fontSize: '2rem' }}>📁 SStorage</h1>

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
              accept="image/*,video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              style={{ display: 'none' }}
            />
            {file ? (
              <span style={{ color: '#5865f2' }}>{file.name}</span>
            ) : (
              <span style={{ color: '#666' }}>Click to select image, GIF, or video</span>
            )}
          </label>

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

          {error && (
            <p style={{ color: '#ff5555' }}>{error}</p>
          )}

          {result && (
            <div style={{
              padding: '16px',
              backgroundColor: '#1a1a1a',
              borderRadius: '8px',
              width: '100%',
              textAlign: 'center',
            }}>
              <p style={{ marginBottom: '10px', color: '#5865f2' }}>Uploaded!</p>

              {/* Transcoding Status */}
              {transcodeStatus && transcodeStatus !== 'not_required' && (
                <div style={{
                  marginBottom: '12px',
                  padding: '10px',
                  backgroundColor: '#0a0a0a',
                  borderRadius: '6px',
                  border: '1px solid #333',
                }}>
                  {(transcodeStatus === 'pending' || transcodeStatus === 'processing') && (
                    <p style={{ color: '#faa61a', margin: 0 }}>
                      ⏳ Transcoding video for Discord compatibility...
                      <span style={{
                        display: 'inline-block',
                        marginLeft: '8px',
                        animation: 'pulse 1.5s ease-in-out infinite',
                      }}>
                        {transcodeStatus === 'pending' ? '(queued)' : '(in progress)'}
                      </span>
                    </p>
                  )}
                  {transcodeStatus === 'completed' && (
                    <p style={{ color: '#43b581', margin: 0 }}>
                      ✅ Video transcoded successfully! Ready for Discord.
                    </p>
                  )}
                  {transcodeStatus === 'failed' && (
                    <div>
                      <p style={{ color: '#ff5555', margin: 0 }}>
                        ❌ Transcoding failed
                      </p>
                      {transcodeError && (
                        <p style={{ color: '#888', fontSize: '0.8rem', marginTop: '4px', margin: 0 }}>
                          {transcodeError}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              <input
                type="text"
                value={result.url}
                readOnly
                onClick={(e) => (e.target as HTMLInputElement).select()}
                style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: '#0a0a0a',
                  color: '#fff',
                  border: '1px solid #333',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                }}
              />
            </div>
          )}

          {user ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
              <span style={{ color: '#888', fontSize: '0.9rem' }}>
                Logged in as <strong style={{ color: '#5865f2' }}>{user.username}</strong>
              </span>
              <div style={{ display: 'flex', gap: '16px' }}>
                {user.isAdmin && (
                  <a href="/admin" style={{ color: '#5865f2', textDecoration: 'none', fontSize: '0.9rem' }}>
                    Admin Panel
                  </a>
                )}
                <a href="/change-password" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>
                  Change Password
                </a>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
              <a
                href="/login"
                style={{
                  color: '#5865f2',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                }}
              >
                Login
              </a>
              {settings?.allowRegistration && (
                <a
                  href="/register"
                  style={{
                    color: '#666',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                  }}
                >
                  Register
                </a>
              )}
            </div>
          )}
        </div>
      )}

      {/* My Uploads Section - Only shown for logged-in users */}
      {user && myUploads.length > 0 && (
        <div style={{ marginTop: '60px', width: '100%', maxWidth: '800px' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
            My Uploads ({myUploads.length})
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '12px',
          }}>
            {myUploads.map((media) => (
              <div key={media.id} style={{ position: 'relative' }}>
                <a
                  href={`/${media.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    color: 'inherit',
                    backgroundColor: '#1a1a1a',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    aspectRatio: '16/9',
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {media.mimeType.startsWith('video/') ? (
                      <video
                        src={`/api/media/${media.id}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <img
                        src={`/api/media/${media.id}`}
                        alt={media.originalName}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )}
                  </div>
                </a>
                <button
                  onClick={() => handleDelete(media.id)}
                  style={{
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    color: '#ff5555',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                  }}
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
