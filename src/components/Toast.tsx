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
        <div style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: type === 'error' ? '#f04747' : '#43b581',
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
    const [toast, setToast] = useState<{ show: boolean, message: string, type: 'success' | 'error' }>({
        show: false,
        message: '',
        type: 'success'
    });

    const showToast = useCallback((message: string, durationOrType: number | 'success' | 'error' = 2000) => {
        let duration = 2000;
        let type: 'success' | 'error' = 'success';

        if (typeof durationOrType === 'string') {
            type = durationOrType;
        } else {
            duration = durationOrType;
        }

        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), duration);
    }, []);

    return { toast, showToast };
}

