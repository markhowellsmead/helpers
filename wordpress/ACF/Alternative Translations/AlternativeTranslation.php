<?php

namespace SayHello\Theme\Package;

/**
 * Alternative Translation
 *
 * @author Say Hello GmbH <hello@sayhello.ch>
 */

class AlternativeTranslation
{
	public $alternative_translations;
	public $alternative_translation_transientkey = 'sht_alternative_translations';
	public $original_values = [];

	public function run()
	{
		add_action('acf/init', [$this, 'page'], 1);
		add_filter('gettext', [$this, 'alternativeTranslations']);
		add_filter('gettext_with_context', [$this, 'alternativeTranslations']);
		add_filter('acf/save_post', [$this, 'clearTranslationTransient'], 10); // before save
		add_filter('acf/save_post', [$this, 'fillTranslationTransient'], 20); // after save
	}

	public function page()
	{
		if (function_exists('acf_add_options_sub_page')) {
			acf_add_options_sub_page(
				[
					'page_title'  => __('Alternative Übersetzungen', 'sha'),
					'menu_title'  => __('Alternative Übersetzungen', 'sha'),
					'menu_slug'   => 'sht-settings-alternative-translations',
					'parent_slug' => 'options-general.php',
					'capability'  => 'edit_theme_options',
				]
			);
		}
	}

	public function alternativeTranslations(string $original)
	{

		if (is_admin() || defined('WP_CLI')) {
			return $original;
		}

		// Stop repetitive DB calls. Save initial array to object once per call.
		if (empty($this->alternative_translations)) {
			$this->alternative_translations = get_transient($this->alternative_translation_transientkey);
		}

		// If object var still empty, return original translation.
		if (!is_array($this->alternative_translations) || empty($this->alternative_translations)) {
			return $original;
		}

		// Assign the array column to a variable so that it doesn't get re-run by every iteration of array_search
		// Store the column in a class var on first pass, so that we only need to do this once.
		if (empty($this->original_values)) {
			$this->original_values = array_column($this->alternative_translations, 'original');
		}

		$array_index = array_search($original, $this->original_values);

		if ($array_index === false) {
			return $original;
		}

		return $this->alternative_translations[$array_index]['alternative'];
	}

	public function clearTranslationTransient($post_id)
	{
		if ($post_id === 'options') {
			delete_transient($this->alternative_translation_transientkey);
		}
	}

	public function fillTranslationTransient($post_id)
	{
		if ($post_id === 'options') {
			$alternative_translations = get_field('alternative_translations', 'options');

			if (empty($alternative_translations)) {
				delete_transient($this->alternative_translation_transientkey);
			} else {
				set_transient($this->alternative_translation_transientkey, $alternative_translations);
			}
		}
	}
}
