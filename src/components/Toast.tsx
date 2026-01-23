'use client';

import { useState, useCallback } from 'react';

interface ToastProps {
    message: string;
    show: boolean;
}

export function Toast({ message, show }: ToastProps) {
    if (!show) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#43b581',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '8px',
            zIndex: 1001,
            animation: 'fadeIn 0.2s ease-out',
        }}>
            {message}
        </div>
    );
}

export function useToast() {
    const [toast, setToast] = useState({ show: false, message: '' });

    const showToast = useCallback((message: string, duration: number = 2000) => {
        setToast({ show: true, message });
        setTimeout(() => setToast({ show: false, message: '' }), duration);
    }, []);

    return { toast, showToast };
}
