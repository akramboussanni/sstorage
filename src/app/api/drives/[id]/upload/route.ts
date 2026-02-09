import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { handleUpload } from '@/lib/upload-handler';

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getSession();

        const drive = await prisma.drive.findUnique({ where: { id } });
        if (!drive) {
            return NextResponse.json({ error: 'Drive not found' }, { status: 404 });
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

        const formData = await request.formData();
        const folderId = formData.get('folderId') as string | null;

        if (folderId) {
             const folder = await prisma.folder.findUnique({
                where: { id: folderId }
            });
            if (!folder || folder.driveId !== id) {
                 return NextResponse.json({ error: 'Invalid folder' }, { status: 400 });
            }
        }
        
        return handleUpload(request, { 
            userId: session?.id, 
            driveId: id, 
            folderId: folderId
        }, formData);

    } catch (error: any) {
        console.error('Drive upload error:', error);
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }
}
