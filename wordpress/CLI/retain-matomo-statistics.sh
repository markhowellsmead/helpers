# mark@sayhello.ch 19.3.2026

# Before main import.
wp db export matomo.sql --tables=$(wp db tables --all-tables | grep '^wp_matomo' | paste -sd, -)

# Now do main import/export

# After main import. (Do not run search-replace on the Matomo tables.)
wp import matomo.sql
