import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, rm } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '@/lib/db';
import { startTranscodeInBackground, CompressionQuality } from '@/lib/transcode';
import { existsSync, createReadStream, createWriteStream } from 'fs';
import { readdir, stat } from 'fs/promises';

const UPLOAD_DIR = join(process.cwd(), 'uploads');
const TEMP_DIR = join(UPLOAD_DIR, 'temp');

const VALID_QUALITIES: CompressionQuality[] = ['none', 'high', 'balanced', 'small'];

// MIME type mapping by file extension
const MIME_TYPE_MAP: Record<string, string> = {
    // Video formats
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'avi': 'video/x-msvideo',
    'mov': 'video/quicktime',
    'qt': 'video/quicktime',
    'flv': 'video/x-flv',
    'wmv': 'video/x-ms-wmv',
    'mkv': 'video/x-matroska',
    '3gp': 'video/3gpp',
    'f4v': 'video/x-f4v',
    'mpg': 'video/mpeg',
    'mpeg': 'video/mpeg',
    'm4v': 'video/x-m4v',
    'ts': 'video/mp2t',
    'm3u8': 'application/vnd.apple.mpegurl',
    
    // Image formats
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'avif': 'image/avif',
    'svg': 'image/svg+xml',
    'ico': 'image/x-icon',
    'bmp': 'image/bmp',
    'tiff': 'image/tiff',
    'tif': 'image/tiff',
    'heic': 'image/heic',
    'heif': 'image/heif',
};

function getMimeType(filename: string, browserMimeType?: string): string {
    // If browser detected a MIME type and it's valid, use it
    if (browserMimeType && browserMimeType !== '') {
        return browserMimeType;
    }
    
    // Fall back to extension-based detection
    const ext = filename.split('.').pop()?.toLowerCase() || '';
    return MIME_TYPE_MAP[ext] || browserMimeType || 'application/octet-stream';
}

export interface UploadContext {
    userId?: string | null;
    driveId?: string | null; // If provided, overrides form data
    folderId?: string | null; // If provided, overrides form data
    forcedIp?: string;
    anonToken?: string | null; // Token for anonymous users
}

