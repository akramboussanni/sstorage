import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getSession();
        const { searchParams } = new URL(request.url);
        const folderId = searchParams.get('folderId');

        const drive = await prisma.drive.findUnique({
            where: { id },
            include: {
                owner: { select: { username: true } },
                access: {
                    include: { user: { select: { username: true } } }
                }
            }
        });

        if (!drive) {
            return NextResponse.json({ error: 'Drive not found' }, { status: 404 });
        }

        // Check access
        const hasDirectAccess = session && (
            drive.ownerId === session.id ||
            drive.access.some(a => a.userId === session.id)
        );

        if (!drive.isPublic && !hasDirectAccess) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const files = await prisma.media.findMany({
            where: {
                driveId: id,
                folderId: folderId || null,
            },
            orderBy: [
                { isPinned: 'desc' },
                { orderIndex: 'desc' },
                { createdAt: 'desc' }
            ]
        });

        return NextResponse.json(files);
    } catch (error) {
        console.error('Fetch files error:', error);
        return NextResponse.json({ error: 'Failed to fetch files' }, { status: 500 });
    }
}
