<?php
//	mhm 13.11.2012
//	demo bis jetzt

add_action( 'post_submitbox_misc_actions', 'wordpress_additional_publish_options' );
add_action( 'post_submitbox_start', 'wordpress_additional_publish_options' );

function wordpress_additional_publish_options(){
    print '<pre>' . current_filter() . '</pre>';
}