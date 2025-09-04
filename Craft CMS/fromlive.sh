#!/bin/bash
# This version 15th August 2025 - mark@sayhello.ch
# Assumes (requires) the use of ddev (Docker).
# Add the config constants to the .env file

set -e

# Load environment variables from .env
SSH_SERVER=$(grep SH_SSH_SERVER .env | cut -d '=' -f2 | tr -d '\r')
WEBROOT=$(grep SH_WEBROOT .env | cut -d '=' -f2 | tr -d '\r')
DOMAIN_LIVE=$(grep SH_DOMAIN_LIVE .env | cut -d '=' -f2 | tr -d '\r')
DOMAIN_DEV=$(grep SH_DOMAIN_DEV .env | cut -d '=' -f2 | tr -d '\r')
REMOTE_PHP=$(grep SH_REMOTE_PHP .env | cut -d '=' -f2 | tr -d '\r')

# Pull custom files & project config
rsync -azP -e ssh \
  --exclude='vendor/' \
  --exclude='node_modules/' \
  --exclude='config/app.php' \
  --exclude='storage/backups/' \
  --exclude='storage/composer-backups/' \
  --exclude='storage/config-deltas/' \
  --exclude='storage/runtime/' \
  --exclude='web/cpresources/' \
  --exclude='.env' \
  --exclude='.env*' \
  "$SSH_SERVER:$WEBROOT/" .

# Get DB credentials from local .env
DB_NAME=$(grep CRAFT_DB_DATABASE .env | cut -d '=' -f2 | tr -d '\r')
DB_USER=$(grep CRAFT_DB_USER .env | cut -d '=' -f2 | tr -d '\r')
DB_PASS=$(grep CRAFT_DB_PASSWORD .env | cut -d '=' -f2 | tr -d '\r')
DB_HOST=$(grep CRAFT_DB_SERVER .env | cut -d '=' -f2 | tr -d '\r')
DB_PORT=$(grep CRAFT_DB_PORT .env | cut -d '=' -f2 | tr -d '\r')

# Remote DB backup
ssh "$SSH_SERVER" -A "cd $WEBROOT && $REMOTE_PHP craft db/backup --interactive=0 --zip >/dev/null 2>&1"

# Find latest remote DB backup
REMOTE_BACKUP=$(ssh "$SSH_SERVER" "cd $WEBROOT && ls -t storage/backups/*.sql.zip 2>/dev/null | head -n1")
if [ -z "$REMOTE_BACKUP" ]; then
  echo "❌ No database backup found in $WEBROOT/storage/backups/"
  exit 1
fi

# Download latest DB backup
scp "$SSH_SERVER:$WEBROOT/$REMOTE_BACKUP" ./db.sql.zip
echo "✅ Database backup downloaded."
unzip -p db.sql.zip > db.sql
rm db.sql.zip

# Restore DB locally
ddev craft db/restore db.sql --interactive=0
rm db.sql
echo "✅ Database restored."

# Install Composer deps if changed
ddev composer install --no-interaction --prefer-dist --optimize-autoloader

# Migrate DB
ddev craft migrate/all --interactive=0

# Apply project config
ddev craft project-config/apply --force

# Clear caches
ddev craft clear-caches/all

echo "🎯 Sync complete. Local environment refreshed."
