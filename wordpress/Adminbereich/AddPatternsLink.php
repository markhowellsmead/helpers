<?php

namespace SayHello\MustUse\Controller;

class AddPatternsLink
{

	public function run()
	{
		add_action('admin_menu', [$this, 'addPatternLinkToMenu']);
		add_action('admin_head', [$this, 'openSubmenu']);
	}

	private function getSubmenuUrl()
	{

		$language = '';

		if (function_exists('pll_current_language')) {
			$language = pll_current_language();
		}

		if (!empty($language)) {
			$language = '&lang=' . $language;
		}

		return "edit.php?post_type=wp_block{$language}";
	}

	public function addPatternLinkToMenu()
	{
		add_submenu_page(
			'themes.php',
			__('Meine Vorlagen', 'shp-hotel-aare-mu'),
			__('Meine Vorlagen', 'shp-hotel-aare-mu'),
			'manage_options',
			$this->getSubmenuUrl()
		);
	}


	public function openSubmenu()
	{
		global $parent_file, $submenu_file, $plugin_page;

		$submenu_url = $this->getSubmenuUrl();

		$screen = get_current_screen();

		$is_edit_single = $screen->post_type === 'wp_block' && $screen->base === 'post';

		if ($is_edit_single || isset($_GET['post_type']) && $_GET['post_type'] === 'wp_block') {
			$parent_file = 'themes.php';
			$submenu_file = $submenu_url;
			$plugin_page = $submenu_url;
		}
	}
}
