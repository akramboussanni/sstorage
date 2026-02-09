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

        const folders = await prisma.folder.findMany({
            where: {
                driveId: id,
                parentId: folderId || null,
            },
            orderBy: [
                { isPinned: 'desc' },
                { orderIndex: 'desc' },
                { createdAt: 'desc' }
            ]
        });

        return NextResponse.json(folders);
    } catch (error) {
        console.error('Fetch folders error:', error);
        return NextResponse.json({ error: 'Failed to fetch folders' }, { status: 500 });
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const drive = await prisma.drive.findUnique({ where: { id } });
        if (!drive) return NextResponse.json({ error: 'Drive not found' }, { status: 404 });

        // Check if user can edit
        const canEdit = drive.ownerId === session.id || 
            (await prisma.driveAccess.findUnique({
                where: {
                    driveId_userId: {
                        driveId: id,
                        userId: session.id
                    }
                }
            }))?.role === 'EDITOR';

        if (!canEdit) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const { name, parentId } = await request.json();

        if (!name || !name.trim()) {
            return NextResponse.json({ error: 'Folder name is required' }, { status: 400 });
        }

        const folder = await prisma.folder.create({
            data: {
                name: name.trim(),
                driveId: id,
                parentId: parentId || null,
                userId: session.id,
                color: "hsl(210, 100%, 50%)",
                isPinned: false,
                orderIndex: 0,
            }
        });

        return NextResponse.json(folder);
    } catch (error) {
        console.error('Create folder error:', error);
        return NextResponse.json({ error: 'Failed to create folder' }, { status: 500 });
    }
}
