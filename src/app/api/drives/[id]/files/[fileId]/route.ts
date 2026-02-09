import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; fileId: string }> }
) {
    try {
        const { id, fileId } = await params;
        const session = await getSession();

        const drive = await prisma.drive.findUnique({ where: { id } });
        if (!drive) return NextResponse.json({ error: 'Drive not found' }, { status: 404 });

        const file = await prisma.media.findUnique({
            where: { id: fileId },
            include: { drive: true }
        });

        if (!file || file.driveId !== id) {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
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

        // Delete from database
        await prisma.media.delete({ where: { id: fileId } });

        // Delete from disk
        const { join } = await import('path');
        const { unlink } = await import('fs/promises');
        const UPLOAD_DIR = join(process.cwd(), 'uploads');
        const filepath = join(UPLOAD_DIR, file.filename);
        try {
            await unlink(filepath);
        } catch (err) {
            console.error('Failed to delete file from disk', err);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete file error:', error);
        return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; fileId: string }> }
) {
    try {
        const { id, fileId } = await params;
        const session = await getSession();

        const drive = await prisma.drive.findUnique({ where: { id } });
        if (!drive) return NextResponse.json({ error: 'Drive not found' }, { status: 404 });

        const file = await prisma.media.findUnique({ where: { id: fileId } });
        if (!file || file.driveId !== id) {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
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

        const body = await request.json();
        const { action, targetFolderId, folderId, isPinned, orderIndex } = body;

        // Handle direct field updates (isPinned, orderIndex, folderId)
        if (isPinned !== undefined || orderIndex !== undefined || folderId !== undefined) {
            const updateData: any = {};
            if (isPinned !== undefined) updateData.isPinned = isPinned;
            if (orderIndex !== undefined) updateData.orderIndex = orderIndex;
            if (folderId !== undefined) updateData.folderId = folderId || null;

            const updatedFile = await prisma.media.update({
                where: { id: fileId },
                data: updateData
            });
            return NextResponse.json(updatedFile);
        }

        // Handle legacy action-based updates
        if (action === 'move') {
            const updatedFile = await prisma.media.update({
                where: { id: fileId },
                data: { folderId: targetFolderId || null }
            });
            return NextResponse.json(updatedFile);
        } else if (action === 'copy') {
            // For copy, create a new file entry with the same data
            const copiedFile = await prisma.media.create({
                data: {
                    originalName: file.originalName,
                    filename: file.filename,
                    mimeType: file.mimeType,
                    size: file.size,
                    driveId: file.driveId,
                    folderId: targetFolderId || null
                }
            });
            return NextResponse.json(copiedFile);
        } else {
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }
    } catch (error) {
        console.error('PATCH file error:', error);
        return NextResponse.json({ error: 'Failed to process file' }, { status: 500 });
    }
}
