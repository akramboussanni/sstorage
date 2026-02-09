'use client';

import { useState } from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { ContextMenu, useContextMenu, ContextMenuItem } from './ContextMenu';
import { PreviewCard } from './PreviewCard';
import { MediaOverview } from './MediaOverview';
import { MenuIcons, FileTypeIcons } from './Icons';

type TranscodeStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'not_required';

export interface MediaItem {
    id: string;
    originalName: string;
    mimeType: string;
    size: number;
    transcodeStatus: TranscodeStatus;
    transcodeError?: string;
    createdAt: string;
    ip?: string;
}

interface MediaCardProps {
    media: MediaItem;
    onDelete: (id: string) => void;
    onCopyLink?: (url: string) => void;
    showPrivateBadge?: boolean;
    showIp?: boolean;
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
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export function MediaCard({ media, onDelete, onCopyLink, showPrivateBadge = true, showIp = false }: MediaCardProps) {
    const isTranscoding = media.transcodeStatus === 'pending' || media.transcodeStatus === 'processing';
    const isVideo = media.mimeType.startsWith('video/');
    const isImage = media.mimeType.startsWith('image/');
    const mediaUrl = typeof window !== 'undefined' ? `${window.location.origin}/${media.id}` : `/${media.id}`;
    const { contextMenu, showContextMenu, closeContextMenu } = useContextMenu();
    const [isHovered, setIsHovered] = useState(false);
    const [showOverview, setShowOverview] = useState(false);

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        const items: ContextMenuItem[] = [
            {
                label: 'Open in new tab',
                icon: <MenuIcons.Open />,
                onClick: () => window.open(`/${media.id}`, '_blank'),
            },
            {
                label: 'Copy link',
                icon: <MenuIcons.Copy />,
                onClick: () => onCopyLink?.(mediaUrl),
            },
            { separator: true },
            {
                label: 'Delete',
                icon: <MenuIcons.Delete />,
                onClick: () => onDelete(media.id),
                danger: true,
            },
        ];

        showContextMenu(items, { x: e.clientX, y: e.clientY });
    };

    const previewContent = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '240px' }}>
            <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginBottom: '4px' }}>File name</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 500, wordBreak: 'break-word' }}>{media.originalName}</div>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginBottom: '4px' }}>Size</div>
                    <div style={{ fontSize: '0.875rem' }}>{formatFileSize(media.size)}</div>
                </div>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginBottom: '4px' }}>Type</div>
                    <div style={{ fontSize: '0.875rem' }}>{media.mimeType}</div>
                </div>
            </div>
            <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginBottom: '4px' }}>Uploaded</div>
                <div style={{ fontSize: '0.875rem' }}>{formatDate(media.createdAt)}</div>
            </div>
            {media.transcodeStatus === 'pending' || media.transcodeStatus === 'processing' ? (
                <div style={{ 
                    padding: '8px', 
                    background: 'rgba(250, 166, 26, 0.1)', 
                    borderRadius: 'var(--radius)',
                    fontSize: '0.8125rem',
                    color: '#faa61a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                }}>
                    <Clock size={14} /> {media.transcodeStatus === 'pending' ? 'Queued for processing' : 'Processing...'}
                </div>
            ) : media.transcodeStatus === 'failed' ? (
                <div style={{ 
                    padding: '8px', 
                    background: 'rgba(239, 68, 68, 0.1)', 
                    borderRadius: 'var(--radius)',
                    fontSize: '0.8125rem',
                    color: 'var(--danger)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                }}>
                    <AlertCircle size={14} /> Processing failed
                </div>
            ) : null}
        </div>
    );

    return (
        <>
            <PreviewCard content={previewContent} position="top" delay={600}>
                <div 
                    style={{
                        position: 'relative',
                        backgroundColor: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        transform: isHovered ? 'translateY(-2px)' : 'none',
                        boxShadow: isHovered ? 'var(--shadow-lg)' : 'none',
                    }}
                    onContextMenu={handleContextMenu}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div
                        style={{
                            display: 'block',
                            cursor: 'pointer',
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowOverview(true);
                        }}
                    >
                        <div style={{
                            aspectRatio: '16/9',
                            backgroundColor: '#000',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            cursor: 'pointer',
                        }}>
                            {isVideo ? (
                                <video
                                    src={`/api/media/${media.id}`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    muted
                                    playsInline
                                />
                            ) : isImage ? (
                                <img
                                    src={`/api/media/${media.id}`}
                                    alt={media.originalName}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    color: 'var(--muted-foreground)',
                                }}>
                                    <FileTypeIcons.File />
                                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
                                        {media.originalName.split('.').pop()?.toUpperCase() || 'FILE'}
                                    </div>
                                </div>
                            )}

                            {/* Transcoding overlay */}
                            {isTranscoding && (
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    backgroundColor: 'rgba(0,0,0,0.7)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        border: '3px solid #333',
                                        borderTopColor: 'var(--accent)',
                                        borderRadius: '50%',
                                        animation: 'spin 1s linear infinite',
                                    }} />
                                    <span style={{ color: '#faa61a', fontSize: '0.8rem' }}>
                                        {media.transcodeStatus === 'pending' ? 'Queued...' : 'Transcoding...'}
                                    </span>
                                </div>
                            )}

                            {/* Failed overlay */}
                            {media.transcodeStatus === 'failed' && (
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    backgroundColor: 'rgba(239, 68, 68, 0.9)',
                                    padding: '4px 8px',
                                    fontSize: '0.75rem',
                                    color: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                }}>
                                    <AlertCircle size={12} /> Transcode failed
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Card footer with actions */}
                    <div style={{
                        padding: '10px 12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'var(--surface)',
                    }}>
                        <div style={{
                            fontSize: '0.8125rem',
                            color: 'var(--muted-foreground)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            flex: 1,
                        }}>
                            {media.originalName}
                            {showIp && media.ip && (
                                <div style={{ color: 'var(--accent)', marginTop: '2px', fontSize: '0.75rem' }}>IP: {media.ip}</div>
                            )}
                        </div>
                        <div style={{ display: 'flex', gap: '4px', opacity: isHovered ? 1 : 0.6, transition: 'opacity 0.2s ease' }}>
                            {onCopyLink && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onCopyLink(mediaUrl);
                                    }}
                                    title="Copy Link"
                                    className="app-btn app-btn-ghost"
                                    style={{
                                        padding: '4px 8px',
                                        fontSize: '0.75rem',
                                    }}
                                >
                                    <MenuIcons.Copy />
                                </button>
                            )}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(media.id);
                                }}
                                title="Delete"
                                className="app-btn app-btn-danger"
                                style={{
                                    padding: '4px 8px',
                                    fontSize: '0.75rem',
                                }}
                            >
                                <MenuIcons.Delete />
                            </button>
                        </div>
                    </div>
                </div>
            </PreviewCard>
            <ContextMenu
                items={contextMenu.items}
                position={contextMenu.position}
                onClose={closeContextMenu}
            />
            <MediaOverview
                media={showOverview ? media : null}
                isOpen={showOverview}
                onClose={() => setShowOverview(false)}
                onDelete={onDelete}
                onCopyLink={onCopyLink}
            />
        </>
    );
}

// CSS for spinner - to be included in the page
export const spinnerStyles = `
@keyframes spin {
    to { transform: rotate(360deg); }
}
`;
