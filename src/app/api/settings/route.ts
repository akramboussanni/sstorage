import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
    try {
        let settings = await prisma.settings.findUnique({ where: { id: 'default' } });

        if (!settings) {
            settings = await prisma.settings.create({
                data: {
                    id: 'default',
                    allowPublicUpload: false,
                    allowRegistration: false,
                    defaultCompression: 'balanced',
                    showNoCompression: true,
                    showPrivateOption: true,
                },
            });
        }

        // Don't expose SMTP password to client
        const { smtpPassword, ...safeSettings } = settings;

        return NextResponse.json({
            ...safeSettings,
            smtpConfigured: !!smtpPassword,
        });
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

        // Build update object with only provided fields
        const updateData: Record<string, unknown> = {};

        if (typeof body.allowPublicUpload === 'boolean') {
            updateData.allowPublicUpload = body.allowPublicUpload;
        }

        if (typeof body.allowRegistration === 'boolean') {
            updateData.allowRegistration = body.allowRegistration;
        }

        if (typeof body.defaultCompression === 'string') {
            updateData.defaultCompression = body.defaultCompression;
        }

        if (typeof body.showNoCompression === 'boolean') {
            updateData.showNoCompression = body.showNoCompression;
        }

        if (typeof body.showPrivateOption === 'boolean') {
            updateData.showPrivateOption = body.showPrivateOption;
        }

        // SMTP settings
        if (body.smtpHost !== undefined) {
            updateData.smtpHost = body.smtpHost || null;
        }

        if (body.smtpPort !== undefined) {
            updateData.smtpPort = body.smtpPort ? parseInt(body.smtpPort, 10) : null;
        }

        if (body.smtpUser !== undefined) {
            updateData.smtpUser = body.smtpUser || null;
        }

        if (body.smtpPassword !== undefined) {
            updateData.smtpPassword = body.smtpPassword || null;
        }

        if (body.smtpFrom !== undefined) {
            updateData.smtpFrom = body.smtpFrom || null;
        }

        const settings = await prisma.settings.upsert({
            where: { id: 'default' },
            update: updateData,
            create: {
                id: 'default',
                allowPublicUpload: body.allowPublicUpload ?? false,
                allowRegistration: body.allowRegistration ?? false,
                defaultCompression: body.defaultCompression ?? 'balanced',
                showNoCompression: body.showNoCompression ?? true,
                showPrivateOption: body.showPrivateOption ?? true,
                smtpHost: body.smtpHost || null,
                smtpPort: body.smtpPort ? parseInt(body.smtpPort, 10) : null,
                smtpUser: body.smtpUser || null,
                smtpPassword: body.smtpPassword || null,
                smtpFrom: body.smtpFrom || null,
            },
        });

        // Don't expose SMTP password in response
        const { smtpPassword, ...safeSettings } = settings;

        return NextResponse.json({
            ...safeSettings,
            smtpConfigured: !!smtpPassword,
        });
    } catch (error) {
        console.error('Settings error:', error);
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
