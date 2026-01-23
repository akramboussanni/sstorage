'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    id: string;
    username: string;
    isAdmin: boolean;
    createdAt: string;
    _count: { media: number };
}

interface Settings {
    allowPublicUpload: boolean;
    allowRegistration: boolean;
    smtpHost: string | null;
    smtpPort: number | null;
    smtpUser: string | null;
    smtpFrom: string | null;
    smtpConfigured: boolean;
}

export default function AdminPage() {
    const router = useRouter();
    const [user, setUser] = useState<{ username: string; isAdmin: boolean } | null>(null);
    const [settings, setSettings] = useState<Settings | null>(null);
    const [mediaList, setMediaList] = useState<any[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'media' | 'settings' | 'users'>('media');

    // SMTP form state
    const [smtpHost, setSmtpHost] = useState('');
    const [smtpPort, setSmtpPort] = useState('');
    const [smtpUser, setSmtpUser] = useState('');
    const [smtpPassword, setSmtpPassword] = useState('');
    const [smtpFrom, setSmtpFrom] = useState('');
    const [smtpSaving, setSmtpSaving] = useState(false);
    const [smtpMessage, setSmtpMessage] = useState('');

    useEffect(() => {
        fetch('/api/auth/session')
            .then(res => res.json())
            .then(data => {
                if (!data.user) {
                    router.push('/login');
                } else if (!data.user.isAdmin) {
                    router.push('/');
                } else {
                    setUser(data.user);
                }
            });
    }, [router]);

    useEffect(() => {
        if (user) {
            Promise.all([
                fetch('/api/settings').then(res => res.json()),
                fetch('/api/admin/media').then(res => res.json()),
                fetch('/api/admin/users').then(res => res.json()),
            ]).then(([settingsData, mediaData, usersData]) => {
                setSettings(settingsData);
                setSmtpHost(settingsData.smtpHost || '');
                setSmtpPort(settingsData.smtpPort?.toString() || '');
                setSmtpUser(settingsData.smtpUser || '');
                setSmtpFrom(settingsData.smtpFrom || '');
                if (Array.isArray(mediaData)) {
                    setMediaList(mediaData);
                }
                if (Array.isArray(usersData)) {
                    setUsers(usersData);
                }
                setLoading(false);
            });
        }
    }, [user]);

    const toggleSetting = async (key: 'allowPublicUpload' | 'allowRegistration') => {
        if (!settings) return;

        setSaving(true);
        try {
            const res = await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ [key]: !settings[key] }),
            });
            const data = await res.json();
            setSettings(data);
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const saveSmtpSettings = async () => {
        setSmtpSaving(true);
        setSmtpMessage('');
        try {
            const res = await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    smtpHost: smtpHost || null,
                    smtpPort: smtpPort || null,
                    smtpUser: smtpUser || null,
                    smtpPassword: smtpPassword || null,
                    smtpFrom: smtpFrom || null,
                }),
            });
            const data = await res.json();
            setSettings(data);
            setSmtpPassword(''); // Clear password field after save
            setSmtpMessage('SMTP settings saved!');
        } catch (err) {
            setSmtpMessage('Failed to save SMTP settings');
        } finally {
            setSmtpSaving(false);
        }
    };

    const deleteUser = async (userId: string) => {
        if (!confirm('Are you sure you want to delete this user?')) return;

        try {
            const res = await fetch(`/api/admin/users?id=${userId}`, { method: 'DELETE' });
            if (res.ok) {
                setUsers(prev => prev.filter(u => u.id !== userId));
            } else {
                const data = await res.json();
                alert(data.error || 'Failed to delete user');
            }
        } catch (err) {
            console.error(err);
            alert('Error deleting user');
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
            <h1 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>⚙️ Admin Panel</h1>

            {/* Tab Navigation */}
            <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '24px',
            }}>
                {(['media', 'settings', 'users'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: activeTab === tab ? '#5865f2' : '#1a1a1a',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            textTransform: 'capitalize',
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                maxWidth: '800px',
                width: '100%',
                padding: '0 20px',
            }}>
                {/* Settings Tab */}
                {activeTab === 'settings' && (
                    <>
                        {/* Toggles */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            backgroundColor: '#1a1a1a',
                            borderRadius: '8px',
                            padding: '16px',
                        }}>
                            <h3 style={{ margin: 0, marginBottom: '8px' }}>General Settings</h3>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                <span>Allow Public Upload</span>
                                <button
                                    onClick={() => toggleSetting('allowPublicUpload')}
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
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                <span>Allow Registration</span>
                                <button
                                    onClick={() => toggleSetting('allowRegistration')}
                                    disabled={saving}
                                    style={{
                                        padding: '8px 16px',
                                        backgroundColor: settings.allowRegistration ? '#43b581' : '#333',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {settings.allowRegistration ? 'ON' : 'OFF'}
                                </button>
                            </div>
                        </div>

                        {/* SMTP Configuration */}
                        <div style={{
                            backgroundColor: '#1a1a1a',
                            borderRadius: '8px',
                            padding: '16px',
                        }}>
                            <h3 style={{ margin: 0, marginBottom: '16px' }}>
                                SMTP Configuration
                                {settings.smtpConfigured && (
                                    <span style={{ color: '#43b581', fontSize: '0.8rem', marginLeft: '8px' }}>
                                        ✓ Configured
                                    </span>
                                )}
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <input
                                    type="text"
                                    placeholder="SMTP Host (e.g., smtp.gmail.com)"
                                    value={smtpHost}
                                    onChange={(e) => setSmtpHost(e.target.value)}
                                    style={inputStyle}
                                />
                                <input
                                    type="number"
                                    placeholder="SMTP Port (e.g., 587)"
                                    value={smtpPort}
                                    onChange={(e) => setSmtpPort(e.target.value)}
                                    style={inputStyle}
                                />
                                <input
                                    type="text"
                                    placeholder="SMTP Username"
                                    value={smtpUser}
                                    onChange={(e) => setSmtpUser(e.target.value)}
                                    style={inputStyle}
                                />
                                <input
                                    type="password"
                                    placeholder="SMTP Password (leave blank to keep current)"
                                    value={smtpPassword}
                                    onChange={(e) => setSmtpPassword(e.target.value)}
                                    style={inputStyle}
                                />
                                <input
                                    type="email"
                                    placeholder="From Email Address"
                                    value={smtpFrom}
                                    onChange={(e) => setSmtpFrom(e.target.value)}
                                    style={inputStyle}
                                />

                                {smtpMessage && (
                                    <p style={{ color: smtpMessage.includes('Failed') ? '#ff5555' : '#43b581', margin: 0 }}>
                                        {smtpMessage}
                                    </p>
                                )}

                                <button
                                    onClick={saveSmtpSettings}
                                    disabled={smtpSaving}
                                    style={{
                                        padding: '12px',
                                        backgroundColor: '#5865f2',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: smtpSaving ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    {smtpSaving ? 'Saving...' : 'Save SMTP Settings'}
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {/* Users Tab */}
                {activeTab === 'users' && (
                    <div style={{
                        backgroundColor: '#1a1a1a',
                        borderRadius: '8px',
                        padding: '16px',
                    }}>
                        <h3 style={{ margin: 0, marginBottom: '16px' }}>Users ({users.length})</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {users.map(u => (
                                <div
                                    key={u.id}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '12px',
                                        backgroundColor: '#2b2b2b',
                                        borderRadius: '6px',
                                    }}
                                >
                                    <div>
                                        <strong style={{ color: u.isAdmin ? '#faa61a' : '#fff' }}>
                                            {u.username}
                                            {u.isAdmin && ' 👑'}
                                        </strong>
                                        <div style={{ fontSize: '0.8rem', color: '#888' }}>
                                            {u._count.media} uploads • Joined {new Date(u.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    {!u.isAdmin && (
                                        <button
                                            onClick={() => deleteUser(u.id)}
                                            style={{
                                                padding: '6px 12px',
                                                backgroundColor: 'transparent',
                                                color: '#ff5555',
                                                border: '1px solid #ff5555',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '0.8rem',
                                            }}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Media Tab */}
                {activeTab === 'media' && (
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
                                <div key={media.id} style={{ position: 'relative' }}>
                                    <a
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
                                            {media.ip && <div style={{ color: '#5865f2', marginTop: '4px' }}>IP: {media.ip}</div>}
                                        </div>
                                    </a>
                                    <button
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            if (!confirm('Delete this file?')) return;
                                            try {
                                                const res = await fetch(`/api/media/${media.id}`, { method: 'DELETE' });
                                                if (res.ok) {
                                                    setMediaList(prev => prev.filter(m => m.id !== media.id));
                                                } else {
                                                    alert('Failed to delete');
                                                }
                                            } catch (err) {
                                                console.error(err);
                                                alert('Error deleting');
                                            }
                                        }}
                                        style={{
                                            position: 'absolute',
                                            top: '8px',
                                            right: '8px',
                                            backgroundColor: 'rgba(0,0,0,0.7)',
                                            color: '#ff5555',
                                            border: 'none',
                                            borderRadius: '4px',
                                            padding: '6px 10px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

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

const inputStyle: React.CSSProperties = {
    padding: '12px',
    backgroundColor: '#2b2b2b',
    color: '#fff',
    border: '1px solid #333',
    borderRadius: '6px',
    fontSize: '0.9rem',
};
