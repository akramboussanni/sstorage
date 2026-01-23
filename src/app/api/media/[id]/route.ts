import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { prisma } from '@/lib/db';

const UPLOAD_DIR = join(process.cwd(), 'uploads');

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const media = await prisma.media.findUnique({ where: { id } });

        if (!media) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        const filepath = join(UPLOAD_DIR, media.filename);
        const file = await readFile(filepath);

        return new NextResponse(file, {
            headers: {
                'Content-Type': media.mimeType,
                'Content-Disposition': `inline; filename="${media.originalName}"`,
                'Cache-Control': 'public, max-age=31536000',
            },
        });
    } catch (error) {
        console.error('File serve error:', error);
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
}
