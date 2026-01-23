import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { startTranscodeInBackground, CompressionQuality } from '@/lib/transcode';

const UPLOAD_DIR = join(process.cwd(), 'uploads');

const RATE_LIMIT_WINDOW = 10 * 1000; // 10 seconds
const rateLimitMap = new Map<string, number>();

const VALID_QUALITIES: CompressionQuality[] = ['none', 'high', 'balanced', 'small'];

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
        const qualityParam = formData.get('quality') as string | null;
        const isPrivateParam = formData.get('isPrivate') as string | null;

        // Determine privacy: forcePrivate overrides, otherwise user choice (logged-in only)
        const isPrivate = settings?.forcePrivate || (isPrivateParam === 'true' && !!session);

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Determine max file size
        // 1. User custom limit (if logged in)
        // 2. Global setting limit
        // 3. Fallback to 100MB
        let maxSizeBytes = BigInt(100 * 1024 * 1024); // Default 100MB

        if (session) {
            // Fetch user specific limit
            const user = await prisma.user.findUnique({
                where: { id: session.id },
                select: { customMaxFileSize: true }
            });
            if (user?.customMaxFileSize) {
                maxSizeBytes = user.customMaxFileSize;
            } else if (settings?.maxFileSize) {
                maxSizeBytes = settings.maxFileSize;
            }
        } else if (settings?.maxFileSize) {
            maxSizeBytes = settings.maxFileSize;
        }

        // Check size limit (skip for admin unless they have a specific custom limit set lower? No, admin usually bypasses, but let's stick to configured limits for consistency, or allow admin bypass)
        // Let's allow admin to bypass global limit, but if they have a custom limit set, respect it (as a way to test).
        // Actually, user request said "give a user bigger limit", defaulting to "admin can config max size".
        // Let's enforce limits for everyone including admin if set, but admin usually sets the limits.
        // Standard practice: Admin bypasses global limit? Or Admin subject to global limit?
        // Let's enforce the calculated limit. If admin needs more, they can increase global or their own custom limit.

        if (BigInt(file.size) > maxSizeBytes) {
            const limitMB = Number(maxSizeBytes) / (1024 * 1024);
            return NextResponse.json({ error: `File too large (max ${limitMB.toFixed(0)}MB)` }, { status: 400 });
        }

        // Validate mime type
        const allowedTypes = ['image/', 'video/', 'image/gif'];
        const isAllowed = allowedTypes.some(type => file.type.startsWith(type));
        if (!isAllowed) {
            return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
        }

        // Validate and parse quality parameter
        let quality: CompressionQuality = 'balanced'; // Default
        if (qualityParam && VALID_QUALITIES.includes(qualityParam as CompressionQuality)) {
            quality = qualityParam as CompressionQuality;
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
        // If quality is 'none', skip transcoding entirely
        const shouldTranscode = isVideo && quality !== 'none';
        const transcodeStatus = shouldTranscode ? 'pending' : 'not_required';

        // Save to database
        const media = await prisma.media.create({
            data: {
                id,
                filename,
                originalName: file.name,
                mimeType: file.type,
                size: file.size,
                ip,
                userId: session?.id || null,
                isPrivate,
                transcodeStatus,
            },
        });

        // Start transcoding in background if it's a video and quality is not 'none'
        if (shouldTranscode) {
            startTranscodeInBackground(media.id, filename, quality);
        }

        return NextResponse.json({
            success: true,
            id: media.id,
            url: `/api/media/${media.id}`,
            transcodeStatus,
            quality: isVideo ? quality : null,
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
