'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, useDialog } from '@/components/Dialog';
import { MediaCard, MediaItem, spinnerStyles } from '@/components/MediaCard';
import { Toast, useToast } from '@/components/Toast';

interface User {
    id: string;
    username: string;
    isAdmin: boolean;
    createdAt: string;
    customMaxFileSize?: string; // Serialized BigInt
    _count: { media: number };
}

interface Settings {
    allowPublicUpload: boolean;
    allowRegistration: boolean;
    defaultCompression: string;
    showNoCompression: boolean;
    showPrivateOption: boolean;
    forcePrivate: boolean;
    maxFileSize: string; // Serialized BigInt
    smtpHost: string | null;
    smtpPort: number | null;
    smtpUser: string | null;
    smtpFrom: string | null;
    smtpConfigured: boolean;
}

const COMPRESSION_OPTIONS = [
    { value: 'none', label: 'None (Original)' },
    { value: 'high', label: 'High Quality' },
    { value: 'balanced', label: 'Balanced' },
    { value: 'small', label: 'Smaller File' },
];

const inputStyle: React.CSSProperties = {
    padding: '12px',
    backgroundColor: '#2b2b2b',
    color: '#fff',
    border: '1px solid #333',
    borderRadius: '6px',
    fontSize: '0.9rem',
};

