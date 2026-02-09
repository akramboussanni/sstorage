import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; userId: string }> }
) {
    try {
        const { id, userId } = await params;
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const drive = await prisma.drive.findUnique({ where: { id } });
        if (!drive) return NextResponse.json({ error: 'Drive not found' }, { status: 404 });

        if (drive.ownerId !== session.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // Don't allow removing the owner
        if (drive.ownerId === userId) {
            return NextResponse.json({ error: 'Cannot remove owner access' }, { status: 400 });
        }

        await prisma.driveAccess.deleteMany({
            where: {
                driveId: id,
                userId: userId,
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Remove access error:', error);
        return NextResponse.json({ error: 'Failed to remove access' }, { status: 500 });
    }
}
