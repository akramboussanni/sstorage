'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    const router = useRouter();
    const [user, setUser] = useState<{ username: string; isAdmin: boolean } | null>(null);
    const [settings, setSettings] = useState<{ allowPublicUpload: boolean } | null>(null);
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
                    setLoading(false);
                }
            });
    }, [router]);

    useEffect(() => {
        if (user) {
            fetch('/api/settings')
                .then(res => res.json())
                .then(setSettings);
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
        }}>
            <h1 style={{ marginBottom: '40px', fontSize: '1.5rem' }}>⚙️ Admin Panel</h1>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                maxWidth: '400px',
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
