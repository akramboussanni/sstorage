import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({ where: { id: session.id } });
        if (!user?.isAdmin) {
            return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 });
        }

        // Update all 'not_required' transcodeStatus to 'completed'
        const result = await prisma.media.updateMany({
            where: { transcodeStatus: 'not_required' },
            data: { transcodeStatus: 'completed' },
        });

        return NextResponse.json({
            success: true,
            message: `Migrated ${result.count} media records`,
            count: result.count,
        });
    } catch (error) {
        console.error('Migration error:', error);
        return NextResponse.json({ error: 'Migration failed' }, { status: 500 });
    }
}
