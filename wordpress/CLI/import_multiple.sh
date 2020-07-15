# define WordPress path
WPPATH="/app/public/"

# loop through all of the SQL files in the current directory
for DUMP in *.sql;
do
    wp db import ${DUMP} --allow-root --path=${WPPATH}
done
