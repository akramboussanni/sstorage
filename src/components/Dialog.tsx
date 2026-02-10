'use client';

import { useState, useEffect } from 'react';

export interface DialogState {
    open: boolean;
    title: string;
    message: string;
    type: 'confirm' | 'alert' | 'prompt' | 'choice' | 'checkbox';
    onConfirm?: () => void;
    onPrompt?: (value: string) => void;
    onChoice?: (value: string) => void;
    promptPlaceholder?: string;
    choices?: Array<{ label: string; value: string }>;
    selectedChoice?: string;
    checkboxLabel?: string;
    checkboxChecked?: boolean;
    onCheckboxChange?: (checked: boolean) => void;
}

interface DialogProps {
    state: DialogState;
    onClose: () => void;
}

export function Dialog({ state, onClose }: DialogProps) {
    const [inputValue, setInputValue] = useState('');
    const [checkboxValue, setCheckboxValue] = useState(state.checkboxChecked || false);
    
    useEffect(() => {
        if (state.open && state.type === 'prompt') {
            setInputValue('');
        }
        if (state.open && state.type === 'checkbox') {
            setCheckboxValue(state.checkboxChecked || false);
        }
    }, [state.open, state.type, state.checkboxChecked]);
    
    if (!state.open) return null;

    const handleConfirm = () => {
        if (state.type === 'prompt') {
            state.onPrompt?.(inputValue);
        } else if (state.type === 'choice') {
            state.onChoice?.(state.selectedChoice || '');
            state.onConfirm?.();
        } else {
            state.onConfirm?.();
        }
        onClose();
        setInputValue('');
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
        }}>
            <div
                className="app-card"
                style={{
                    maxWidth: '400px',
                    width: '90%',
                    padding: '24px',
                    boxShadow: 'var(--shadow-lg)',
                }}
            >
                <h3 style={{ margin: 0, marginBottom: 8, fontSize: '1.125rem', fontWeight: 600 }}>{state.title}</h3>
                {state.message && (
                    <p style={{ color: 'var(--muted-foreground)', marginBottom: 20, fontSize: '0.9375rem' }}>{state.message}</p>
                )}
                {state.type === 'prompt' && (
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleConfirm();
                            if (e.key === 'Escape') { onClose(); setInputValue(''); }
                        }}
                        placeholder={state.promptPlaceholder || 'Enter value…'}
                        autoFocus
                        className="app-input"
                        style={{ marginBottom: 20 }}
                    />
                )}
                {state.type === 'checkbox' && (
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={checkboxValue}
                            onChange={(e) => {
                                setCheckboxValue(e.target.checked);
                                state.onCheckboxChange?.(e.target.checked);
                            }}
                            style={{ cursor: 'pointer' }}
                        />
                        <span>{state.checkboxLabel}</span>
                    </label>
                )}
                {state.type === 'choice' && state.choices && (
                    <div style={{ marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {state.choices.map((choice) => (
                            <label key={choice.value} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="choice"
                                    value={choice.value}
                                    checked={state.selectedChoice === choice.value}
                                    onChange={(e) => {
                                        if (state.onChoice) {
                                            state.onChoice(e.target.value);
                                        }
                                    }}
                                    style={{ cursor: 'pointer' }}
                                />
                                <span>{choice.label}</span>
                            </label>
                        ))}
                    </div>
                )}
                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                    {(state.type === 'confirm' || state.type === 'prompt' || state.type === 'checkbox') && (
                        <button type="button" onClick={() => { onClose(); setInputValue(''); }} className="app-btn app-btn-secondary">
                            Cancel
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={handleConfirm}
                        className={state.type === 'confirm' ? 'app-btn app-btn-danger' : 'app-btn app-btn-primary'}
                    >
                        {state.type === 'confirm' ? 'Delete' : state.type === 'prompt' ? 'OK' : 'OK'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export function useDialog() {
    const [dialog, setDialog] = useState<DialogState>({ open: false, title: '', message: '', type: 'alert' });

    const showDialog = (
        title: string, 
        message: string, 
        type: 'confirm' | 'alert' | 'prompt' | 'choice' | 'checkbox' = 'alert', 
        onConfirm?: () => void,
        onPrompt?: (value: string) => void,
        promptPlaceholder?: string,
        onChoice?: (value: string) => void,
        selectedChoice?: string,
        choices?: Array<{ label: string; value: string }>,
        checkboxLabel?: string,
        checkboxChecked?: boolean,
        onCheckboxChange?: (checked: boolean) => void
    ) => {
        setDialog({ open: true, title, message, type, onConfirm, onPrompt, promptPlaceholder, onChoice, selectedChoice, choices, checkboxLabel, checkboxChecked, onCheckboxChange });
    };

    const closeDialog = () => setDialog({ ...dialog, open: false });

    return { dialog, showDialog, closeDialog };
}
