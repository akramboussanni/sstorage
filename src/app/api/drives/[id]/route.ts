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

        const drive = await prisma.drive.findUnique({
            where: { id },
            include: {
                owner: { select: { username: true } },
                files: {
                    orderBy: { createdAt: 'desc' }
                },
                access: {
                    include: { user: { select: { username: true, id: true } } }
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

        return NextResponse.json({
            ...drive,
            canEdit: session && (drive.ownerId === session.id || drive.access.some(a => a.userId === session.id && a.role === 'EDITOR')),
            isOwner: session && drive.ownerId === session.id,
            publicAccess: drive.isPublic ? drive.publicRole : null,
        });
    } catch (error) {
        console.error('Fetch drive error:', error);
        return NextResponse.json({ error: 'Failed to fetch drive' }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const drive = await prisma.drive.findUnique({ where: { id } });
        if (!drive) return NextResponse.json({ error: 'Drive not found' }, { status: 404 });

        if (drive.ownerId !== session.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const { name, description, isPublic, publicRole } = await request.json();

        const updatedDrive = await prisma.drive.update({
            where: { id },
            data: {
                name,
                description,
                isPublic,
                publicRole,
            }
        });

        return NextResponse.json(updatedDrive);
    } catch (error) {
        console.error('Update drive error:', error);
        return NextResponse.json({ error: 'Failed to update drive' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const drive = await prisma.drive.findUnique({ where: { id } });
        if (!drive) return NextResponse.json({ error: 'Drive not found' }, { status: 404 });

        if (drive.ownerId !== session.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        await prisma.drive.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete drive error:', error);
        return NextResponse.json({ error: 'Failed to delete drive' }, { status: 500 });
    }
}
