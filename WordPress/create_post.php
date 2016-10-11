<?php
//	mhm 1.11.2012

function createPost(){

	$post_data = array(
		'post_type'		=> 'orders',
		'comment_status'=> 'closed',
		'ping_status'	=> 'closed',
		'post_author'	=> 1, 				// ID-Nummer des Backend-Benutzer
		'post_name'		=> 'post-titel',
		'post_title'	=> 'Post Titel',
		'post_status'	=> 'draft',			// http://codex.wordpress.org/Post_Status_Transitions
		//'ID' 			=> 12345 			// Falls man ein bestehender Post aktualisieren will
	);
	
	$post_id = -1;
	$post_id = wp_insert_post($post_data); 	// http://codex.wordpress.org/Function_Reference/wp_insert_post

	if($post_id){

		// Custom-Meta-Eintrag verweisen
		add_post_meta($post_id, 'meinCustomFeld', 'Hallo Welt');

		// zB Kategorie/-n zuweisen
		$taxonomy_array = array(1,3,5,7,9); // ID-Nummern der Kategorien
		wp_set_object_terms($post_id,$taxonomy_array,'category');
		

		$tag_array = array('html', 'css', 'javascript');
		wp_set_object_terms($post_id, $tag_array, 'post_tag', true); 		// Bestehende Tags beibehalten und neue Tags hinzufügen
		//wp_set_object_terms($post_id, $tag_array, 'post_tag', false); 	// Bestehende Tags löschen und nur neue Tags hinzufügen

	}

	return $post_id;

}//createPost