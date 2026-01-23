'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    const router = useRouter();
    const [user, setUser] = useState<{ username: string; isAdmin: boolean } | null>(null);
    const [settings, setSettings] = useState<{ allowPublicUpload: boolean } | null>(null);
    const [mediaList, setMediaList] = useState<any[]>([]);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/auth/session')
            .then(res => res.json())
            .then(data => {
                if (!data.user) {
                    router.push('/login');
                } else {
                    setUser(data.user);
                }
            });
    }, [router]);

    useEffect(() => {
        if (user) {
            Promise.all([
                fetch('/api/settings').then(res => res.json()),
                fetch('/api/admin/media').then(res => res.json())
            ]).then(([settingsData, mediaData]) => {
                setSettings(settingsData);
                if (Array.isArray(mediaData)) {
                    setMediaList(mediaData);
                }
                setLoading(false);
            });
        }
    }, [user]);

    const togglePublicUpload = async () => {
        if (!settings) return;

        setSaving(true);
        try {
            const res = await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ allowPublicUpload: !settings.allowPublicUpload }),
            });
            const data = await res.json();
            setSettings(data);
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/');
    };

    if (loading || !settings) {
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
            backgroundColor: '#0a0a0a',
            color: '#fff',
            fontFamily: 'system-ui, sans-serif',
            paddingBottom: '40px',
        }}>
            <h1 style={{ marginBottom: '40px', fontSize: '1.5rem' }}>⚙️ Admin Panel</h1>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                maxWidth: '800px',
                width: '100%',
                padding: '0 20px',
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    backgroundColor: '#1a1a1a',
                    borderRadius: '8px',
                }}>
                    <span>Allow Public Upload</span>
                    <button
                        onClick={togglePublicUpload}
                        disabled={saving}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: settings.allowPublicUpload ? '#43b581' : '#333',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        {settings.allowPublicUpload ? 'ON' : 'OFF'}
                    </button>
                </div>

                <div style={{
                    backgroundColor: '#1a1a1a',
                    borderRadius: '8px',
                    padding: '16px',
                }}>
                    <h2 style={{ marginBottom: '16px', fontSize: '1.2rem' }}>Uploaded Media ({mediaList.length})</h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '16px',
                    }}>
                        {mediaList.map((media) => (
                            <a
                                key={media.id}
                                href={`/${media.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'block',
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    backgroundColor: '#2b2b2b',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    transition: 'transform 0.2s',
                                }}
                            >
                                <div style={{
                                    aspectRatio: '16/9',
                                    backgroundColor: '#000',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
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
                                    <div style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        padding: '4px 8px',
                                        background: 'rgba(0,0,0,0.7)',
                                        fontSize: '0.8rem',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}>
                                        {media.originalName}
                                    </div>
                                </div>
                                <div style={{ padding: '8px', fontSize: '0.8rem', color: '#aaa' }}>
                                    <div>{(media.size / 1024 / 1024).toFixed(2)} MB</div>
                                    <div>{new Date(media.createdAt).toLocaleDateString()}</div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                <a
                    href="/"
                    style={{
                        textAlign: 'center',
                        color: '#5865f2',
                        textDecoration: 'none',
                    }}
                >
                    ← Back to Upload
                </a>

                <button
                    onClick={handleLogout}
                    style={{
                        padding: '12px',
                        backgroundColor: 'transparent',
                        color: '#ff5555',
                        border: '1px solid #ff5555',
                        borderRadius: '8px',
                        cursor: 'pointer',
                    }}
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
}
