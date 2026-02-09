import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

const UPLOAD_DIR = join(process.cwd(), 'uploads');

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const media = await prisma.media.findUnique({ where: { id } });

        if (!media) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        const filepath = join(UPLOAD_DIR, media.filename);
        const stat = await import('fs/promises').then(fs => fs.stat(filepath));
        const fileSize = stat.size;
        const range = request.headers.get('range');

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunksize = (end - start) + 1;
            const { createReadStream } = await import('fs');
            const { Readable } = await import('stream');

            const file = createReadStream(filepath, { start, end });
            // @ts-ignore
            const stream = Readable.toWeb(file);

            return new NextResponse(stream as any, {
                status: 206,
                headers: {
                    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunksize.toString(),
                    'Content-Type': media.mimeType,
                    'Content-Disposition': `inline; filename="${media.originalName}"`,
                    'Cache-Control': 'public, max-age=31536000',
                },
            });
        } else {
            const { createReadStream } = await import('fs');
            const { Readable } = await import('stream');
            const file = createReadStream(filepath);
            // @ts-ignore
            const stream = Readable.toWeb(file);

            return new NextResponse(stream as any, {
                headers: {
                    'Content-Length': fileSize.toString(),
                    'Content-Type': media.mimeType,
                    'Content-Disposition': `inline; filename="${media.originalName}"`,
                    'Cache-Control': 'public, max-age=31536000',
                    'Accept-Ranges': 'bytes',
                },
            });
        }
    } catch (error) {
        console.error('File serve error:', error);
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getSession();

        const media = await prisma.media.findUnique({ where: { id } });

        if (!media) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        // Check ownership by userId
        const isOwner = session && media.userId === session.id;

        let canDelete = isOwner;

        // If not owner/admin, check if it's in a drive where the user has editor access
        if (!canDelete && session && media.driveId) {
            const driveAccess = await prisma.driveAccess.findUnique({
                where: {
                    driveId_userId: {
                        driveId: media.driveId,
                        userId: session.id
                    }
                }
            });
            if (driveAccess?.role === 'EDITOR') {
                canDelete = true;
            } else {
                // Also check if user is the drive owner
                const drive = await prisma.drive.findUnique({ where: { id: media.driveId } });
                if (drive?.ownerId === session.id) {
                    canDelete = true;
                }
            }
        }

        if (!canDelete) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Delete from database
        await prisma.media.delete({ where: { id } });

        // Delete from disk
        const filepath = join(UPLOAD_DIR, media.filename);
        const { unlink } = await import('fs/promises');
        try {
            await unlink(filepath);
        } catch (err) {
            console.error('Failed to delete file from disk', err);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
