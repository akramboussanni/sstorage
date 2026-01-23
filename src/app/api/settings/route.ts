import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
    try {
        let settings = await prisma.settings.findUnique({ where: { id: 'default' } });

        if (!settings) {
            settings = await prisma.settings.create({
                data: { id: 'default', allowPublicUpload: false },
            });
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error('Settings error:', error);
        return NextResponse.json({ error: 'Failed to get settings' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const session = await getSession();

        if (!session?.isAdmin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        const settings = await prisma.settings.upsert({
            where: { id: 'default' },
            update: { allowPublicUpload: body.allowPublicUpload },
            create: { id: 'default', allowPublicUpload: body.allowPublicUpload },
        });

        return NextResponse.json(settings);
    } catch (error) {
        console.error('Settings error:', error);
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
