#!/bin/bash
set -e

# Create the database if it doesn't exist
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    SELECT 'CREATE DATABASE django_project_name'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'django_project_name')\gexec
    GRANT ALL PRIVILEGES ON DATABASE django_project_name TO postgres;
EOSQL