'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Login failed');
                setLoading(false);
            } else {
                router.push('/');
            }
        } catch {
            setError('Login failed');
            setLoading(false);
        }
    };

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
            <h1 style={{ marginBottom: '30px', fontSize: '1.5rem' }}>🔐 Login</h1>

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
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    {loading ? 'Logging in...' : 'Login'}
                </button>

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
            </form>
        </div>
    );
}
