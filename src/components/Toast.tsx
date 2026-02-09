'use client';

import { useState, useCallback } from 'react';

interface ToastProps {
    message: string;
    show: boolean;
    type?: 'success' | 'error';
}

export function Toast({ message, show, type = 'success' }: ToastProps) {
    if (!show) return null;

    return (
        <div
            role="status"
            style={{
                position: 'fixed',
                bottom: 24,
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: type === 'error' ? 'var(--danger)' : 'var(--success)',
                color: '#fff',
                padding: '12px 20px',
                borderRadius: 'var(--radius)',
                fontSize: '0.875rem',
                fontWeight: 500,
                boxShadow: 'var(--shadow)',
                zIndex: 1001,
                animation: 'toast-in 0.2s ease-out',
            }}
        >
            {message}
        </div>
    );
}

export function useToast() {
    const [toast, setToast] = useState<{ show: boolean, message: string, type: 'success' | 'error' }>({
        show: false,
        message: '',
        type: 'success'
    });

    const showToast = useCallback((message: string, typeOrDuration: 'success' | 'error' | number = 'success', duration: number = 2000) => {
        let finalType: 'success' | 'error' = 'success';
        let finalDuration = duration;

        if (typeof typeOrDuration === 'number') {
            finalDuration = typeOrDuration;
        } else {
            finalType = typeOrDuration;
        }

        setToast({ show: true, message, type: finalType });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), finalDuration);
    }, []);

    return { toast, showToast };
}

