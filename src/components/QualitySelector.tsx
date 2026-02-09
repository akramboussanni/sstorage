'use client';

import { Video } from 'lucide-react';

type CompressionQuality = 'none' | 'high' | 'balanced' | 'small';

const QUALITY_OPTIONS: { value: CompressionQuality; label: string; description: string }[] = [
    { value: 'none', label: 'No Compression', description: 'Original quality, larger file' },
    { value: 'high', label: 'High Quality', description: 'Near-lossless, slight compression' },
    { value: 'balanced', label: 'Balanced', description: 'Good quality, good compression' },
    { value: 'small', label: 'Smaller File', description: 'Lower quality, maximum compression' },
];

interface QualitySelectorProps {
    value: CompressionQuality;
    onChange: (quality: CompressionQuality) => void;
}

export type { CompressionQuality };

export function QualitySelector({ value, onChange }: QualitySelectorProps) {
    return (
        <div style={{
            width: '100%',
            padding: '16px',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
        }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: '#888', fontSize: '0.9rem' }}>
                <Video size={16} /> Video Compression Quality
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {QUALITY_OPTIONS.map((option) => (
                    <label
                        key={option.value}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px 12px',
                            backgroundColor: value === option.value ? '#2a2a4a' : '#0a0a0a',
                            border: value === option.value ? '1px solid #5865f2' : '1px solid #333',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                    >
                        <input
                            type="radio"
                            name="quality"
                            value={option.value}
                            checked={value === option.value}
                            onChange={(e) => onChange(e.target.value as CompressionQuality)}
                            style={{ accentColor: '#5865f2' }}
                        />
                        <div>
                            <div style={{ fontWeight: value === option.value ? 600 : 400 }}>
                                {option.label}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#888' }}>
                                {option.description}
                            </div>
                        </div>
                    </label>
                ))}
            </div>
        </div>
    );
}
