'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useToast, Toast } from './Toast';

export interface UploadItem {
    id: string;
    file: File;
    progress: number; // 0-100
    status: 'pending' | 'uploading' | 'completed' | 'error';
    error?: string;
    driveId?: string;
    folderId?: string;
    quality?: string;
}

interface UploadContextType {
    uploads: UploadItem[];
    startUpload: (file: File, options?: { driveId?: string; folderId?: string; quality?: string }) => Promise<void>;
    removeUpload: (id: string) => void;
    clearCompleted: () => void;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export function UploadProvider({ children }: { children: ReactNode }) {
    const [uploads, setUploads] = useState<UploadItem[]>([]);
    const { toast, showToast } = useToast();

    const updateUpload = (id: string, updates: Partial<UploadItem>) => {
        setUploads(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
    };

    const removeUpload = (id: string) => {
        setUploads(prev => prev.filter(u => u.id !== id));
    };

    const clearCompleted = () => {
        setUploads(prev => prev.filter(u => u.status !== 'completed'));
    };

    const startUpload = useCallback(async (file: File, options?: { driveId?: string; folderId?: string; quality?: string }) => {
        const id = crypto.randomUUID();
        const newItem: UploadItem = {
            id,
            file,
            progress: 0,
            status: 'pending',
            ...options
        };

        setUploads(prev => [...prev, newItem]);

        // Start upload process
        try {
            updateUpload(id, { status: 'uploading' });

            const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
            const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
            const uploadId = crypto.randomUUID(); // Session ID for chunking

            const baseUrl = options?.driveId 
                ? `/api/drives/${options.driveId}/upload`
                : `/api/upload`;

            if (totalChunks === 1) {
                // Single Upload
                const formData = new FormData();
                formData.append('file', file);
                if (options?.folderId) formData.append('folderId', options.folderId);
                if (options?.quality) formData.append('quality', options.quality);
                if (options?.driveId) formData.append('driveId', options.driveId); // For main endpoint if needed

                const res = await fetch(baseUrl, {
                    method: 'POST',
                    body: formData,
                });

                if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.error || 'Upload failed');
                }
                
                updateUpload(id, { progress: 100, status: 'completed' });
                showToast(`Uploaded ${file.name}`);
            } else {
                // Chunked Upload
                for (let i = 0; i < totalChunks; i++) {
                    const start = i * CHUNK_SIZE;
                    const end = Math.min(file.size, start + CHUNK_SIZE);
                    const chunk = file.slice(start, end);

                    const formData = new FormData();
                    formData.append('file', chunk, file.name);
                    if (options?.folderId) formData.append('folderId', options.folderId);
                    if (options?.quality) formData.append('quality', options.quality);
                    if (options?.driveId) formData.append('driveId', options.driveId);

                    const params = new URLSearchParams({
                        chunkIndex: i.toString(),
                        totalChunks: totalChunks.toString(),
                        uploadId: uploadId
                    });

                    const res = await fetch(`${baseUrl}?${params.toString()}`, {
                        method: 'POST',
                        body: formData,
                    });

                    if (!res.ok) {
                        const data = await res.json();
                        throw new Error(data.error || 'Chunk upload failed');
                    }

                    // Update progress
                    // Progress is (chunks completed / total) * 100
                    const progress = Math.round(((i + 1) / totalChunks) * 100);
                    updateUpload(id, { progress });
                }
                
                updateUpload(id, { status: 'completed' });
                showToast(`Uploaded ${file.name}`);
            }

        } catch (error: any) {
            console.error(error);
            updateUpload(id, { status: 'error', error: error.message || 'Upload failed' });
            showToast(`Failed to upload ${file.name}`, 'error');
        }
    }, [showToast]);

    // We render the Toast here because this provider drives toast notifications for uploads
    return (
        <UploadContext.Provider value={{ uploads, startUpload, removeUpload, clearCompleted }}>
            {children}
            <Toast message={toast.message} show={toast.show} type={toast.type} />
        </UploadContext.Provider>
    );
}

export function useUpload() {
    const context = useContext(UploadContext);
    if (!context) {
        throw new Error('useUpload must be used within an UploadProvider');
    }
    return context;
}
