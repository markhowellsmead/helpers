<?php

namespace SayHello\Theme\Package;

/**
 * Cookie Banner
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class CookieBanner
{

	public function run()
	{
		add_action('wp_enqueue_scripts', [ $this, 'registerAssets' ]);
		add_action('acf/init', [ $this, 'settingsPage' ]);
	}

	public function registerAssets()
	{
		if (file_exists(sht_theme()->Package->Assets->theme_path .'/assets/styles/cookiebanner.min.css')) {
			wp_enqueue_style(sht_theme()->prefix . '-cookiebanner', sht_theme()->Package->Assets->theme_url . '/assets/styles/cookiebanner.min.css', [], filemtime(sht_theme()->Package->Assets->theme_path .'/assets/styles/cookiebanner.min.css'));
		}
		if (file_exists(sht_theme()->Package->Assets->theme_path .'/assets/scripts/cookiebanner.min.js')) {
			wp_enqueue_script(sht_theme()->prefix . '-cookiebanner', sht_theme()->Package->Assets->theme_url . '/assets/scripts/cookiebanner.min.js', [], filemtime(sht_theme()->Package->Assets->theme_path .'/assets/scripts/cookiebanner.min.js'), true);
			wp_localize_script(sht_theme()->prefix . '-script', 'SHTCookieBanner', [
				'text' => get_field('sht_cookiebanner_text', 'options'),
				'buttontext' => get_field('sht_cookiebanner_buttontext', 'options')
			]);
		}
	}

	public function settingsPage()
	{
		if (function_exists('acf_add_options_sub_page')) {
			acf_add_options_sub_page(
				[
					'page_title'  => _x('Cookie Banner', 'Admin page title', 'sht'),
					'menu_title'  => _x('Cookie Banner', 'Admin menu label', 'sht'),
					'menu_slug'   => 'sht-cookiebanner',
					'parent_slug' => 'options-general.php',
					'capability'  => 'edit_theme_options',
				]
			);
		}
		if (function_exists('acf_add_local_field_group')) {
			acf_add_local_field_group(
				[
					'key'      => "sht-cookiebanner-group",
					'title'    => __('Cookie Banner Content', 'sha'),
					'fields'   => [
						[
							'key' => 'sht_cookiebanner_text',
							'label' => _x('Text', 'ACF field label', 'sha'),
							'name' => 'sht_cookiebanner_text',
							'type' => 'wysiwyg',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => [
								'width' => '',
								'class' => '',
								'id' => '',
							],
							'default_value' => '',
							'tabs' => 'all',
							'toolbar' => 'full',
							'media_upload' => 1,
							'delay' => 0,
						],
						[
							'key' => 'sht_cookiebanner_buttontext',
							'label' => _x('Close button text', 'ACF field label', 'sha'),
							'name' => 'sht_cookiebanner_buttontext',
							'type' => 'text',
							'instructions' => '',
							'required' => 1,
							'conditional_logic' => 0,
							'wrapper' => [
								'width' => '',
								'class' => '',
								'id' => '',
							],
							'default_value' => '',
						],
					],
					'location' => [
						[
							[
								'param'    => 'options_page',
								'operator' => '==',
								'value'    => 'sht-cookiebanner',
							],
						],
					],
				]
			);
		}
	}
}
