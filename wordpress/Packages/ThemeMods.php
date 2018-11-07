<?php

namespace MarkHowellsMead\Theme\Packages;

/**
 * Registers a Basic theme options page if ACF is installed.
 * Adds a Google API from an ACF settings field to the ACF context.
 * Adds the theme options to the Timber context.
 *
 * @author Mark Howells-Mead <mark@permanenttourist.ch>
 */
class ThemeMods
{
	/**
	 * Hooks the init action if ACF is installed.
	 * Hooks admin_notices and displays warning if ACF is not installed.
	 *
	 * @return void
	 */
	public function run()
	{
		add_filter('timber_context', [$this, 'addToTimberContext'], 10, 1);
		add_action('acf/init', [$this, 'acfInit']);
		if (function_exists('acf_add_options_page')) {
			add_action('init', [$this, 'registerOptionsPage']);
		}
	}

	public function acfInit()
	{
		acf_update_setting('google_api_key', get_field('google_maps_api_key', 'theme_options'));
	}

	/**
	 * Register options page.
	 *
	 * @return void
	 */
	public function registerOptionsPage()
	{
		acf_add_options_page(array(
			'page_title' => _x('Theme options', 'Theme options page title', 'harris'),
			'menu_title' => _x('Options', 'Theme options menu label', 'harris'),
			'menu_slug' => 'theme-options',
			'capability' => 'edit_theme_options',
			'position' => false,
			'parent_slug' => 'themes.php',
			'icon_url' => false,
			'redirect' => true,
			'post_id' => 'theme_options',
			'autoload' => false,
		));
	}

	/**
	 * Add theme options to Timber context
	 * @param array $data The potentially amended context data
	 */
	public function addToTimberContext($data)
	{
		if (function_exists('get_fields')) {
			$data['options'] = get_fields('theme_options');
		}
		return $data;
	}
}
