import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import bcrypt from 'bcryptjs';

// Get all users (admin only)
export async function GET() {
    try {
        const session = await getSession();

        if (!session?.isAdmin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                isAdmin: true,
                createdAt: true,
                customMaxFileSize: true,
                _count: {
                    select: { media: true }
                }
            },
            orderBy: { createdAt: 'desc' },
        });

        // Serialize BigInt to string
        const serializedUsers = users.map(user => ({
            ...user,
            customMaxFileSize: user.customMaxFileSize ? user.customMaxFileSize.toString() : null,
        }));

        return NextResponse.json(serializedUsers);
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// Create new user (admin only)
export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session?.isAdmin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { username, password, customMaxFileSize } = body;

        if (!username || !password) {
            return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
        }

        // Check if username exists
        const existing = await prisma.user.findUnique({ where: { username } });
        if (existing) {
            return NextResponse.json({ error: 'Username already taken' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                mustChangePassword: true, // Force change on first login
                customMaxFileSize: customMaxFileSize ? BigInt(customMaxFileSize) : null,
            },
        });

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                username: user.username,
                isAdmin: user.isAdmin,
                customMaxFileSize: user.customMaxFileSize?.toString(),
            }
        });
    } catch (error) {
        console.error('Failed to create user:', error);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}

// Update user (admin only)
export async function PUT(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session?.isAdmin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { id, customMaxFileSize } = body;

        if (!id) {
            return NextResponse.json({ error: 'User ID required' }, { status: 400 });
        }

        const user = await prisma.user.update({
            where: { id },
            data: {
                customMaxFileSize: customMaxFileSize ? BigInt(customMaxFileSize) : null,
            },
        });

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                customMaxFileSize: user.customMaxFileSize?.toString(),
            }
        });

    } catch (error) {
        console.error('Failed to update user:', error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}

// Delete user (admin only)
export async function DELETE(request: NextRequest) {
    try {
        const session = await getSession();

        if (!session?.isAdmin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('id');

        if (!userId) {
            return NextResponse.json({ error: 'User ID required' }, { status: 400 });
        }

        // Prevent deleting yourself
        if (userId === session.id) {
            return NextResponse.json({ error: 'Cannot delete yourself' }, { status: 400 });
        }

        // Check if user exists
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Delete user (media will remain but userId will be null due to optional relation)
        await prisma.user.delete({ where: { id: userId } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
