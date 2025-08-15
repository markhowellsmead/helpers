#!/bin/bash

# This version 15th August 2025 - mark@sayhello.ch
# Assumes (requires) the use of ddev (Docker).
set -e

SSH_SERVER=""
WEBROOT="t"
DOMAIN_LIVE=""
DOMAIN_DEV=""
LOCAL_PATH=""
REMOTE_PHP="/opt/plesk/php/8.2/bin/php"

# Pull custom files & project config
rsync -azP -e ssh \
  --exclude='vendor/' \
  --exclude='node_modules/' \
  --exclude='config/app.php' \
  --exclude='storage/backups/' \
  --exclude='storage/composer-backups/' \
  --exclude='storage/config-deltas/' \
  --exclude='storage/runtime/' \
  --exclude='storage/logs/' \
  --exclude='web/cpresources/' \
  --exclude='.env' \
  --exclude='.env.example.*' \
  --exclude='composer.lock' \
  "$SSH_SERVER:$WEBROOT/" .

# Get DB credentials from local .env
cd "$LOCAL_PATH"
DB_NAME=$(grep CRAFT_DB_DATABASE .env | cut -d '=' -f2 | tr -d '\r')
DB_USER=$(grep CRAFT_DB_USER .env | cut -d '=' -f2 | tr -d '\r')
DB_PASS=$(grep CRAFT_DB_PASSWORD .env | cut -d '=' -f2 | tr -d '\r')
DB_HOST=$(grep CRAFT_DB_SERVER .env | cut -d '=' -f2 | tr -d '\r')
DB_PORT=$(grep CRAFT_DB_PORT .env | cut -d '=' -f2 | tr -d '\r')

# Remote DB backup to the storage/backups folder
ssh $SSH_SERVER -A "cd $WEBROOT && $REMOTE_PHP craft db/backup --interactive=0 --zip >/dev/null 2>&1"

# Download latest DB backup
scp $SSH_SERVER:$(ssh $SSH_SERVER "cd $WEBROOT && ls -t $WEBROOT/storage/backups/*.sql.gz | head -n1") ./db.sql.gz
echo "✅ Database backup downloaded."
gunzip -f db.sql.gz

# Restore DB locally
ddev craft db/restore db.sql --interactive=0
rm db.sql
echo "✅ Database restored."

# Run Composer install in case dependencies changed
ddev composer install --no-interaction --prefer-dist --optimize-autoloader

ddev craft migrate/all --interactive=0

# Apply project config if available
if ddev craft help | grep -q "project-config/apply"; then
  ddev craft project-config/apply --force
else
  echo "ℹ️  Skipping project-config apply – command not available."
fi

# Clear caches if available
ddev craft clear-caches/all

# Rebuild search indexes if available
echo "🎯 Sync complete. Local environment refreshed."
