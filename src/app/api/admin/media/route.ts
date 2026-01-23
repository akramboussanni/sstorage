import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
    const session = await getSession();

    if (!session || !session.isAdmin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Exclude private uploads from other users
        const media = await prisma.media.findMany({
            where: {
                OR: [
                    { isPrivate: false },
                    { userId: session.id }, // Admin can see their own private uploads
                ],
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(media);
    } catch (error) {
        console.error('Failed to fetch media:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
