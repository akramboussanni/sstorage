import 'dotenv/config';
import { hash } from 'bcryptjs';
import { PrismaClient } from '../src/generated/prisma';
import { PrismaLibSql } from '@prisma/adapter-libsql';

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
}

const adapter = new PrismaLibSql({
    url: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
    // Create admin user
    const hashedPassword = await hash('admin123', 12);

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
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
