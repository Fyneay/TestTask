#!/bin/bash
set -e
export PGCLIENTENCODING="utf-8"
export $(xargs < .env)
SQL_FILE='./utils/init-db.sql'
export PGPASSWORD="$DB_PASSWORD"
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d postgres -c "CREATE DATABASE $DB_NAME WITH ENCODING='UTF8';"
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f "$SQL_FILE";
