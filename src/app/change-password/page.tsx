'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ChangePasswordPage() {
    const router = useRouter();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<{ username: string; mustChangePassword: boolean } | null>(null);
    const [checkingSession, setCheckingSession] = useState(true);

    useEffect(() => {
        fetch('/api/auth/session')
            .then(res => res.json())
            .then(data => {
                if (!data.user) {
                    router.push('/login');
                } else {
                    setUser(data.user);
                }
                setCheckingSession(false);
            })
            .catch(() => {
                router.push('/login');
            });
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match');
            setLoading(false);
            return;
        }

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/auth/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Failed to change password');
                setLoading(false);
            } else {
                router.push('/');
            }
        } catch {
            setError('Failed to change password');
            setLoading(false);
        }
    };

    if (checkingSession || !user) {
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
            fontFamily: 'system-ui, sans-serif',
        }}>
            <h1 style={{ marginBottom: '10px', fontSize: '1.5rem' }}>🔐 Change Password</h1>

            {user.mustChangePassword && (
                <p style={{
                    color: '#faa61a',
                    marginBottom: '20px',
                    textAlign: 'center',
                    maxWidth: '300px',
                }}>
                    ⚠️ You must change your password before continuing.
                </p>
            )}

            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    maxWidth: '300px',
                    width: '100%',
                    padding: '0 20px',
                }}
            >
                <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    style={{
                        padding: '12px',
                        backgroundColor: '#1a1a1a',
                        color: '#fff',
                        border: '1px solid #333',
                        borderRadius: '8px',
                        fontSize: '1rem',
                    }}
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{
                        padding: '12px',
                        backgroundColor: '#1a1a1a',
                        color: '#fff',
                        border: '1px solid #333',
                        borderRadius: '8px',
                        fontSize: '1rem',
                    }}
                />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{
                        padding: '12px',
                        backgroundColor: '#1a1a1a',
                        color: '#fff',
                        border: '1px solid #333',
                        borderRadius: '8px',
                        fontSize: '1rem',
                    }}
                />

                {error && <p style={{ color: '#ff5555', textAlign: 'center' }}>{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: '12px',
                        backgroundColor: '#5865f2',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontSize: '1rem',
                    }}
                >
                    {loading ? 'Changing...' : 'Change Password'}
                </button>

                {!user.mustChangePassword && (
                    <a
                        href="/"
                        style={{
                            textAlign: 'center',
                            color: '#666',
                            textDecoration: 'none',
                            marginTop: '10px',
                        }}
                    >
                        ← Back
                    </a>
                )}
            </form>
        </div>
    );
}
