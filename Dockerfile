# Build stage
FROM node:20-slim AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/
# Copy config file needed for Prisma 7
COPY prisma.config.ts ./

# Install dependencies
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
RUN npm ci

# Generate Prisma client
RUN npx prisma generate

# Compile seed script
RUN npx tsc prisma/seed.ts --module commonjs --esModuleInterop --skipLibCheck --moduleResolution node --target es2020 --outDir prisma

# Copy source files
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:20-slim AS runner

WORKDIR /app

ENV NODE_ENV=production

# Install openssl for Prisma and create user
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
RUN groupadd --system --gid 1001 nodejs
RUN useradd --system --uid 1001 nextjs -g nodejs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/src/generated ./src/generated

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma/seed.js ./prisma/seed.js
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

# Copy entrypoint script
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

# Create uploads and data directories
RUN mkdir -p uploads data prisma && chown -R nextjs:nodejs uploads data prisma src

# Install prisma CLI globally or in the local node_modules to ensure npx prisma works fast and offline
RUN npm install prisma --save-exact

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV DATABASE_URL="file:/app/data/dev.db"

ENTRYPOINT ["./docker-entrypoint.sh"]
