export default {
    datasource: {
        url: process.env.DATABASE_URL ?? 'file:local.db',
    },
    migrations: {
        seed: process.env.NODE_ENV === 'production' ? 'node prisma/seed.js' : 'npx tsx prisma/seed.ts',
    },
};
