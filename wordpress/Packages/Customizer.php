<?php

namespace SayHello\Theme\Package;

/**
 * Configuration for the Customizer in the WordPress admin area.
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class Customizer
{
	public $wp_customize = null;

	public function run()
	{
		if (class_exists('WP_Customize_Control')) {
			add_action('customize_register', [$this, 'customSections']);
		}
	}

	/**
	 * Adds a new section to use custom controls in the WordPress customiser
	 * @param  WP_Customize_Manager $wp_customize - WP Manager
	 *
	 * @return void
	 */
	public function customSections(\WP_Customize_Manager $wp_customize)
	{
		$this->wp_customize = $wp_customize;
		if ($this->wp_customize) {
			$this->wp_customize->add_section('theme_mods_sht', [
				'title' => _x('Firmenangaben', 'The section title in the WordPress Customizer', 'sht'),
				'priority' => 200,
			]);
			$this->settingsLogin();
		}
	}

	// All settings for the login screen
	public function settingsLogin()
	{
		if ($this->wp_customize) {
			$this->wp_customize->add_setting(sht_theme()->prefix.'_options[company_name]', [
				'capability' => 'edit_theme_options',
				'sanitize_callback' => 'sanitize_text_field',
			]);
			$this->wp_customize->add_control(sht_theme()->prefix.'_options[company_name]', [
				'label' => _x('Firmenname', 'Theme Customizer field label', 'sht'),
				'type' => 'text',
				'section' => 'theme_mods_sht'
			]);

			$this->wp_customize->add_setting(sht_theme()->prefix.'_options[company_address]', [
				'capability' => 'edit_theme_options',
				'sanitize_callback' => 'sanitize_text_field',
			]);
			$this->wp_customize->add_control(sht_theme()->prefix.'_options[company_address]', [
				'label' => _x('Adresse', 'Theme Customizer field label', 'sht'),
				'type' => 'text',
				'section' => 'theme_mods_sht'
			]);

			$this->wp_customize->add_setting(sht_theme()->prefix.'_options[company_postcode]', [
				'capability' => 'edit_theme_options',
				'sanitize_callback' => 'sanitize_text_field',
			]);
			$this->wp_customize->add_control(sht_theme()->prefix.'_options[company_postcode]', [
				'label' => _x('PLZ', 'Theme Customizer field label', 'sht'),
				'type' => 'text',
				'section' => 'theme_mods_sht'
			]);

			$this->wp_customize->add_setting(sht_theme()->prefix.'_options[company_town]', [
				'capability' => 'edit_theme_options',
				'sanitize_callback' => 'sanitize_text_field',
			]);
			$this->wp_customize->add_control(sht_theme()->prefix.'_options[company_town]', [
				'label' => _x('Stadt', 'Theme Customizer field label', 'sht'),
				'type' => 'text',
				'section' => 'theme_mods_sht'
			]);

			$this->wp_customize->add_setting(sht_theme()->prefix.'_options[company_country]', [
				'capability' => 'edit_theme_options',
				'sanitize_callback' => 'sanitize_text_field',
			]);
			$this->wp_customize->add_control(sht_theme()->prefix.'_options[company_country]', [
				'label' => _x('Land', 'Theme Customizer field label', 'sht'),
				'type' => 'text',
				'section' => 'theme_mods_sht'
			]);

			$this->wp_customize->add_setting(sht_theme()->prefix.'_options[company_phone]', [
				'capability' => 'edit_theme_options',
				'sanitize_callback' => 'sanitize_text_field',
			]);
			$this->wp_customize->add_control(sht_theme()->prefix.'_options[company_phone]', [
				'label' => _x('Telefon', 'Theme Customizer field label', 'sht'),
				'type' => 'text',
				'section' => 'theme_mods_sht'
			]);

			$this->wp_customize->add_setting(sht_theme()->prefix.'_options[company_email]', [
				'capability' => 'edit_theme_options',
				'sanitize_callback' => 'sanitize_text_field',
			]);
			$this->wp_customize->add_control(sht_theme()->prefix.'_options[company_email]', [
				'label' => _x('E-Mail-Adresse', 'Theme Customizer field label', 'sht'),
				'type' => 'email',
				'section' => 'theme_mods_sht'
			]);
		}
	}
}
