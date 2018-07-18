<?php
//Don't forward to wp-login
//ava 7.2.13

// hook failed login
add_action( 'wp_login_failed', 'my_front_end_login_fail' );  


function my_front_end_login_fail( $username ) {
   $referrer = $_SERVER['HTTP_REFERER'];  // where did the post submission come from?
   // if login=failed already set
   if(preg_match('/failed/', $referrer)){
   wp_redirect( $referrer);
      exit;	 
   }
   // if there's a valid referrer, and it's not the default log-in screen
   if ( !empty($referrer) && !strstr($referrer,'wp-login') && !strstr($referrer,'wp-admin')) {
      wp_redirect( $referrer . '?login=failed' );  // let's append some information (login=failed) to the URL for the theme to use
      exit;
   }
}
