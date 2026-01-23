import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
    try {
        const session = await getSession();

        // Require authentication for my uploads
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const media = await prisma.media.findMany({
            where: { userId: session.id },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(media);
    } catch (error) {
        console.error('Failed to fetch my media:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
