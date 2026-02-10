import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession, getAnonToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const session = await getSession();
        let where: any = {};

        if (session) {
            where = { userId: session.id };
        } else {
            // Get token from cookies
            const anonToken = request.cookies.get('sstorage_anon_token')?.value;
            if (!anonToken) {
                return NextResponse.json([]);
            }
            where = { userId: null, anonToken };
        }

        const media = await prisma.media.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(media);
    } catch (error) {
        console.error('Failed to fetch my media:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
