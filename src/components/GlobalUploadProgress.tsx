'use client';

import { useUpload, UploadItem } from './UploadContext';
import { useState } from 'react';

export function GlobalUploadProgress() {
    const { uploads, removeUpload, clearCompleted } = useUpload();
    const [isExpanded, setIsExpanded] = useState(false);

    if (uploads.length === 0) return null;

    const completedCount = uploads.filter(u => u.status === 'completed').length;
    const activeUploads = uploads.filter(u => u.status === 'uploading' || u.status === 'pending');
    
    // Auto-hide if all completed? Maybe show for a bit then hide?
    // For now, let user clear manually or just show list.

    if (!isExpanded) {
        return (
            <button
                onClick={() => setIsExpanded(true)}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '24px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 16px',
                    cursor: 'pointer',
                    color: 'var(--foreground)',
                }}
            >
                {/* Upload Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: activeUploads.length > 0 ? 'var(--accent)' : 'inherit' }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                
                <span style={{ fontSize: '14px', fontWeight: 500 }}>
                    {activeUploads.length > 0 
                        ? `${activeUploads.length} Uploading...` 
                        : `${completedCount} Completed`}
                </span>
            </button>
        );
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '320px',
            maxWidth: 'calc(100vw - 40px)', // Responsive width
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            {/* Header */}
            <div style={{
                padding: '12px 16px',
                backgroundColor: 'var(--surface-hover)',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer'
            }} onClick={() => setIsExpanded(false)}>
                <span style={{ fontWeight: 500, fontSize: '14px' }}>
                    Uploads ({activeUploads.length} active)
                </span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {completedCount > 0 && (
                        <button 
                            onClick={(e) => { e.stopPropagation(); clearCompleted(); }}
                            style={{ 
                                fontSize: '12px', 
                                color: 'var(--accent)',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px'
                            }}
                        >
                            Clear
                        </button>
                    )}
                    <span style={{ fontSize: '12px' }}>▼</span>
                </div>
            </div>

            {/* List */}
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {uploads.map(item => (
                    <UploadItemRow key={item.id} item={item} onDismiss={() => removeUpload(item.id)} />
                ))}
            </div>
        </div>
    );
}

function UploadItemRow({ item, onDismiss }: { item: UploadItem, onDismiss: () => void }) {
    return (
        <div style={{
            padding: '12px 16px',
            borderBottom: '1px solid var(--border)',
            fontSize: '13px'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ 
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis',
                    maxWidth: '80%'
                }}>{item.file.name}</span>
                {item.status !== 'uploading' && item.status !== 'pending' && (
                    <button onClick={onDismiss} style={{ 
                        border: 'none', background: 'none', cursor: 'pointer', opacity: 0.5, color: 'var(--foreground)'
                    }}>✕</button>
                )}
            </div>
            
            <div style={{ 
                height: '4px', 
                width: '100%', 
                backgroundColor: 'var(--border)', 
                borderRadius: '2px',
                overflow: 'hidden'
            }}>
                <div style={{ 
                    height: '100%', 
                    width: `${item.progress}%`, 
                    backgroundColor: item.status === 'error' ? 'var(--danger)' : 
                                   item.status === 'completed' ? 'var(--success)' : 'var(--accent)',
                    transition: 'width 0.2s ease'
                }} />
            </div>
            
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginTop: '4px', 
                fontSize: '11px', 
                color: 'var(--muted-foreground)' 
            }}>
                <span>{item.status === 'uploading' ? `${item.progress}%` : item.status}</span>
                {item.error && <span style={{ color: 'var(--danger)' }}>{item.error}</span>}
            </div>
        </div>
    );
}
