#!/bin/sh
set -e

# Always ensure database directory exists
mkdir -p /app/data
mkdir -p /app/prisma

echo "Starting deployment..."
echo "Database URL: $DATABASE_URL"

# We always want to push the schema to ensure the DB is up to date.
# Prisma db push is safe for dev/sqlite updates.
# Using --accept-data-loss is risky in prod but necessary if schema changes are destructive in dev.
# Since this is "sstorage" (likely personal/dev), we prioritize it working.
echo "Pushing database schema..."
npx prisma db push

echo "Running database seed..."
node /app/seed.js

echo "Database initialized."

# Start the application
exec node server.js
