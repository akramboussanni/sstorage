'use client';

type TranscodeStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'not_required';

export interface MediaItem {
    id: string;
    originalName: string;
    mimeType: string;
    size: number;
    isPrivate?: boolean;
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

export function MediaCard({ media, onDelete, onCopyLink, showPrivateBadge = true, showIp = false }: MediaCardProps) {
    const isTranscoding = media.transcodeStatus === 'pending' || media.transcodeStatus === 'processing';
    const isVideo = media.mimeType.startsWith('video/');
    const mediaUrl = typeof window !== 'undefined' ? `${window.location.origin}/${media.id}` : `/${media.id}`;

    return (
        <div style={{
            position: 'relative',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            overflow: 'hidden',
        }}>
            <a
                href={`/${media.id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: 'block',
                    textDecoration: 'none',
                    color: 'inherit',
                }}
            >
                <div style={{
                    aspectRatio: '16/9',
                    backgroundColor: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                }}>
                    {isVideo ? (
                        <video
                            src={`/api/media/${media.id}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : media.mimeType.startsWith('image/') ? (
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
                            color: '#888',
                        }}>
                            <div style={{ fontSize: '3rem' }}>📄</div>
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
                                borderTopColor: '#5865f2',
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
                            backgroundColor: 'rgba(255,85,85,0.9)',
                            padding: '4px 8px',
                            fontSize: '0.75rem',
                        }}>
                            ❌ Transcode failed
                        </div>
                    )}

                    {/* Private badge */}
                    {showPrivateBadge && media.isPrivate && (
                        <div style={{
                            position: 'absolute',
                            top: '4px',
                            left: '4px',
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                        }}>
                            🔒
                        </div>
                    )}
                </div>
            </a>

            {/* Card footer with actions */}
            <div style={{
                padding: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '8px',
            }}>
                <div style={{
                    fontSize: '0.75rem',
                    color: '#888',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1,
                }}>
                    {media.originalName}
                    {showIp && media.ip && (
                        <div style={{ color: '#5865f2', marginTop: '2px' }}>IP: {media.ip}</div>
                    )}
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                    {onCopyLink && (
                        <button
                            onClick={() => onCopyLink(mediaUrl)}
                            title="Copy Link"
                            style={{
                                backgroundColor: '#333',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '4px 8px',
                                cursor: 'pointer',
                                fontSize: '0.75rem',
                            }}
                        >
                            📋
                        </button>
                    )}
                    <button
                        onClick={() => onDelete(media.id)}
                        title="Delete"
                        style={{
                            backgroundColor: 'transparent',
                            color: '#ff5555',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '4px 8px',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                        }}
                    >
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    );
}

// CSS for spinner - to be included in the page
export const spinnerStyles = `
@keyframes spin {
    to { transform: rotate(360deg); }
}
`;
