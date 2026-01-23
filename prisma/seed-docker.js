const { PrismaClient } = require('./src/generated/prisma');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('Starting Docker seed...');

    // Create admin user
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    const hashedPassword = await hash(password, 12);

    const admin = await prisma.user.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            password: hashedPassword,
            isAdmin: true,
        },
    });

    console.log('Created admin user:', admin.username);

    // Create default settings
    await prisma.settings.upsert({
        where: { id: 'default' },
        update: {},
        create: {
            id: 'default',
            allowPublicUpload: false,
        },
    });

    console.log('Created default settings');
}

main()
    .catch((e) => {
        console.error('Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
