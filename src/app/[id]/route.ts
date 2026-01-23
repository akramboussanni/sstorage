import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Redirect /[id] to the raw file at /api/media/[id]
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    // Check if media exists
    const media = await prisma.media.findUnique({ where: { id } });

    if (!media) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Redirect to the API endpoint that serves the raw file
    return NextResponse.redirect(new URL(`/api/media/${id}`, request.url));
}
