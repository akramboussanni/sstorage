'use client';

interface UserPanelProps {
    user: { username: string; isAdmin: boolean } | null;
    allowRegistration?: boolean;
    onLogout: () => void;
}

export function UserPanel({ user, allowRegistration, onLogout }: UserPanelProps) {
    if (user) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
                <span style={{ color: '#888', fontSize: '0.9rem' }}>
                    Logged in as <strong style={{ color: '#5865f2' }}>{user.username}</strong>
                </span>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {user.isAdmin && (
                        <a href="/admin" style={{ color: '#5865f2', textDecoration: 'none', fontSize: '0.9rem' }}>
                            Admin Panel
                        </a>
                    )}
                    <a href="/change-password" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>
                        Change Password
                    </a>
                    <button
                        onClick={onLogout}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#ff5555',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            padding: 0,
                        }}
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
            <a href="/login" style={{ color: '#5865f2', textDecoration: 'none', fontSize: '0.9rem' }}>
                Login
            </a>
            {allowRegistration && (
                <a href="/register" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>
                    Register
                </a>
            )}
        </div>
    );
}