export async function handleUpload(
    request: NextRequest,
    context: UploadContext = {},
    preParsedFormData?: FormData
) {
    let filepath = ''; // Declare in outer scope for catch block access
    
    try {
        // Ensure directories exist
        if (!existsSync(UPLOAD_DIR)) {
            await mkdir(UPLOAD_DIR, { recursive: true });
        }
        if (!existsSync(TEMP_DIR)) {
            await mkdir(TEMP_DIR, { recursive: true });
        }

        const url = request.nextUrl;
        const chunkIndexStr = url.searchParams.get('chunkIndex');
        const totalChunksStr = url.searchParams.get('totalChunks');
        const uploadId = url.searchParams.get('uploadId');

        const isChunked = chunkIndexStr !== null && totalChunksStr !== null && uploadId !== null;
        const chunkIndex = isChunked ? parseInt(chunkIndexStr) : 0;
        const totalChunks = isChunked ? parseInt(totalChunksStr) : 1;

        const formData = preParsedFormData || await request.formData();
        const file = formData.get('file') as File;
        const formDriveId = formData.get('driveId') as string | null;
        const formFolderId = formData.get('folderId') as string | null;
        const qualityParam = formData.get('quality') as string | null;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Determine IDs
        const driveId = context.driveId || formDriveId || null;
        const folderId = context.folderId || formFolderId || null;

        // Settings & Quality
        const settings = await prisma.settings.findUnique({ where: { id: 'default' } });
        const quality: CompressionQuality = qualityParam && VALID_QUALITIES.includes(qualityParam as CompressionQuality)
            ? (qualityParam as CompressionQuality)
            : (settings?.defaultCompression as CompressionQuality) || 'balanced';

        // File Identification
        const fileId = isChunked ? uploadId! : uuidv4();
        const ext = file.name.split('.').pop() || '';
        const filename = `${fileId}.${ext}`;
        filepath = join(UPLOAD_DIR, filename);

        let finalSize = 0;

        if (isChunked) {
             const chunkDir = join(TEMP_DIR, fileId);
             if (!existsSync(chunkDir)) {
                 await mkdir(chunkDir, { recursive: true });
             }
             
             const chunkPath = join(chunkDir, `chunk-${chunkIndex}`);
             const bytes = await file.arrayBuffer();
             await writeFile(chunkPath, Buffer.from(bytes));

             // Check if all chunks are uploaded
             const dirFiles = await readdir(chunkDir);
             const files = dirFiles.filter(f => f.startsWith('chunk-'));
             
             // We use a simple check here. For robust production systems, 
             // you'd want a separate "finalize" step or a map of received chunks.
             // But checking count == total works if we trust the client sends 0..N-1
             if (files.length === totalChunks) {
                 // Sort chunks numerically
                 files.sort((a: string, b: string) => {
                     const idxA = parseInt(a.split('-')[1]);
                     const idxB = parseInt(b.split('-')[1]);
                     return idxA - idxB;
                 });

                 // Verify integrity (basic)
                 for(let i=0; i<totalChunks; i++) {
                     if (!files.some((f: string) => f === `chunk-${i}`)) {
                         // Missing chunks, wait for them
                         return NextResponse.json({ success: true, chunkId: chunkIndex, message: 'Chunk received' });
                     }
                 }
                 
                 try {
                     // Create write stream for final file
                     const writeStream = createWriteStream(filepath);
                     
                     for (let i = 0; i < totalChunks; i++) {
                         const cp = join(chunkDir, `chunk-${i}`);
                         const readStream = createReadStream(cp);
                         await new Promise<void>((resolve, reject) => {
                             readStream.pipe(writeStream, { end: false });
                             readStream.on('end', () => resolve());
                             readStream.on('error', reject);
                         });
                     }
                     writeStream.end();
                     
                     // Wait for close with timeout
                     await Promise.race([
                         new Promise<void>((resolve, reject) => {
                             writeStream.on('finish', () => resolve());
                             writeStream.on('error', reject);
                         }),
                         new Promise<void>((_, reject) =>
                             setTimeout(() => reject(new Error('Write stream timeout')), 30000)
                         )
                     ]);

                     // Get final size
                     const stats = await stat(filepath);
                     finalSize = stats.size;

                     // Clean up chunks
                     await rm(chunkDir, { recursive: true, force: true });
                 } catch (error: any) {
                     // Clean up on assembly error
                     await rm(chunkDir, { recursive: true, force: true }).catch(() => {});
                     await rm(filepath, { force: true }).catch(() => {});
                     throw error;
                 }
             } else {
                 return NextResponse.json({ success: true, chunkId: chunkIndex, message: 'Chunk received' });
             }

        } else {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            await writeFile(filepath, buffer);
            finalSize = buffer.length;
        }

        // Processing (DB + Transcode)
        const actualMimeType = getMimeType(file.name, file.type);
        const isVideo = actualMimeType.startsWith('video/');
        const shouldTranscode = isVideo && quality !== 'none';

        // Validate foreign key references before creating media
        if (driveId) {
            const driveExists = await prisma.drive.findUnique({
                where: { id: driveId },
                select: { id: true }
            });
            if (!driveExists) {
                // Clean up uploaded file if drive doesn't exist
                await rm(filepath, { force: true }).catch(() => {});
                return NextResponse.json({ error: 'Drive not found' }, { status: 404 });
            }
        }

        if (folderId) {
            const folderExists = await prisma.folder.findUnique({
                where: { id: folderId },
                select: { id: true }
            });
            if (!folderExists) {
                // Clean up uploaded file if folder doesn't exist
                await rm(filepath, { force: true }).catch(() => {});
                return NextResponse.json({ error: 'Folder not found' }, { status: 404 });
            }
        }

        if (context.userId) {
            const userExists = await prisma.user.findUnique({
                where: { id: context.userId },
                select: { id: true }
            });
            if (!userExists) {
                // Clean up uploaded file if user doesn't exist
                await rm(filepath, { force: true }).catch(() => {});
                return NextResponse.json({ error: 'User not found' }, { status: 404 });
            }
        }

        const media = await prisma.media.create({
            data: {
                id: fileId,
                filename,
                originalName: file.name,
                mimeType: getMimeType(file.name, file.type),
                size: finalSize,
                anonToken: context.anonToken || null,
                userId: context.userId || null,
                driveId: driveId,
                folderId: folderId,
                transcodeStatus: shouldTranscode ? 'pending' : 'not_required',
            }
        });

        if (shouldTranscode) {
            startTranscodeInBackground(fileId, filename, quality);
        }

        return NextResponse.json({
            success: true,
            id: media.id,
            url: `/api/media/${media.id}`,
            transcodeStatus: media.transcodeStatus,
            quality: isVideo ? quality : null,
            media
        });


    } catch (error: any) {
        console.error('Upload error:', error);
        
        // Clean up partial uploads
        if (existsSync(filepath)) {
            await rm(filepath, { force: true }).catch(() => {});
        }
        
        if (error.code === 'P2003') {
            return NextResponse.json({ error: 'Invalid reference (User, Drive, or Folder not found)' }, { status: 400 });
        }
        
        if (error.message?.includes('timeout') || error.code === 'ECONNRESET') {
            return NextResponse.json({ error: 'Upload operation timed out. Please try again with a smaller file or better connection.' }, { status: 408 });
        }
        
        return NextResponse.json({ error: 'Upload failed', details: error.message }, { status: 500 });
    }
}
