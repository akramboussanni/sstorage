'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ContextMenu, useContextMenu, ContextMenuItem } from './ContextMenu';
import { PreviewCard } from './PreviewCard';
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

interface DriveCardProps {
    drive: DriveItem;
    onDelete?: (id: string) => void;
    onRename?: (id: string, name: string) => void;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric'
    });
};

export function DriveCard({ drive, onDelete, onRename }: DriveCardProps) {
    const router = useRouter();
    const { contextMenu, showContextMenu, closeContextMenu } = useContextMenu();
    const [isHovered, setIsHovered] = useState(false);

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        const items: ContextMenuItem[] = [
            {
                label: 'Open in new tab',
                icon: <MenuIcons.Open />,
                onClick: () => window.open(`/drives/${drive.id}`, '_blank'),
            },
        ];

        if (onRename) {
            items.push({
                label: 'Rename',
                icon: <MenuIcons.Rename />,
                onClick: () => {
                    const newName = prompt('Enter new name:', drive.name);
                    if (newName && newName.trim() && newName !== drive.name) {
                        onRename(drive.id, newName.trim());
                    }
                },
            });
        }

        if (onDelete) {
            items.push(
                { separator: true },
                {
                    label: 'Delete',
                    icon: <MenuIcons.Delete />,
                    onClick: () => onDelete(drive.id),
                    danger: true,
                }
            );
        }

        showContextMenu(items, { x: e.clientX, y: e.clientY });
    };

    const previewContent = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '240px' }}>
            <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginBottom: '4px' }}>Drive name</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 500, wordBreak: 'break-word' }}>{drive.name}</div>
            </div>
            {drive.description && (
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginBottom: '4px' }}>Description</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>{drive.description}</div>
                </div>
            )}
            <div style={{ display: 'flex', gap: '16px' }}>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginBottom: '4px' }}>Files</div>
                    <div style={{ fontSize: '0.875rem' }}>{drive._count.files}</div>
                </div>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginBottom: '4px' }}>Owner</div>
                    <div style={{ fontSize: '0.875rem' }}>{drive.owner.username}</div>
                </div>
            </div>
            <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginBottom: '4px' }}>Created</div>
                <div style={{ fontSize: '0.875rem' }}>{formatDate(drive.createdAt)}</div>
            </div>
            {drive.isPublic && (
                <div style={{ 
                    padding: '6px 10px', 
                    background: 'rgba(99, 102, 241, 0.1)', 
                    borderRadius: 'var(--radius)',
                    fontSize: '0.8125rem',
                    color: 'var(--accent)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    width: 'fit-content'
                }}>
                    <OtherIcons.Globe /> Public drive
                </div>
            )}
        </div>
    );

    return (
        <>
            <PreviewCard content={previewContent} position="top" delay={600}>
                <div
                    className="app-card"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        textDecoration: 'none',
                        color: 'inherit',
                        padding: '24px',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.15s ease',
                        transform: isHovered ? 'translateY(-2px)' : 'none',
                        boxShadow: isHovered ? 'var(--shadow-lg)' : 'none',
                        cursor: 'pointer',
                        minHeight: '280px',
                    }}
                    onContextMenu={handleContextMenu}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => router.push(`/drives/${drive.id}`)}
                >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
                        <div
                            style={{
                                width: 48,
                                height: 48,
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                            }}
                        >
                            <MenuIcons.Folder style={{ width: 28, height: 28, color: 'white' }} />
                        </div>
                        <div style={{ minWidth: 0, flex: 1 }}>
                            <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, wordBreak: 'break-word' }}>{drive.name}</h3>
                            <p style={{ margin: '6px 0 0 0', fontSize: '0.8125rem', color: 'var(--muted-foreground)' }}>
                                {drive.owner.username}
                            </p>
                        </div>
                    </div>
                    {drive.description && (
                        <p style={{
                            fontSize: '0.8125rem',
                            color: 'var(--muted-foreground)',
                            marginBottom: 16,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            margin: '0 0 16px 0',
                        }}>
                            {drive.description}
                        </p>
                    )}
                    <div style={{ display: 'flex', gap: '16px', marginBottom: 16, flex: 1 }}>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginBottom: '4px' }}>Files</div>
                            <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{drive._count.files}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginBottom: '4px' }}>Created</div>
                            <div style={{ fontSize: '0.8125rem', color: 'var(--muted-foreground)' }}>{formatDate(drive.createdAt)}</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'auto' }}>
                        {drive.isPublic && (
                            <span style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '4px 8px', borderRadius: 6, color: 'var(--accent)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <OtherIcons.Globe style={{ width: 14, height: 14 }} /> Public
                            </span>
                        )}
                    </div>
                </div>
            </PreviewCard>
            <ContextMenu
                items={contextMenu.items}
                position={contextMenu.position}
                onClose={closeContextMenu}
            />
        </>
    );
}
