<?php

add_action( 'wp', function() {
    if(is_page()){ // your check - if this doesn't match, then the process continues
        status_header( 404 );
        nocache_headers();
        include( get_query_template( '404' ) );
        die();
    }
});
