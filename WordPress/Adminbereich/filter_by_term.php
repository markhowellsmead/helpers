<?php
/*
	add select pulldown (filter by term) to admin list view
	add this code to functions.php
	mhm 1.10.2012
*/

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
