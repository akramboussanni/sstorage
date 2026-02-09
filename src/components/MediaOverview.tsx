'use client';

import { useEffect, useState } from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { MediaItem } from './MediaCard';
import { MenuIcons, FileTypeIcons } from './Icons';

interface MediaOverviewProps {
    media: MediaItem | null;
    isOpen: boolean;
    onClose: () => void;
    onDelete?: (id: string) => void;
    onCopyLink?: (url: string) => void;
}

const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export function MediaOverview({ media, isOpen, onClose, onDelete, onCopyLink }: MediaOverviewProps) {
    const [isClosing, setIsClosing] = useState(false);
    const mediaUrl = media && typeof window !== 'undefined' ? `${window.location.origin}/${media.id}` : media ? `/${media.id}` : '';

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

    if (!isOpen || !media) return null;

    const isVideo = media.mimeType.startsWith('video/');
    const isImage = media.mimeType.startsWith('image/');
    const isTranscoding = media.transcodeStatus === 'pending' || media.transcodeStatus === 'processing';

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
                    maxWidth: '900px',
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
                    padding: '20px 24px',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <h2 style={{
                            margin: 0,
                            fontSize: '1.125rem',
                            fontWeight: 600,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}>
                            {media.originalName}
                        </h2>
                        <div style={{
                            marginTop: '4px',
                            fontSize: '0.8125rem',
                            color: 'var(--muted-foreground)',
                        }}>
                            {formatFileSize(media.size)} · {media.mimeType}
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                        {onCopyLink && (
                            <button
                                onClick={() => {
                                    onCopyLink(mediaUrl);
                                }}
                                style={{ 
                                    padding: '8px',
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--foreground)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    borderRadius: 'var(--radius)',
                                    transition: 'background-color 0.2s ease',
                                }}
                                title="Copy link"
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-hover)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <MenuIcons.Copy />
                            </button>
                        )}
                        <a
                            href={`/${media.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ 
                                padding: '8px',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--foreground)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: 'var(--radius)',
                                transition: 'background-color 0.2s ease',
                                textDecoration: 'none',
                            }}
                            title="Open"
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-hover)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <MenuIcons.Open />
                        </a>
                        {onDelete && (
                            <button
                                onClick={() => {
                                    if (confirm('Are you sure you want to delete this file?')) {
                                        onDelete(media.id);
                                        handleClose();
                                    }
                                }}
                                style={{ 
                                    padding: '8px',
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--danger)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    borderRadius: 'var(--radius)',
                                    transition: 'background-color 0.2s ease',
                                }}
                                title="Delete"
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <MenuIcons.Delete />
                            </button>
                        )}
                        <button
                            onClick={handleClose}
                            style={{
                                padding: '8px',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--foreground)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: 'var(--radius)',
                                transition: 'background-color 0.2s ease',
                            }}
                            aria-label="Close"
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-hover)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div style={{
                    flex: 1,
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    {/* Media Preview */}
                    <div style={{
                        backgroundColor: '#000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        minHeight: '300px',
                        maxHeight: '70vh',
                        flex: 1,
                        overflow: 'auto',
                    }}>
                        {isTranscoding ? (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '16px',
                                color: '#faa61a',
                            }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    border: '4px solid #333',
                                    borderTopColor: 'var(--accent)',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite',
                                }} />
                                <div style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Clock size={20} />
                                    {media.transcodeStatus === 'pending' ? 'Queued for processing...' : 'Processing...'}
                                </div>
                            </div>
                        ) : isVideo ? (
                            <video
                                src={`/api/media/${media.id}`}
                                controls
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '70vh',
                                    width: 'auto',
                                    height: 'auto',
                                }}
                            />
                        ) : isImage ? (
                            <img
                                src={`/api/media/${media.id}`}
                                alt={media.originalName}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '70vh',
                                    width: 'auto',
                                    height: 'auto',
                                    objectFit: 'contain',
                                }}
                            />
                        ) : (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '16px',
                                color: 'var(--muted-foreground)',
                                padding: '40px',
                            }}>
                                <FileTypeIcons.File />
                                <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                                    {media.originalName.split('.').pop()?.toUpperCase() || 'FILE'}
                                </div>
                                <div style={{ fontSize: '0.9375rem' }}>
                                    {media.mimeType}
                                </div>
                            </div>
                        )}

                        {media.transcodeStatus === 'failed' && (
                            <div style={{
                                position: 'absolute',
                                bottom: '16px',
                                left: '16px',
                                right: '16px',
                                background: 'rgba(239, 68, 68, 0.95)',
                                color: '#fff',
                                padding: '12px 16px',
                                borderRadius: 'var(--radius)',
                                fontSize: '0.875rem',
                            }}>
                                <AlertCircle size={16} style={{ flexShrink: 0 }} /> Transcoding failed
                                {media.transcodeError && (
                                    <div style={{ marginTop: '4px', fontSize: '0.75rem', opacity: 0.9 }}>
                                        {media.transcodeError}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div style={{
                        padding: '24px',
                        borderTop: '1px solid var(--border)',
                        background: 'var(--background)',
                    }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '20px',
                        }}>
                            <div>
                                <div style={{
                                    fontSize: '0.75rem',
                                    color: 'var(--muted-foreground)',
                                    marginBottom: '6px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                }}>
                                    File Name
                                </div>
                                <div style={{ fontSize: '0.9375rem', wordBreak: 'break-word' }}>
                                    {media.originalName}
                                </div>
                            </div>
                            <div>
                                <div style={{
                                    fontSize: '0.75rem',
                                    color: 'var(--muted-foreground)',
                                    marginBottom: '6px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                }}>
                                    File Size
                                </div>
                                <div style={{ fontSize: '0.9375rem' }}>
                                    {formatFileSize(media.size)}
                                </div>
                            </div>
                            <div>
                                <div style={{
                                    fontSize: '0.75rem',
                                    color: 'var(--muted-foreground)',
                                    marginBottom: '6px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                }}>
                                    MIME Type
                                </div>
                                <div style={{ fontSize: '0.9375rem' }}>
                                    {media.mimeType}
                                </div>
                            </div>
                            <div>
                                <div style={{
                                    fontSize: '0.75rem',
                                    color: 'var(--muted-foreground)',
                                    marginBottom: '6px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                }}>
                                    Uploaded
                                </div>
                                <div style={{ fontSize: '0.9375rem' }}>
                                    {formatDate(media.createdAt)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