// Modal for creating/editing user (simplified inline or separate component could be better, but inline for now)
function UserModal({
    isOpen,
    onClose,
    onSave,
    editUser = null
}: {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => Promise<void>;
    editUser?: User | null;
}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [customLimit, setCustomLimit] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (editUser) {
            setUsername(editUser.username);
            setCustomLimit(editUser.customMaxFileSize ? (Number(editUser.customMaxFileSize) / (1024 * 1024)).toString() : '');
        } else {
            setUsername('');
            setPassword('');
            setCustomLimit('');
        }
    }, [editUser, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        // Convert MB to bytes for API
        const limitBytes = customLimit ? (BigInt(Math.floor(parseFloat(customLimit) * 1024 * 1024))).toString() : null;
        await onSave({ username, password, customMaxFileSize: limitBytes });
        setSaving(false);
        onClose();
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
            <form onSubmit={handleSubmit} style={{
                backgroundColor: '#1a1a1a', padding: '24px', borderRadius: '12px', width: '400px',
                border: '1px solid #333', display: 'flex', flexDirection: 'column', gap: '16px'
            }}>
                <h3 style={{ margin: 0 }}>{editUser ? 'Edit User' : 'Create User'}</h3>

                {!editUser && (
                    <>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Username</label>
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                style={{ ...inputStyle, width: '100%' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                style={{ ...inputStyle, width: '100%' }}
                            />
                        </div>
                    </>
                )}

                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>
                        Custom Max File Size (MB)
                        <span style={{ color: '#888', marginLeft: '8px' }}>(Leave empty for default)</span>
                    </label>
                    <input
                        type="number"
                        min="0"
                        value={customLimit}
                        onChange={e => setCustomLimit(e.target.value)}
                        placeholder="e.g. 500"
                        style={{ ...inputStyle, width: '100%' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
                    <button type="button" onClick={onClose} style={{
                        padding: '10px 20px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer'
                    }}>Cancel</button>
                    <button type="submit" disabled={saving} style={{
                        padding: '10px 20px', backgroundColor: '#5865f2', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer'
                    }}>
                        {saving ? 'Saving...' : (editUser ? 'Save Changes' : 'Create User')}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default function AdminPage() {
    const router = useRouter();
    const [user, setUser] = useState<{ id: string; username: string; isAdmin: boolean } | null>(null);
    const [settings, setSettings] = useState<Settings | null>(null);
    const [mediaList, setMediaList] = useState<MediaItem[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'media' | 'settings' | 'users'>('media');
    const { dialog, showDialog, closeDialog } = useDialog();
    const { toast, showToast } = useToast();

    // User Modal State
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    // Global Max Size State
    const [globalMaxSizeMB, setGlobalMaxSizeMB] = useState('');

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
                if (settingsData.maxFileSize) {
                    setGlobalMaxSizeMB((Number(settingsData.maxFileSize) / (1024 * 1024)).toFixed(0));
                }

                if (Array.isArray(mediaData)) setMediaList(mediaData);
                if (Array.isArray(usersData)) setUsers(usersData);
                setLoading(false);
            });
        }
    }, [user]);

    const toggleSetting = async (key: keyof Pick<Settings, 'allowPublicUpload' | 'allowRegistration' | 'showNoCompression' | 'showPrivateOption' | 'forcePrivate'>) => {
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

    const updateDefaultCompression = async (value: string) => {
        setSaving(true);
        try {
            const res = await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ defaultCompression: value }),
            });
            const data = await res.json();
            setSettings(data);
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const saveGlobalMaxSize = async () => {
        if (!globalMaxSizeMB) return;
        setSaving(true);
        try {
            const bytes = BigInt(Math.floor(parseFloat(globalMaxSizeMB) * 1024 * 1024)).toString();
            const res = await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ maxFileSize: bytes }),
            });
            const data = await res.json();
            setSettings(data);
            showToast('Max file size updated');
        } catch (err) {
            console.error(err);
            showDialog('Error', 'Failed to update max file size');
        } finally {
            setSaving(false);
        }
    };

    const saveUser = async (data: any) => {
        try {
            const method = editingUser ? 'PUT' : 'POST';
            const body = editingUser ? { ...data, id: editingUser.id } : data;

            const res = await fetch('/api/admin/users', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error || 'Failed to save user');
            }

            // Refresh users list
            const updatedUsersRes = await fetch('/api/admin/users');
            const updatedUsers = await updatedUsersRes.json();
            setUsers(updatedUsers);

            showToast(editingUser ? 'User updated' : 'User created');
        } catch (err: any) {
            showDialog('Error', err.message);
        }
    };

    const deleteUser = (userId: string) => {
        showDialog('Delete User', 'Are you sure? This will PERMANENTLY DELETE the user and ALL their uploaded files from the server. This action cannot be undone.', 'confirm', async () => {
            try {
                const res = await fetch(`/api/admin/users?id=${userId}`, { method: 'DELETE' });
                if (res.ok) {
                    if (userId === user?.id) {
                        // User deleted themselves
                        await fetch('/api/auth/logout', { method: 'POST' });
                        router.push('/');
                    } else {
                        setUsers(prev => prev.filter(u => u.id !== userId));
                    }
                } else {
                    const data = await res.json();
                    showDialog('Error', data.error || 'Failed to delete user');
                }
            } catch (err) {
                showDialog('Error', 'Error deleting user');
            }
        });
    };

    // ... (existing deleteMedia, copyToClipboard, etc.)
    const deleteMedia = (mediaId: string) => {
        showDialog('Delete File', 'Are you sure you want to delete this file?', 'confirm', async () => {
            try {
                const res = await fetch(`/api/media/${mediaId}`, { method: 'DELETE' });
                if (res.ok) {
                    setMediaList(prev => prev.filter(m => m.id !== mediaId));
                } else {
                    showDialog('Error', 'Failed to delete file');
                }
            } catch (err) {
                showDialog('Error', 'Error deleting file');
            }
        });
    };

    const copyToClipboard = async (url: string) => {
        await navigator.clipboard.writeText(url);
        showToast('Link copied!');
    };

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/');
    };

    const handleSaveSmtp = async () => {
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
            setSmtpPassword('');
            setSmtpMessage('SMTP settings saved!');
        } catch (err) {
            setSmtpMessage('Failed to save SMTP settings');
        } finally {
            setSmtpSaving(false);
        }
    };

    if (loading || !settings) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0a0a0a', color: '#fff' }}>
                Loading...
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '60px',
            backgroundColor: '#0a0a0a', color: '#fff', fontFamily: 'system-ui, sans-serif', paddingBottom: '40px',
        }}>
            <Dialog state={dialog} onClose={closeDialog} />
            <Toast message={toast.message} show={toast.show} />
            <UserModal
                isOpen={isUserModalOpen}
                onClose={() => { setIsUserModalOpen(false); setEditingUser(null); }}
                onSave={saveUser}
                editUser={editingUser}
            />

            <h1 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>⚙️ Admin Panel</h1>

            {/* Tab Navigation */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                {(['media', 'settings', 'users'] as const).map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} style={{
                        padding: '8px 16px', backgroundColor: activeTab === tab ? '#5865f2' : '#1a1a1a',
                        color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', textTransform: 'capitalize'
                    }}>
                        {tab}
                    </button>
                ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px', width: '100%', padding: '0 20px' }}>
                {/* Settings Tab */}
                {activeTab === 'settings' && (
                    <>
                        {/* General Settings */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#1a1a1a', borderRadius: '8px', padding: '16px' }}>
                            <h3 style={{ margin: 0, marginBottom: '8px' }}>General Settings</h3>

                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', color: '#888' }}>
                                    Global Max File Size (MB)
                                </label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input
                                        type="number"
                                        value={globalMaxSizeMB}
                                        onChange={e => setGlobalMaxSizeMB(e.target.value)}
                                        style={{ ...inputStyle, width: '120px' }}
                                    />
                                    <button
                                        onClick={saveGlobalMaxSize}
                                        disabled={saving}
                                        style={{
                                            padding: '0 16px', backgroundColor: '#5865f2', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer'
                                        }}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>

                            <SettingToggle label="Allow Public Upload" value={settings.allowPublicUpload} onChange={() => toggleSetting('allowPublicUpload')} disabled={saving} />
                            <SettingToggle label="Allow Registration" value={settings.allowRegistration} onChange={() => toggleSetting('allowRegistration')} disabled={saving} />
                        </div>

                        {/* Upload Options */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#1a1a1a', borderRadius: '8px', padding: '16px' }}>
                            <h3 style={{ margin: 0, marginBottom: '8px' }}>Upload Options</h3>
                            <div style={{ marginBottom: '8px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', color: '#888' }}>Default Video Compression</label>
                                <select value={settings.defaultCompression} onChange={(e) => updateDefaultCompression(e.target.value)} disabled={saving} style={{ ...inputStyle, width: '100%', cursor: 'pointer' }}>
                                    {COMPRESSION_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                </select>
                            </div>
                            <SettingToggle label="Show 'No Compression' option" description="Allow users to opt-out of compression" value={settings.showNoCompression} onChange={() => toggleSetting('showNoCompression')} disabled={saving} />
                            <SettingToggle label="Show 'Private Upload' option" description="Allow users to hide uploads from admin" value={settings.showPrivateOption} onChange={() => toggleSetting('showPrivateOption')} disabled={saving} />
                            <SettingToggle label="Force Private Uploads" description="ALL uploads will be private (hidden from admin) by default" value={settings.forcePrivate} onChange={() => toggleSetting('forcePrivate')} disabled={saving} />
                        </div>

                        {/* SMTP Configuration */}
                        <div style={{ backgroundColor: '#1a1a1a', borderRadius: '8px', padding: '16px' }}>
                            <h3 style={{ margin: 0, marginBottom: '16px' }}>
                                SMTP Configuration
                                {settings.smtpConfigured && <span style={{ color: '#43b581', fontSize: '0.8rem', marginLeft: '8px' }}>✓ Configured</span>}
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <input type="text" placeholder="SMTP Host" value={smtpHost} onChange={(e) => setSmtpHost(e.target.value)} style={inputStyle} />
                                <input type="number" placeholder="SMTP Port" value={smtpPort} onChange={(e) => setSmtpPort(e.target.value)} style={inputStyle} />
                                <input type="text" placeholder="SMTP Username" value={smtpUser} onChange={(e) => setSmtpUser(e.target.value)} style={inputStyle} />
                                <input type="password" placeholder="SMTP Password" value={smtpPassword} onChange={(e) => setSmtpPassword(e.target.value)} style={inputStyle} />
                                <input type="email" placeholder="From Email Address" value={smtpFrom} onChange={(e) => setSmtpFrom(e.target.value)} style={inputStyle} />
                                {smtpMessage && <p style={{ color: smtpMessage.includes('Failed') ? '#ff5555' : '#43b581', margin: 0 }}>{smtpMessage}</p>}
                                <button onClick={handleSaveSmtp} disabled={smtpSaving} style={{ padding: '12px', backgroundColor: '#5865f2', color: '#fff', border: 'none', borderRadius: '8px', cursor: smtpSaving ? 'not-allowed' : 'pointer' }}>
                                    {smtpSaving ? 'Saving...' : 'Save SMTP Settings'}
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {/* Users Tab */}
                {activeTab === 'users' && (
                    <div style={{ backgroundColor: '#1a1a1a', borderRadius: '8px', padding: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h3 style={{ margin: 0 }}>Users ({users.length})</h3>
                            <button
                                onClick={() => { setEditingUser(null); setIsUserModalOpen(true); }}
                                style={{
                                    padding: '8px 16px', backgroundColor: '#43b581', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer'
                                }}
                            >
                                + Create User
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {users.map(u => (
                                <div key={u.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#2b2b2b', borderRadius: '6px' }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <strong style={{ color: u.isAdmin ? '#faa61a' : '#fff' }}>{u.username}{u.isAdmin && ' 👑'}</strong>
                                            {u.customMaxFileSize && (
                                                <span style={{ fontSize: '0.75rem', backgroundColor: '#5865f2', padding: '2px 6px', borderRadius: '4px' }}>
                                                    Limit: {(Number(u.customMaxFileSize) / (1024 * 1024)).toFixed(0)}MB
                                                </span>
                                            )}
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: '#888' }}>
                                            {u._count.media} uploads • Joined {new Date(u.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button onClick={() => { setEditingUser(u); setIsUserModalOpen(true); }} style={{ padding: '6px 12px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>
                                            Edit
                                        </button>
                                        <button onClick={() => deleteUser(u.id)} style={{ padding: '6px 12px', backgroundColor: 'transparent', color: '#ff5555', border: '1px solid #ff5555', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Media Tab (reused from before) */}
                {activeTab === 'media' && (
                    <div style={{ backgroundColor: '#1a1a1a', borderRadius: '8px', padding: '16px' }}>
                        <h2 style={{ marginBottom: '16px', fontSize: '1.2rem' }}>Uploaded Media ({mediaList.length})</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                            {mediaList.map((media) => (
                                <MediaCard key={media.id} media={media} onDelete={deleteMedia} onCopyLink={copyToClipboard} showPrivateBadge={true} showIp={true} />
                            ))}
                        </div>
                    </div>
                )}

                <a href="/" style={{ textAlign: 'center', color: '#5865f2', textDecoration: 'none' }}>← Back to Upload</a>

                <button onClick={handleLogout} style={{ padding: '12px', backgroundColor: 'transparent', color: '#ff5555', border: '1px solid #ff5555', borderRadius: '8px', cursor: 'pointer' }}>
                    Sign Out
                </button>
            </div>

            <style>{spinnerStyles}</style>
        </div>
    );
}

// Helper component for toggle settings
function SettingToggle({ label, description, value, onChange, disabled }: { label: string; description?: string; value: boolean; onChange: () => void; disabled: boolean; }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
                <span>{label}</span>
                {description && <div style={{ fontSize: '0.8rem', color: '#666' }}>{description}</div>}
            </div>
            <button onClick={onChange} disabled={disabled} style={{ padding: '8px 16px', backgroundColor: value ? '#43b581' : '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', minWidth: '60px' }}>
                {value ? 'ON' : 'OFF'}
            </button>
        </div>
    );
}
