<?php
/*
	helper functions to get, save or manipulate wordpress post meta
*/

class postmeta {
	
	function add_or_update_meta($post,$field,$value){
		//	if meta already exists in db for $post then update it, else create it
		//	return true or false
		return update_post_meta($post->ID, $field, $value) || add_post_meta($post->ID, $field, $value);
	}//add_or_update_meta

}// end class
