import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const drives = await prisma.drive.findMany({
            where: {
                OR: [
                    { ownerId: session.id },
                    { access: { some: { userId: session.id } } }
                ]
            },
            include: {
                owner: { select: { username: true } },
                _count: { select: { files: true } }
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(drives);
    } catch (error) {
        console.error('Fetch drives error:', error);
        return NextResponse.json({ error: 'Failed to fetch drives' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { name, description, isPublic, publicRole } = await request.json();

        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        const drive = await prisma.drive.create({
            data: {
                name,
                description,
                isPublic: !!isPublic,
                publicRole: publicRole || 'VIEWER',
                ownerId: session.id,
            }
        });

        return NextResponse.json(drive);
    } catch (error) {
        console.error('Create drive error:', error);
        return NextResponse.json({ error: 'Failed to create drive' }, { status: 500 });
    }
}
