import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; folderId: string }> }
) {
    try {
        const { id, folderId } = await params;
        const session = await getSession();

        const drive = await prisma.drive.findUnique({ where: { id } });
        if (!drive) {
            return NextResponse.json({ error: 'Drive not found' }, { status: 404 });
        }

        // Check access
        const hasDirectAccess = session && (
            drive.ownerId === session.id ||
            (await prisma.driveAccess.findUnique({
                where: {
                    driveId_userId: {
                        driveId: id,
                        userId: session.id
                    }
                }
            }))
        );

        if (!drive.isPublic && !hasDirectAccess) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const folder = await prisma.folder.findUnique({
            where: { id: folderId }
        });

        if (!folder || folder.driveId !== id) {
            return NextResponse.json({ error: 'Folder not found' }, { status: 404 });
        }

        return NextResponse.json(folder);
    } catch (error) {
        console.error('Fetch folder error:', error);
        return NextResponse.json({ error: 'Failed to fetch folder' }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; folderId: string }> }
) {
    try {
        const { id, folderId } = await params;
        const session = await getSession();

        const drive = await prisma.drive.findUnique({ where: { id } });
        if (!drive) return NextResponse.json({ error: 'Drive not found' }, { status: 404 });

        // Check if user can edit
        const canEdit = (session && drive.ownerId === session.id) || 
            (session && (await prisma.driveAccess.findUnique({
                where: {
                    driveId_userId: {
                        driveId: id,
                        userId: session.id
                    }
                }
            }))?.role === 'EDITOR') ||
            (drive.isPublic && drive.publicRole === 'EDITOR');

        if (!canEdit) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const folder = await prisma.folder.findUnique({
            where: { id: folderId }
        });

        if (!folder || folder.driveId !== id) {
            return NextResponse.json({ error: 'Folder not found' }, { status: 404 });
        }

        const { name } = await request.json();

        if (!name || !name.trim()) {
            return NextResponse.json({ error: 'Folder name is required' }, { status: 400 });
        }

        const updatedFolder = await prisma.folder.update({
            where: { id: folderId },
            data: { name: name.trim() }
        });

        return NextResponse.json(updatedFolder);
    } catch (error) {
        console.error('Update folder error:', error);
        return NextResponse.json({ error: 'Failed to update folder' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; folderId: string }> }
) {
    try {
        const { id, folderId } = await params;
        const session = await getSession();

        const drive = await prisma.drive.findUnique({ where: { id } });
        if (!drive) return NextResponse.json({ error: 'Drive not found' }, { status: 404 });

        const folder = await prisma.folder.findUnique({
            where: { id: folderId },
            include: { drive: true }
        });

        if (!folder || folder.driveId !== id) {
            return NextResponse.json({ error: 'Folder not found' }, { status: 404 });
        }

        // Check if user can edit
        const canEdit = (session && drive.ownerId === session.id) || 
            (session && (await prisma.driveAccess.findUnique({
                where: {
                    driveId_userId: {
                        driveId: id,
                        userId: session.id
                    }
                }
            }))?.role === 'EDITOR') ||
            (drive.isPublic && drive.publicRole === 'EDITOR');

        if (!canEdit) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        await prisma.folder.delete({ where: { id: folderId } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete folder error:', error);
        return NextResponse.json({ error: 'Failed to delete folder' }, { status: 500 });
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; folderId: string }> }
) {
    try {
        const { id, folderId } = await params;
        const session = await getSession();

        const drive = await prisma.drive.findUnique({ where: { id } });
        if (!drive) return NextResponse.json({ error: 'Drive not found' }, { status: 404 });

        const folder = await prisma.folder.findUnique({ where: { id: folderId } });
        if (!folder || folder.driveId !== id) {
            return NextResponse.json({ error: 'Folder not found' }, { status: 404 });
        }

        // Check if user can edit
        const canEdit = (session && drive.ownerId === session.id) || 
            (session && (await prisma.driveAccess.findUnique({
                where: {
                    driveId_userId: {
                        driveId: id,
                        userId: session.id
                    }
                }
            }))?.role === 'EDITOR') ||
            (drive.isPublic && drive.publicRole === 'EDITOR');

        if (!canEdit) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const { action, targetFolderId, parentId, color, isPinned, orderIndex, name } = await request.json();

        if (action === 'move') {
            const updatedFolder = await prisma.folder.update({
                where: { id: folderId },
                data: { parentId: targetFolderId || null }
            });
            return NextResponse.json(updatedFolder);
        } else if (action === 'copy') {
            // For copy, create a new folder with the same name
            const copiedFolder = await prisma.folder.create({
                data: {
                    name: folder.name + ' (copy)',
                    driveId: folder.driveId,
                    parentId: targetFolderId || null,
                    userId: session?.id || drive.ownerId
                }
            });
            return NextResponse.json(copiedFolder);
        } else {
            // Handle direct property updates (color, isPinned, orderIndex, name, parentId)
            const updateData: any = {};
            if (color !== undefined) updateData.color = color;
            if (isPinned !== undefined) updateData.isPinned = isPinned;
            if (orderIndex !== undefined) updateData.orderIndex = orderIndex;
            if (name !== undefined && name.trim()) updateData.name = name.trim();
            if (parentId !== undefined) updateData.parentId = parentId || null;

            if (Object.keys(updateData).length === 0) {
                return NextResponse.json({ error: 'No updates provided' }, { status: 400 });
            }

            const updatedFolder = await prisma.folder.update({
                where: { id: folderId },
                data: updateData
            });
            return NextResponse.json(updatedFolder);
        }
    } catch (error) {
        console.error('PATCH folder error:', error);
        return NextResponse.json({ error: 'Failed to process folder' }, { status: 500 });
    }
}

