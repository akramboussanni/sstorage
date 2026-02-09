'use client';

import { useEffect, useRef, useState } from 'react';

interface PreviewCardProps {
    children: React.ReactNode;
    content: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
    disabled?: boolean;
}

export function PreviewCard({ 
    children, 
    content, 
    position = 'top',
    delay = 500,
    disabled = false 
}: PreviewCardProps) {
    const [showPreview, setShowPreview] = useState(false);
    const [previewPosition, setPreviewPosition] = useState<{ x: number; y: number } | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!showPreview || !containerRef.current || !previewRef.current) return;

        const container = containerRef.current;
        const preview = previewRef.current;
        const rect = container.getBoundingClientRect();
        const previewRect = preview.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let x = 0;
        let y = 0;

        switch (position) {
            case 'top':
                x = rect.left + rect.width / 2 - previewRect.width / 2;
                y = rect.top - previewRect.height - 8;
                break;
            case 'bottom':
                x = rect.left + rect.width / 2 - previewRect.width / 2;
                y = rect.bottom + 8;
                break;
            case 'left':
                x = rect.left - previewRect.width - 8;
                y = rect.top + rect.height / 2 - previewRect.height / 2;
                break;
            case 'right':
                x = rect.right + 8;
                y = rect.top + rect.height / 2 - previewRect.height / 2;
                break;
        }

        // Adjust if out of viewport
        if (x < 8) x = 8;
        if (x + previewRect.width > viewportWidth - 8) {
            x = viewportWidth - previewRect.width - 8;
        }
        if (y < 8) y = 8;
        if (y + previewRect.height > viewportHeight - 8) {
            y = viewportHeight - previewRect.height - 8;
        }

        setPreviewPosition({ x, y });
    }, [showPreview, position]);

    const handleMouseEnter = () => {
        if (disabled) return;
        timeoutRef.current = setTimeout(() => {
            setShowPreview(true);
        }, delay);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setShowPreview(false);
        setPreviewPosition(null);
    };

    return (
        <div
            ref={containerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ position: 'relative', display: 'inline-block' }}
        >
            {children}
            {showPreview && previewPosition && (
                <div
                    ref={previewRef}
                    style={{
                        position: 'fixed',
                        left: previewPosition.x,
                        top: previewPosition.y,
                        zIndex: 9999,
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-lg)',
                        padding: '16px',
                        maxWidth: '320px',
                        pointerEvents: 'none',
                        animation: 'previewFadeIn 0.15s ease-out',
                    }}
                >
                    {content}
                </div>
            )}
            <style>{`
                @keyframes previewFadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>
    );
}
