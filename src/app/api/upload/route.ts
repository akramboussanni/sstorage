import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { handleUpload } from '@/lib/upload-handler';
import { CompressionQuality } from '@/lib/transcode';

const RATE_LIMIT_WINDOW = 10 * 1000; // 10 seconds
const rateLimitMap = new Map<string, number>();

export const maxDuration = 60; // Allow 60 seconds for heavy uploads (Vercel default is 30s)

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

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Get anonymous token if not logged in
        const anonToken = session ? null : request.cookies.get('sstorage_anon_token')?.value;

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

        if (!isChunked && BigInt(file.size) > maxSizeBytes) {
            const limitMB = Number(maxSizeBytes) / (1024 * 1024);
            return NextResponse.json({ error: `File too large (max ${limitMB.toFixed(0)}MB)` }, { status: 400 });
        }

        return handleUpload(request, { userId: session?.id, anonToken }, formData);

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
