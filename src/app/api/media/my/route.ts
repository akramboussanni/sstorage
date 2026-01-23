import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';

    try {
        const media = await prisma.media.findMany({
            where: { ip },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(media);
    } catch (error) {
        console.error('Failed to fetch my media:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
