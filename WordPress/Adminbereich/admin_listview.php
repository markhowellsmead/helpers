<?php

// Add column and header
add_filter('manage_posts_columns', 'add_post_column', 5);
	function add_post_column($cols){
		//	add entry to $cols array per required column. key ties in with per-row-function.
		$cols['ticket_status'] = __('Ticket Status');
		return $cols;
	}

//	show content for each row
//	one function for all column types, with a switch per column key
	add_action('manage_posts_custom_column', 'custom_post_column', 5,2);
	function custom_post_column($col, $id){
		global $post;
		switch($col){
			case 'ticket_status':
				$terms = get_the_term_list( $post->ID , $col , '' , ',' , '' );
				if ( is_string( $terms ) ) {
					echo $terms;
				}
				break;
		}
	}

//	add select (filter by term) to admin list view
	function restrict_by_term() {
		global $typenow;
		$post_type = 'ticket';			// change HERE
		$taxonomy = 'ticket_status';	// change HERE

		if ($typenow == $post_type) {
			$selected = isset($_GET[$taxonomy]) ? $_GET[$taxonomy] : '';
			$info_taxonomy = get_taxonomy($taxonomy);
			wp_dropdown_categories(array(
				'show_option_all' => __("Show All {$info_taxonomy->label}"),
				'taxonomy' => $taxonomy,
				'name' => $taxonomy,
				'orderby' => 'name',
				'selected' => $selected,
				'show_count' => true,
				'hide_empty' => true,
			));
		};
	}
	add_action('restrict_manage_posts', 'restrict_by_term');
	function convert_id_to_term_in_query($query) {
		global $pagenow;
		$post_type = 'ticket'; 			// change HERE
		$taxonomy = 'ticket_status'; 	// change HERE
		$q_vars = &$query->query_vars;
		if ($pagenow == 'edit.php' && isset($q_vars['post_type']) && $q_vars['post_type'] == $post_type && isset($q_vars[$taxonomy]) && is_numeric($q_vars[$taxonomy]) && $q_vars[$taxonomy] != 0) {
			$term = get_term_by('id', $q_vars[$taxonomy], $taxonomy);
			$q_vars[$taxonomy] = $term->slug;
		}
	}
	add_filter('parse_query', 'convert_id_to_term_in_query');

//	remove row action links (edit, view etc) from list view
	function my_action_row($actions, $post){
	    if ($post->post_type=='myCustomPostType'){
		    unset($actions['view']);
	    }
	    return $actions;
	}
	add_filter('post_row_actions','my_action_row', 10, 2);