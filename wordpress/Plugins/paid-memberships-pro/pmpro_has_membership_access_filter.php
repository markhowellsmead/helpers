<?php

// Custom logic for allowing free access to older posts
// in addition to the standard access rules
// mark@sayhello.ch 15.5.2019

add_filter('pmpro_has_membership_access_filter', [$this, 'maybeAllowAccess'], 10, 2);

…

public function maybeAllowAccess($hasaccess, $post)
{
	if ((function_exists('pmpro_hasMembershipLevel') && pmpro_hasMembershipLevel()) || $post->post_type !== self::POST_TYPE) {
		return $hasaccess;
	}

	// Disallow by default
	$hasaccess = false;

	// Allow older posts
	if (strtotime($post->post_date) < $this->freeContentCutoff()) {
		$hasaccess = true;
	}

	return $hasaccess;
}
  
private function freeContentCutoff(){
	return strtotime('1 year ago');
}
