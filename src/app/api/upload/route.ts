import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, readFile, rm } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { startTranscodeInBackground, CompressionQuality } from '@/lib/transcode';
import { existsSync } from 'fs';

const UPLOAD_DIR = join(process.cwd(), 'uploads');
const TEMP_DIR = join(UPLOAD_DIR, 'temp');

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

        const url = request.nextUrl;
        const chunkIndexStr = url.searchParams.get('chunkIndex');
        const totalChunksStr = url.searchParams.get('totalChunks');
        const uploadId = url.searchParams.get('uploadId');

        const isChunked = chunkIndexStr !== null && totalChunksStr !== null && uploadId !== null;
        const chunkIndex = isChunked ? parseInt(chunkIndexStr) : 0;
        const totalChunks = isChunked ? parseInt(totalChunksStr) : 1;

        // Use User ID for logged-in users, IP for guests
        const rateLimitKey = session ? `user:${session.id}` : `ip:${ip}`;
        const now = Date.now();
        const lastUpload = rateLimitMap.get(rateLimitKey);

        // If it's a chunked upload, only rate limit the first chunk
        const shouldRateLimit = !isChunked || chunkIndex === 0;

        if (shouldRateLimit && lastUpload && now - lastUpload < RATE_LIMIT_WINDOW) {
            return NextResponse.json({ error: 'Rate limit exceeded. Try again in a few seconds.' }, { status: 429 });
        }

        if (shouldRateLimit) {
            rateLimitMap.set(rateLimitKey, now);
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;
        const qualityParam = formData.get('quality') as string | null;
        const driveId = formData.get('driveId') as string | null;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Determine max file size
        // 1. User custom limit (if logged in)
        // 2. Global setting limit
        // 3. Fallback to 1GB
        let maxSizeBytes = BigInt(1024 * 1024 * 1024); // Default 1GB

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
        // Let's enforce the calculated limit. If admin needs more, they can increase global or their own custom limit.
        // For chunked uploads, we check the chunk size, but ideally we should check total size if known.
        // Currently assumes file.size is the chunk size or total size depending on context. 
        // We'll skip total size check for chunks for now or assume client behaves.

        if (!isChunked && BigInt(file.size) > maxSizeBytes) {
            const limitMB = Number(maxSizeBytes) / (1024 * 1024);
            return NextResponse.json({ error: `File too large (max ${limitMB.toFixed(0)}MB)` }, { status: 400 });
        }

        // All file types allowed
        const isAllowed = true;

        // Validate and parse quality parameter
        let quality: CompressionQuality = 'balanced'; // Default
        if (qualityParam && VALID_QUALITIES.includes(qualityParam as CompressionQuality)) {
            quality = qualityParam as CompressionQuality;
        }

        // Create upload directory if not exists
        await mkdir(UPLOAD_DIR, { recursive: true });

        // Generate unique filename
        const ext = file.name.split('.').pop();
        const id = isChunked ? uploadId! : uuidv4();
        const filename = `${id}.${ext}`;
        const filepath = join(UPLOAD_DIR, filename);

        let finalBuffer: Buffer;

        if (isChunked) {
            const chunkDir = join(TEMP_DIR, id);
            await mkdir(chunkDir, { recursive: true });

            const bytes = await file.arrayBuffer();
            await writeFile(join(chunkDir, `chunk-${chunkIndex}`), Buffer.from(bytes));

            if (chunkIndex < totalChunks - 1) {
                return NextResponse.json({ success: true, chunkIndex });
            }

            // Merge chunks
            const chunks: Buffer[] = [];
            for (let i = 0; i < totalChunks; i++) {
                const chunkPath = join(chunkDir, `chunk-${i}`);
                if (existsSync(chunkPath)) {
                    chunks.push(await readFile(chunkPath));
                } else {
                    throw new Error(`Missing chunk ${i}`);
                }
            }
            finalBuffer = Buffer.concat(chunks);

            // Cleanup
            await rm(chunkDir, { recursive: true, force: true });
        } else {
            const bytes = await file.arrayBuffer();
            finalBuffer = Buffer.from(bytes);
        }

        // Save file
        await writeFile(filepath, finalBuffer);

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
                size: finalBuffer.length,
                ip,
                userId: session?.id || null,
                transcodeStatus,
                driveId: driveId || null,
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
