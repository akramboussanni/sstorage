import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { startTranscodeInBackground, CompressionQuality } from '@/lib/transcode';
import { existsSync } from 'fs';

const UPLOAD_DIR = join(process.cwd(), 'uploads');
const TEMP_DIR = join(UPLOAD_DIR, 'temp');

const VALID_QUALITIES: CompressionQuality[] = ['none', 'high', 'balanced', 'small'];

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getSession();

        const drive = await prisma.drive.findUnique({ where: { id } });
        if (!drive) {
            return NextResponse.json({ error: 'Drive not found' }, { status: 404 });
        }

        // Check if user can edit
        const canEdit = (session && drive.ownerId === session.id) || 
            (session && (await prisma.driveAccess.findUnique({
                where: {
                    driveId_userId: {
                        driveId: id,
                        userId: session.id
                    }
                }
            }))?.role === 'EDITOR') ||
            (drive.isPublic && drive.publicRole === 'EDITOR');

        if (!canEdit) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;
        const folderId = formData.get('folderId') as string | null;
        const qualityParam = formData.get('quality') as string | null;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Get settings for compression
        const settings = await prisma.settings.findUnique({ where: { id: 'default' } });
        const quality: CompressionQuality = qualityParam && VALID_QUALITIES.includes(qualityParam as CompressionQuality)
            ? (qualityParam as CompressionQuality)
            : (settings?.defaultCompression as CompressionQuality) || 'balanced';

        // Ensure upload directory exists
        if (!existsSync(UPLOAD_DIR)) {
            await mkdir(UPLOAD_DIR, { recursive: true });
        }
        if (!existsSync(TEMP_DIR)) {
            await mkdir(TEMP_DIR, { recursive: true });
        }

        const fileId = uuidv4();
        const ext = file.name.split('.').pop() || '';
        const filename = `${fileId}.${ext}`;
        const filepath = join(UPLOAD_DIR, filename);

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        await writeFile(filepath, buffer);

        const isVideo = file.type.startsWith('video/');
        const shouldTranscode = isVideo && quality !== 'none';

        const media = await prisma.media.create({
            data: {
                id: fileId,
                filename,
                originalName: file.name,
                mimeType: file.type,
                size: buffer.length,
                userId: session?.id || null,
                driveId: id,
                folderId: folderId || null,
                transcodeStatus: shouldTranscode ? 'pending' : 'not_required',
            }
        });

        if (shouldTranscode) {
            startTranscodeInBackground(fileId, filepath, quality);
        }

        return NextResponse.json(media);
    } catch (error) {
        console.error('Drive upload error:', error);
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }
}
