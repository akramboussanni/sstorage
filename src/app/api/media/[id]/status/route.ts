import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

type Props = {
    params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: Props) {
    try {
        const { id } = await params;

        const media = await prisma.media.findUnique({
            where: { id },
            select: {
                id: true,
                transcodeStatus: true,
                transcodeError: true,
            },
        });

        if (!media) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        return NextResponse.json(media);
    } catch (error) {
        console.error('Status check error:', error);
        return NextResponse.json({ error: 'Failed to check status' }, { status: 500 });
    }
}
