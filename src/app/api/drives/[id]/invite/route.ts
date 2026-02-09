import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
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

        const { username, role } = await request.json();

        if (!username) {
            return NextResponse.json({ error: 'Username is required' }, { status: 400 });
        }

        const userToInvite = await prisma.user.findUnique({ where: { username } });
        if (!userToInvite) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        if (userToInvite.id === session.id) {
            return NextResponse.json({ error: 'You cannot invite yourself' }, { status: 400 });
        }

        const access = await prisma.driveAccess.upsert({
            where: {
                driveId_userId: {
                    driveId: id,
                    userId: userToInvite.id,
                }
            },
            update: { role: role || 'VIEWER' },
            create: {
                driveId: id,
                userId: userToInvite.id,
                role: role || 'VIEWER',
            }
        });

        return NextResponse.json(access);
    } catch (error) {
        console.error('Invite error:', error);
        return NextResponse.json({ error: 'Failed to invite user' }, { status: 500 });
    }
}
