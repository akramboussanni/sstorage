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

  useEffect(() => {
    Promise.all([
      fetch('/api/auth/session').then(res => res.json()),
      fetch('/api/settings').then(res => res.json()),
    ]).then(([sessionData, settingsData]) => {
      setUser(sessionData.user);
      setSettings(settingsData);
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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
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
      justifyContent: 'center',
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

          {user && (
            <a
              href="/admin"
              style={{
                marginTop: '20px',
                color: '#666',
                textDecoration: 'none',
              }}
            >
              Admin Panel →
            </a>
          )}
        </div>
      )}
    </div>
  );
}
