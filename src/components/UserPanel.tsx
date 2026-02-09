'use client';

interface UserPanelProps {
    user: { username: string; isAdmin: boolean } | null;
    allowRegistration?: boolean;
    onLogout: () => void;
}

export function UserPanel({ user, allowRegistration, onLogout }: UserPanelProps) {
    if (user) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginTop: 16 }}>
                <span style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
                    Signed in as <strong style={{ color: 'var(--foreground)' }}>{user.username}</strong>
                </span>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {user.isAdmin && (
                        <a href="/admin" className="app-btn app-btn-ghost" style={{ textDecoration: 'none', padding: '6px 12px' }}>
                            Admin
                        </a>
                    )}
                    <a href="/change-password" className="app-btn app-btn-ghost" style={{ textDecoration: 'none', padding: '6px 12px' }}>
                        Password
                    </a>
                    <button type="button" onClick={onLogout} className="app-btn app-btn-danger" style={{ padding: '6px 12px' }}>
                        Sign out
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <a href="/login" className="app-btn app-btn-primary" style={{ textDecoration: 'none' }}>
                Sign in
            </a>
            {allowRegistration && (
                <a href="/register" className="app-btn app-btn-secondary" style={{ textDecoration: 'none' }}>
                    Register
                </a>
            )}
        </div>
    );
}
