<?php
/*
	database functions for wordpress
*/

class wordpress_db {

	function is_tree($pid){
		// is the current page a subpage of page id $pid?
		// mhm 2010
		$anc = get_post_ancestors($GLOBALS['post']->ID);
		foreach($anc as $ancestor):
			if(is_page() && $ancestor == $pid):
				return true;
			endif;
		endforeach;
		if(is_page()&&(is_page($pid))):
			return true;   // we're at the page or at a sub page
		else:
			return false;  // we're elsewhere
		endif;
	}


	function get_tag_id($tag_name) {
		$taxarray = is_term($tag_name, 'post_tag');
		return $taxarray["term_id"];
	}//get_tag_id
	

	function wp_get_parent_slug($postID){
		//	2008-11-18 | 2013-03-14 mhm
		$parentpost = $wpdb->get_row('SELECT post_name FROM '.$GLOBALS['wpdb']->posts.' WHERE ID='.$GLOBALS['post']->parent_post);
		return $parentpost ? $parentpost->post_name : false;
	}//wp_get_parent_slug


}//end class