<?php

…
	add_filter('manage_page_posts_columns', [$this, 'adminColumns']);
	add_action('manage_page_posts_custom_column', [$this, 'adminColumnContent'], 10, 2);
…
  
	public function adminColumns($columns)
	{
		$colpos = array_search('author', array_keys($columns));
		$columns = array_slice($columns, 0, $colpos)
			+ ['page_template' => _x('Template', 'Admin column header', 'sha')]
			+ array_slice($columns, $colpos);
		return $columns;
	}

	public function adminColumnContent($column_name, $post_id)
	{
		switch ($column_name) {
			case 'page_template':
				$template_path = get_post_meta($post_id, '_wp_page_template', true);
				$templates = wp_get_theme()->get_page_templates();
				echo $templates[$template_path] ?? __('Default');
				break;
		}
	}
