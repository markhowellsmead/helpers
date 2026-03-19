#!/bin/bash
#
# Replace a live WordPress website with the local version.
# Ensure that the self-hosted Matomo statistics are retained.
# Ensure that any staging domain entries which haven't been cleaned
# are also replaced in the live website.
#
# mark@sayhello.ch 19.3.2026

DOMAIN_LIVE=""
DOMAIN_LOCAL=""
DOMAIN_STAGING=""
SERVER=""
WEBROOT=""
WPCLI_LIVE=""

wp db export - | gzip > db.sql.gz \
&& scp db.sql.gz "$SERVER:$WEBROOT/" \
&& ssh "$SERVER" -A "
	cd \"$WEBROOT\" \
	&& MATOMO_TABLES=\$($WPCLI_LIVE db tables --all-tables | grep '^wp_matomo' | paste -sd, -) \
	&& $WPCLI_LIVE db export matomo.sql --tables=\"\$MATOMO_TABLES\" \
	&& gunzip -f db.sql.gz \
	&& $WPCLI_LIVE db import db.sql \
	&& $WPCLI_LIVE search-replace '$DOMAIN_LOCAL' '$DOMAIN_LIVE' --all-tables --skip-tables=\"\$MATOMO_TABLES\" \
	&& $WPCLI_LIVE search-replace '$DOMAIN_STAGING' '$DOMAIN_LIVE' --all-tables --skip-tables=\"\$MATOMO_TABLES\" \
	&& rm -f db.sql \
	&& $WPCLI_LIVE db import matomo.sql \
	&& rm -f matomo.sql db.sql.gz
" \
&& rm -f db.sql.gz

rsync -azP -e "ssh" ./wp-content/plugins/ $SERVER:$WEBROOT/wp-content/plugins --exclude="shp-*" --exclude=".DS_Store"
rsync -azP -e "ssh" ./wp-content/themes/ $SERVER:$WEBROOT/wp-content/themes --exclude="sht-*" --exclude=".DS_Store"
rsync -azP -e "ssh" ./wp-content/languages/ $SERVER:$WEBROOT/wp-content/languages --exclude=".DS_Store"
rsync -azP -e "ssh" ./wp-content/uploads/ $SERVER:$WEBROOT/wp-content/uploads --exclude="*.wpress" --exclude=".DS_Store"


