<?php

namespace SayHello\Theme\Package;

/**
 * Theme Options
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */

class ThemeOptions
{
	public $main_slug = '';
	public $general_slug = '';
	public static $options;

	public function __construct()
	{
		$this->main_slug = sht_theme()->prefix . '-settings';
	}

	public function run()
	{
		add_action('acf/init', [$this, 'optionsPage'], 1);
		add_action('timber/context', [$this, 'extendTimberContext'], 20, 1);
	}

	public function optionsPage()
	{
		if (function_exists('acf_add_options_sub_page')) {
			acf_add_options_sub_page(
				[
					'menu_title' => __('Theme Options', 'sha'),
					'menu_slug' => $this->main_slug,
					'parent' => 'themes.php',
					'capability' => 'edit_theme_options',
					'position' => 30,
				]
			);
		}
	}

	/**
	 * Function for use via add_action
	 * @param  array $context The initial Timber data array
	 * @return array          The extended Timber data array
	 */
	public function extendTimberContext(array $context)
	{
		$context = self::extendContext($context);
		return $context;
	}

	/**
	 * Function for direct use e.g. in Widget class
	 * @param  array $context The initial Timber data array
	 * @return array          The extended Timber data array
	 */
	public static function extendContext(array $context)
	{
		if (empty(self::$options)) {
			self::$options = get_fields('options');
			if (isset($context['current_language']) && !empty($context['current_language']) && isset(self::$options[$context['current_language']])) {
				self::$options = self::$options[$context['current_language']];
			}
		}
		$context['options'] = self::$options;
		return $context;
	}
}
