@echo off
:: Меняет кодировку в консоли
chcp 65001 > nul
:: Ставит кодировку клиенту (без нее кириллица не отображается + ошибки в cmd)
set PGCLIENTENCODING=utf-8
for /f "tokens=*" %%i in (.env) do set %%i
set SQL_FILE=./utils/init-db.sql
set PGPASSWORD=%DB_PASSWORD%
psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -d postgres -c "CREATE DATABASE %DB_NAME% WITH ENCODING='UTF8'"
psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -d %DB_NAME% -f %SQL_FILE%