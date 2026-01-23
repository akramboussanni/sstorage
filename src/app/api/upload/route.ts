import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { startTranscodeInBackground } from '@/lib/transcode';

const UPLOAD_DIR = join(process.cwd(), 'uploads');
const MAX_SIZE = 100 * 1024 * 1024; // 100MB

const RATE_LIMIT_WINDOW = 10 * 1000; // 10 seconds
const rateLimitMap = new Map<string, number>();

export async function POST(request: NextRequest) {
    try {
        // Check if public upload is allowed or user is logged in
        const session = await getSession();
        const settings = await prisma.settings.findUnique({ where: { id: 'default' } });

        if (!settings?.allowPublicUpload && !session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Rate Limit Check
        const forwardedFor = request.headers.get('x-forwarded-for');
        const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

        if (!session) { // Only rate limit non-logged in users (or everyone if desired, usually guests)
            const now = Date.now();
            const lastUpload = rateLimitMap.get(ip);

            if (lastUpload && now - lastUpload < RATE_LIMIT_WINDOW) {
                return NextResponse.json({ error: 'Rate limit exceeded. Try again in a few seconds.' }, { status: 429 });
            }
            rateLimitMap.set(ip, now);
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        if (file.size > MAX_SIZE && !session?.isAdmin) {
            return NextResponse.json({ error: 'File too large (max 100MB)' }, { status: 400 });
        }

        // Validate mime type
        const allowedTypes = ['image/', 'video/', 'image/gif'];
        const isAllowed = allowedTypes.some(type => file.type.startsWith(type));
        if (!isAllowed) {
            return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
        }

        // Create upload directory if not exists
        await mkdir(UPLOAD_DIR, { recursive: true });

        // Generate unique filename
        const ext = file.name.split('.').pop();
        const id = uuidv4();
        const filename = `${id}.${ext}`;
        const filepath = join(UPLOAD_DIR, filename);

        // Save file
        const bytes = await file.arrayBuffer();
        await writeFile(filepath, Buffer.from(bytes));

        // Check if this is a video that needs transcoding
        const isVideo = file.type.startsWith('video/');
        const transcodeStatus = isVideo ? 'pending' : 'not_required';

        // Save to database
        const media = await prisma.media.create({
            data: {
                id,
                filename,
                originalName: file.name,
                mimeType: file.type,
                size: file.size,
                ip,
                transcodeStatus,
            },
        });

        // Start transcoding in background if it's a video
        if (isVideo) {
            startTranscodeInBackground(media.id, filename);
        }

        return NextResponse.json({
            success: true,
            id: media.id,
            url: `/api/media/${media.id}`,
            transcodeStatus,
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
