<?php

namespace SayHello\Theme\Package;

/**
 * @author Nico Martin <nico@sayhello.ch>
 */
class Contact
{
	public function run()
	{
		add_action('acf/init', [$this, 'options']);
		add_action('init', [$this, 'block']);
	}

	public function options()
	{
		acf_add_options_sub_page([
			'page_title'  => __('Kontakt Settings', 'sha'),
			'menu_title'  => __('Kontakt', 'sha'),
			'menu_slug'   => sht_theme()->Package->ThemeOptions->main_slug . '-contact',
			'parent_slug' => sht_theme()->Package->ThemeOptions->main_slug,
			'capability'  => 'edit_theme_options',
			'position'    => 20,
			'icon_url'    => 'dashicons-products',
		]);

		$prefix      = sht_theme()->prefix;
		$pages       = get_pages();
		$pageChoices = [];
		foreach ($pages as $page) {
			if (function_exists('pll_default_language') && function_exists('pll_get_post_language')) {
				if (pll_default_language() === pll_get_post_language($page->ID)) {
					$pageChoices[$page->ID] = $page->post_title;
				}
			} else {
				$pageChoices[$page->ID] = $page->post_title;
			}
		}

		acf_add_local_field_group([
			'key'      => "$prefix-contact-page-group",
			'title'    => __('Kontakt Seite', 'sha'),
			'fields'   => [
				[
					'key'     => "field_$prefix-contact-page",
					'name'    => "$prefix-contact-page",
					'label'   => __('Kontaktseite', 'sha'),
					'type'    => 'select',
					'choices' => $pageChoices,
				],
			],
			'location' => [
				[
					[
						'param'    => 'options_page',
						'operator' => '==',
						'value'    => sht_theme()->Package->ThemeOptions->main_slug . '-contact',
					],
				],
			],
		]);

		acf_add_local_field_group([
			'key'        => "$prefix-contact-group",
			'title'      => __('Kontakt', 'sha'),
			'multilang'  => true,
			'menu_order' => 50,
			'fields'     => [
				[
					'key'   => "field_$prefix-contact-tel",
					'name'  => "$prefix-contact-tel",
					'label' => __('Telefon', 'sha'),
					'type'  => 'text',
				],
				[
					'key'   => "field_$prefix-contact-fax",
					'name'  => "$prefix-contact-fax",
					'label' => __('Fax', 'sha'),
					'type'  => 'text',
				],
				[
					'key'   => "field_$prefix-contact-email",
					'name'  => "$prefix-contact-email",
					'label' => __('Email', 'sha'),
					'type'  => 'email',
				],
				[
					'key'   => "field_$prefix-contact-name",
					'name'  => "$prefix-contact-name",
					'label' => __('Name', 'sha'),
					'type'  => 'text',
				],
				[
					'key'     => "field_$prefix-contact-street",
					'name'    => "$prefix-contact-street",
					'label'   => __('Strasse', 'sha'),
					'type'    => 'text',
					'wrapper' => [
						'width' => 70,
					],
				],
				[
					'key'     => "field_$prefix-contact-number",
					'name'    => "$prefix-contact-number",
					'label'   => __('Nummer', 'sha'),
					'type'    => 'text',
					'wrapper' => [
						'width' => 30,
					],
				],
				[
					'key'     => "field_$prefix-contact-zip",
					'name'    => "$prefix-contact-zip",
					'label'   => __('PLZ', 'sha'),
					'type'    => 'text',
					'wrapper' => [
						'width' => 30,
					],
				],
				[
					'key'     => "field_$prefix-contact-city",
					'name'    => "$prefix-contact-city",
					'label'   => __('Ort', 'sha'),
					'type'    => 'text',
					'wrapper' => [
						'width' => 70,
					],
				],
				[
					'key'     => "field_$prefix-contact-state",
					'name'    => "$prefix-contact-state",
					'label'   => __('Kanton', 'sha'),
					'type'    => 'text',
					'wrapper' => [
						'width' => 50,
					],
				],
				[
					'key'     => "field_$prefix-contact-country",
					'name'    => "$prefix-contact-country",
					'label'   => __('Land', 'sha'),
					'type'    => 'text',
					'wrapper' => [
						'width' => 50,
					],
				],
			],
			'location'   => [
				[
					[
						'param'    => 'options_page',
						'operator' => '==',
						'value'    => sht_theme()->Package->ThemeOptions->main_slug . '-contact',
					],
				],
			],
		]);
	}

	public function block()
	{
		register_block_type('sht/contact-banner', [
			'render_callback' => function () {
				$html = '<div class="sht-content-block c-content-section__wide">';
				$html .= '<div class="sht-content-block__text">';
				$html .= '<h3>' . __('Womit können wir Ihnen helfen?', 'sht') . '</h3>';
				$html .= '<p>' . __('Unsere Experten stehen Ihnen bei all Ihren Fragen zur Verfügung. Wählen Sie Ihren Bereich und Sie können direkt Kontakt mit einem Berater aufnehmen.', 'sht') . '</p>';
				$html .= '</div>';
				if (get_field('sht-contact-page', 'options')) {
					$permalink = get_the_permalink(get_field('sht-contact-page', 'options'));
					$html      .= '<form class="sht-content-block__form" action="' . $permalink . '" method="GET">';
					$html      .= '<p>' . __('Wo benötigen Sie unsere Expertise?', 'sht') . '</p>';
					$html      .= '<select name="area"><option value="">' . __('Bereich wählen ...', 'sht') . '</option></select>';
					$html      .= '<button type="submit" class="o-button">' . __('Zum Kontaktformular', 'sht') . '</button>';
					$html      .= '</form>';
				}
				$html .= '</div>';

				return $html;
			},
		]);
	}
}
