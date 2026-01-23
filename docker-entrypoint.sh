#!/bin/sh
set -e

# Check if database exists and has tables
DB_PATH="/app/data/dev.db"

# Create data directory if it doesn't exist
mkdir -p /app/data

# Initialize database if it doesn't exist
if [ ! -f "$DB_PATH" ]; then
    echo "Initializing database..."
    npx prisma db push --skip-generate
    echo "Running database seed..."
    node /app/seed.js
    echo "Database initialized successfully!"
else
    echo "Database already exists, skipping initialization."
fi

# Start the application
exec node server.js
