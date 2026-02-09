'use client';

import { useEffect, useRef, useState } from 'react';

export type ContextMenuItem = {
    icon?: React.ReactNode;
    danger?: boolean;
    disabled?: boolean;
} & (
    | {
          label: string;
          onClick: () => void;
          separator?: false | undefined;
      }
    | {
          separator: true;
      }
);

interface ContextMenuProps {
    items: ContextMenuItem[];
    position: { x: number; y: number } | null;
    onClose: () => void;
}

export function ContextMenu({ items, position, onClose }: ContextMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);
    const [adjustedPosition, setAdjustedPosition] = useState<{ x: number; y: number } | null>(null);

    // Update adjusted position whenever position changes
    useEffect(() => {
        if (!position) {
            setAdjustedPosition(null);
            return;
        }

        // Use a small delay to ensure the DOM is ready
        const timer = requestAnimationFrame(() => {
            if (menuRef.current) {
                const rect = menuRef.current.getBoundingClientRect();
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;

                let x = position.x;
                let y = position.y;

                // Adjust horizontal position if menu would overflow
                if (x + rect.width > viewportWidth) {
                    x = viewportWidth - rect.width - 8;
                }
                if (x < 8) x = 8;

                // Adjust vertical position if menu would overflow
                if (y + rect.height > viewportHeight) {
                    y = viewportHeight - rect.height - 8;
                }
                if (y < 8) y = 8;

                setAdjustedPosition({ x, y });
            } else {
                // If ref isn't available yet, use the position as-is
                setAdjustedPosition(position);
            }
        });

        return () => cancelAnimationFrame(timer);
    }, [position]);

    useEffect(() => {
        if (!position) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        // Small delay to prevent immediate close on right-click
        const timeout = setTimeout(() => {
            document.addEventListener('click', handleClickOutside);
            document.addEventListener('contextmenu', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }, 10);

        return () => {
            clearTimeout(timeout);
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('contextmenu', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [position, onClose]);

    if (!position) return null;

    return (
        <div
            ref={menuRef}
            style={{
                position: 'fixed',
                left: adjustedPosition?.x ?? position.x,
                top: adjustedPosition?.y ?? position.y,
                zIndex: 50000,
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow-lg)',
                padding: '4px',
                minWidth: '180px',
                maxWidth: '280px',
                visibility: adjustedPosition ? 'visible' : 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
        >
            {items.length === 0 ? (
                <div style={{ padding: '8px 12px', color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
                    No options
                </div>
            ) : (
                items.map((item, index) => {
                    if (item.separator) {
                        return (
                            <div
                                key={`separator-${index}`}
                                style={{
                                    height: '1px',
                                    background: 'var(--border)',
                                    margin: '4px 0',
                                }}
                            />
                        );
                    }

                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (!item.disabled) {
                                    item.onClick();
                                    onClose();
                                }
                            }}
                            disabled={item.disabled}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '8px 12px',
                                background: 'transparent',
                                border: 'none',
                                borderRadius: 'var(--radius)',
                                color: item.danger ? 'var(--danger)' : 'var(--foreground)',
                                fontSize: '0.875rem',
                                cursor: item.disabled ? 'not-allowed' : 'pointer',
                                opacity: item.disabled ? 0.5 : 1,
                                transition: 'background-color 0.15s ease',
                                textAlign: 'left',
                            }}
                            onMouseEnter={(e) => {
                                if (!item.disabled) {
                                    e.currentTarget.style.background = item.danger
                                        ? 'rgba(239, 68, 68, 0.1)'
                                        : 'var(--surface-hover)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                            }}
                        >
                            {item.icon && (
                                <span style={{ display: 'flex', alignItems: 'center', fontSize: '1rem' }}>
                                    {item.icon}
                                </span>
                            )}
                            <span style={{ flex: 1 }}>{item.label}</span>
                        </button>
                    );
                })
            )}
        </div>
    );
}

export function useContextMenu() {
    const [contextMenu, setContextMenu] = useState<{
        items: ContextMenuItem[];
        position: { x: number; y: number } | null;
    }>({ items: [], position: null });

    const showContextMenu = (items: ContextMenuItem[], position: { x: number; y: number }) => {
        setContextMenu({ items, position });
    };

    const closeContextMenu = () => {
        setContextMenu({ items: [], position: null });
    };

    return {
        contextMenu,
        showContextMenu,
        closeContextMenu,
    };
}
