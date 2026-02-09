import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/db';
import { createSession, setSessionCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
        }

        // Check if registration is enabled
        const settings = await prisma.settings.findUnique({ where: { id: 'default' } });
        if (!settings?.allowRegistration) {
            return NextResponse.json({ error: 'Registration is disabled' }, { status: 403 });
        }

        // Validate username
        if (username.length < 3 || username.length > 20) {
            return NextResponse.json({ error: 'Username must be 3-20 characters' }, { status: 400 });
        }

        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            return NextResponse.json({ error: 'Username can only contain letters, numbers, and underscores' }, { status: 400 });
        }

        // Validate password
        if (password.length < 6) {
            return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
        }

        // Check if username already exists
        const existingUser = await prisma.user.findUnique({ where: { username } });
        if (existingUser) {
            return NextResponse.json({ error: 'Username already taken' }, { status: 409 });
        }

        // Create user
        const hashedPassword = await hash(password, 12);
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                mustChangePassword: false,
            },
        });

        // Auto-login after registration
        const token = await createSession({
            id: user.id,
            username: user.username,
        });

        await setSessionCookie(token);

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                username: user.username,
            },
        });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
    }
}
