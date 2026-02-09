'use client';

import { useState, useEffect, useCallback, use } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, useDialog } from '@/components/Dialog';
import { Toast, useToast } from '@/components/Toast';
import { MediaCard, MediaItem, spinnerStyles } from '@/components/MediaCard';

export default function DrivePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [user, setUser] = useState<{ id: string; username: string; isAdmin: boolean } | null>(null);
    const [drive, setDrive] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const { dialog, showDialog, closeDialog } = useDialog();
    const { toast, showToast } = useToast();

    const fetchDrive = useCallback(async () => {
        try {
            const res = await fetch(`/api/drives/${id}`);
            if (!res.ok) throw new Error('Failed to fetch drive');
            const data = await res.json();
            setDrive(data);
        } catch (err) {
            console.error(err);
            router.push('/');
        } finally {
            setLoading(false);
        }
    }, [id, router]);

    useEffect(() => {
        fetch('/api/auth/session').then(res => res.json()).then(data => setUser(data.user));
        fetchDrive();
    }, [fetchDrive]);

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('driveId', id);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Upload failed');

            showToast('File uploaded!');
            setFile(null);
            fetchDrive();
        } catch (err: any) {
            showToast(err.message, 'error');
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteFile = async (fileId: string) => {
        showDialog('Delete File', 'Are you sure?', 'confirm', async () => {
            try {
                const res = await fetch(`/api/media/${fileId}`, { method: 'DELETE' });
                if (res.ok) {
                    setDrive((prev: any) => ({
                        ...prev,
                        files: prev.files.filter((f: any) => f.id !== fileId)
                    }));
                    showToast('File deleted');
                }
            } catch (err) {
                showToast('Delete failed', 'error');
            }
        });
    };

    const handleInvite = async () => {
        const username = prompt('Enter username to invite:');
        if (!username) return;

        try {
            const res = await fetch(`/api/drives/${id}/invite`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, role: 'EDITOR' })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Invite failed');
            showToast(`Invited ${username}!`);
            fetchDrive();
        } catch (err: any) {
            showToast(err.message, 'error');
        }
    };

    if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0a0a0a', color: '#fff' }}>Loading...</div>;

    const canUpload = drive.canEdit || (drive.isPublic && drive.publicRole === 'EDITOR');

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#fff', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
            <Dialog state={dialog} onClose={closeDialog} />
            <Toast message={toast.message} show={toast.show} type={toast.type} />

            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <a href="/" style={{ textDecoration: 'none', fontSize: '1.5rem' }}>🏠</a>
                            <h1 style={{ margin: 0, fontSize: '2rem' }}>{drive.name}</h1>
                        </div>
                        <p style={{ color: '#888', margin: 0 }}>{drive.description || 'No description'}</p>
                        <div style={{ marginTop: '8px', fontSize: '0.9rem', color: '#5865f2' }}>
                            Owner: {drive.owner.username} • {drive.files.length} files
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        {drive.isOwner && (
                            <>
                                <button
                                    onClick={() => {
                                        const isPublic = !drive.isPublic;
                                        const publicRole = isPublic ? prompt('Public Role (VIEWER or EDITOR)?', 'VIEWER') : 'VIEWER';
                                        if (isPublic && !publicRole) return;

                                        fetch(`/api/drives/${id}`, {
                                            method: 'PUT',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ isPublic, publicRole })
                                        }).then(res => res.ok ? fetchDrive() : showToast('Update failed', 'error'));
                                    }}
                                    style={{ padding: '10px 20px', backgroundColor: '#1a1a1a', color: '#fff', border: '1px solid #333', borderRadius: '8px', cursor: 'pointer' }}
                                >
                                    {drive.isPublic ? '🌍 Public' : '🔒 Private'}
                                </button>
                                <button onClick={handleInvite} style={{ padding: '10px 20px', backgroundColor: '#1a1a1a', color: '#fff', border: '1px solid #333', borderRadius: '8px', cursor: 'pointer' }}>
                                    ➕ Invite
                                </button>
                            </>
                        )}
                        {canUpload && (
                            <label style={{ padding: '10px 20px', backgroundColor: '#5865f2', color: '#fff', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                📤 Upload
                                <input type="file" onChange={(e) => {
                                    const selected = e.target.files?.[0];
                                    if (selected) {
                                        setFile(selected);
                                        // Auto upload for simplicity
                                        const formData = new FormData();
                                        formData.append('file', selected);
                                        formData.append('driveId', id);
                                        setUploading(true);
                                        fetch('/api/upload', { method: 'POST', body: formData })
                                            .then(res => res.ok ? fetchDrive() : showToast('Upload failed', 'error'))
                                            .finally(() => {
                                                setUploading(false);
                                                setFile(null);
                                            });
                                    }
                                }} style={{ display: 'none' }} />
                            </label>
                        )}
                    </div>
                </header>

                {uploading && (
                    <div style={{ marginBottom: '20px', padding: '12px', backgroundColor: '#1a1a1a', borderRadius: '8px', textAlign: 'center' }}>
                        Uploading...
                    </div>
                )}

                {drive.files.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '80px 0', border: '2px dashed #222', borderRadius: '12px', color: '#666' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📭</div>
                        <p>This drive is empty</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                        {drive.files.map((file: any) => (
                            <MediaCard
                                key={file.id}
                                media={file}
                                onDelete={handleDeleteFile}
                                onCopyLink={(url) => {
                                    navigator.clipboard.writeText(url);
                                    showToast('Link copied!');
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            <style>{spinnerStyles}</style>
        </div>
    );
}
