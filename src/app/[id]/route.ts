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

    // Construct valid URL using headers to ensure correct protocol and host behind proxies
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
    const proto = request.headers.get('x-forwarded-proto') || 'http';
    const baseUrl = `${proto}://${host}`;

    // Redirect to the API endpoint that serves the raw file
    return NextResponse.redirect(`${baseUrl}/api/media/${id}`);
}
