'use client';

import { useState } from 'react';

export interface DialogState {
    open: boolean;
    title: string;
    message: string;
    type: 'confirm' | 'alert';
    onConfirm?: () => void;
}

interface DialogProps {
    state: DialogState;
    onClose: () => void;
}

export function Dialog({ state, onClose }: DialogProps) {
    if (!state.open) return null;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
        }}>
            <div style={{
                backgroundColor: '#1a1a1a',
                borderRadius: '12px',
                padding: '24px',
                maxWidth: '400px',
                width: '90%',
                border: '1px solid #333',
            }}>
                <h3 style={{ margin: 0, marginBottom: '12px' }}>{state.title}</h3>
                <p style={{ color: '#888', marginBottom: '20px' }}>{state.message}</p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    {state.type === 'confirm' && (
                        <button
                            onClick={onClose}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#333',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                            }}
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        onClick={() => {
                            state.onConfirm?.();
                            onClose();
                        }}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: state.type === 'confirm' ? '#ff5555' : '#5865f2',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                        }}
                    >
                        {state.type === 'confirm' ? 'Confirm' : 'OK'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export function useDialog() {
    const [dialog, setDialog] = useState<DialogState>({ open: false, title: '', message: '', type: 'alert' });

    const showDialog = (title: string, message: string, type: 'confirm' | 'alert' = 'alert', onConfirm?: () => void) => {
        setDialog({ open: true, title, message, type, onConfirm });
    };

    const closeDialog = () => setDialog({ ...dialog, open: false });

    return { dialog, showDialog, closeDialog };
}
