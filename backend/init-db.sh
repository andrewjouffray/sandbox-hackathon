#!/bin/bash

DB_NAME=$POSTGRES_DB
DB_USER=$POSTGRES_USER
DB_HOST="db"
export PGPASSWORD=$POSTGRES_PASSWORD

# Function to check if the database exists
check_db_exists() {
    psql -U $DB_USER -h $DB_HOST -d postgres -tc "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1
}

echo "Checking if database '$DB_NAME' exists..."

if check_db_exists; then
    echo "Database '$DB_NAME' already exists."
else
    echo "Database '$DB_NAME' does not exist. Creating..."
    createdb -U $DB_USER -h $DB_HOST $DB_NAME
    flask db init
    echo "Database '$DB_NAME' created successfully!"
fi

echo "Running migrations..."
flask db upgrade || echo "No new migrations found."
echo "Migrations applied."

echo "Starting Flask app..."
exec "$@"  # Run the command passed to the script