'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Folder } from 'lucide-react';
import { MenuIcons, OtherIcons } from './Icons';

interface DriveItem {
    id: string;
    name: string;
    description: string | null;
    isPublic: boolean;
    owner: { username: string };
    _count: { files: number };
    createdAt: string;
}

interface DriveOverviewProps {
    drive: DriveItem | null;
    isOpen: boolean;
    onClose: () => void;
    onDelete?: (id: string) => void;
    onRename?: (id: string, name: string) => void;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    });
};

export function DriveOverview({ drive, isOpen, onClose, onDelete, onRename }: DriveOverviewProps) {
    const router = useRouter();
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsClosing(false);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                handleClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
            setIsClosing(false);
        }, 150);
    };

    const handleOpen = () => {
        if (drive) {
            router.push(`/drives/${drive.id}`);
            handleClose();
        }
    };

    if (!isOpen || !drive) return null;

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10000,
                padding: '20px',
                opacity: isClosing ? 0 : 1,
                transition: 'opacity 0.15s ease',
            }}
            onClick={handleClose}
        >
            <div
                style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    maxWidth: '600px',
                    width: '100%',
                    maxHeight: '90vh',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-lg)',
                    transform: isClosing ? 'scale(0.95)' : 'scale(1)',
                    transition: 'transform 0.15s ease',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{
                    padding: '24px',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                }}>
                    <div style={{
                        flexShrink: 0,
                    }}>
                        <Folder style={{ width: 48, height: 48, color: '#fbbf24' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <h2 style={{
                            margin: 0,
                            fontSize: '1.5rem',
                            fontWeight: 600,
                            marginBottom: '8px',
                            wordBreak: 'break-word',
                        }}>
                            {drive.name}
                        </h2>
                        {drive.description && (
                            <p style={{
                                margin: 0,
                                fontSize: '0.9375rem',
                                color: 'var(--muted-foreground)',
                                lineHeight: 1.5,
                            }}>
                                {drive.description}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={handleClose}
                        className="app-btn app-btn-ghost"
                        style={{ padding: '8px 12px', flexShrink: 0 }}
                        aria-label="Close"
                    >
                        <OtherIcons.Close />
                    </button>
                </div>

                {/* Content */}
                <div style={{
                    flex: 1,
                    overflow: 'auto',
                    padding: '24px',
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '24px',
                        marginBottom: '24px',
                    }}>
                        <div>
                            <div style={{
                                fontSize: '0.75rem',
                                color: 'var(--muted-foreground)',
                                marginBottom: '8px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                            }}>
                                Files
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                                {drive._count.files}
                            </div>
                        </div>
                        <div>
                            <div style={{
                                fontSize: '0.75rem',
                                color: 'var(--muted-foreground)',
                                marginBottom: '8px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                            }}>
                                Owner
                            </div>
                            <div style={{ fontSize: '1rem', fontWeight: 500 }}>
                                {drive.owner.username}
                            </div>
                        </div>
                        <div>
                            <div style={{
                                fontSize: '0.75rem',
                                color: 'var(--muted-foreground)',
                                marginBottom: '8px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                            }}>
                                Created
                            </div>
                            <div style={{ fontSize: '0.9375rem' }}>
                                {formatDate(drive.createdAt)}
                            </div>
                        </div>
                    </div>

                    {drive.isPublic && (
                        <div style={{
                            padding: '12px 16px',
                            background: 'rgba(99, 102, 241, 0.1)',
                            border: '1px solid rgba(99, 102, 241, 0.2)',
                            borderRadius: 'var(--radius)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: 'var(--accent)',
                            fontSize: '0.875rem',
                        }}>
                            <OtherIcons.Globe /> This drive is public and accessible via link
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div style={{
                    padding: '20px 24px',
                    borderTop: '1px solid var(--border)',
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'flex-end',
                }}>
                    {onRename && (
                        <button
                            onClick={() => {
                                const newName = prompt('Enter new name:', drive.name);
                                if (newName && newName.trim() && newName !== drive.name) {
                                    onRename(drive.id, newName.trim());
                                }
                            }}
                            className="app-btn app-btn-secondary"
                            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                            <MenuIcons.Rename style={{ width: 16, height: 16 }} /> Rename
                        </button>
                    )}
                    <button
                        onClick={handleOpen}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <MenuIcons.Folder style={{ width: 16, height: 16 }} />
                        Open Drive
                    </button>
                    {onDelete && (
                        <button
                            onClick={() => {
                                if (confirm(`Are you sure you want to delete "${drive.name}"? This will delete all files and folders inside.`)) {
                                    onDelete(drive.id);
                                    handleClose();
                                }
                            }}
                            className="app-btn app-btn-danger"
                            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                            <MenuIcons.Delete style={{ width: 16, height: 16 }} /> Delete
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
