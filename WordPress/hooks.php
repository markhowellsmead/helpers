<?php

//	run this function when a post is published (not when it is only saved)
//	16.2.2013
function email_friends($post_ID){
   $friends = 'bob@example.org, susie@example.org';
   wp_mail( $friends, "sally's blog updated", 'I just put something on my blog: http://blog.example.com' );
   return $post_ID;
}
add_action( 'publish_post', 'email_friends');