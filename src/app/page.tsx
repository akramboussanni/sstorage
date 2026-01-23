'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [user, setUser] = useState<{ username: string; isAdmin: boolean } | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ url: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<{ allowPublicUpload: boolean } | null>(null);
  const [loading, setLoading] = useState(true);

  const [myUploads, setMyUploads] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/api/auth/session').then(res => res.json()),
      fetch('/api/settings').then(res => res.json()),
      fetch('/api/media/my').then(res => res.json()), // Fetch my uploads
    ]).then(([sessionData, settingsData, myUploadsData]) => {
      setUser(sessionData.user);
      setSettings(settingsData);
      if (Array.isArray(myUploadsData)) {
        setMyUploads(myUploadsData);
      }
      setLoading(false);
    });
  }, []);

  const canUpload = user || settings?.allowPublicUpload;

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

      setResult({ url: window.location.origin + data.url });
      setFile(null);

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
            <a
              href="/admin"
              style={{
                marginTop: '10px',
                color: '#666',
                textDecoration: 'none',
              }}
            >
              Admin Panel →
            </a>
          ) : (
            <a
              href="/login"
              style={{
                marginTop: '10px',
                color: '#666',
                textDecoration: 'none',
                fontSize: '0.9rem',
              }}
            >
              Admin Login →
            </a>
          )}
        </div>
      )}

      {/* My Uploads Section */}
      {myUploads.length > 0 && (
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
