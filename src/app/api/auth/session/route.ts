import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET() {
    const session = await getSession();

    if (!session) {
        return NextResponse.json({ user: null });
    }

    // Fetch fresh user data from database to get mustChangePassword status
    const user = await prisma.user.findUnique({
        where: { id: session.id },
        select: {
            id: true,
            username: true,
            isAdmin: true,
            mustChangePassword: true,
        },
    });

    if (!user) {
        return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user });
}
