<?php
// welcome email bei neuer Benutzer WPMU nie verschicken
// mhm/ava 25.1.2013
function block_user_notification($user_id=0,$plaintext_pass='',$meta=null){
	return false;
}
add_filter('wpmu_welcome_user_notification', 'block_user_notification');
add_filter('wpmu_welcome_notification', 'block_user_notification');