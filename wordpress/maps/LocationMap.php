<?php

namespace SayHello\Theme\Block;

/**
 * LocationMap block
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class LocationMap
{

	public function run()
	{
		add_action('acf/init', [$this, 'registerBlocks']);
		add_action('acf/init', [$this, 'registerFields']);
	}

	public function registerBlocks()
	{
		if (function_exists('acf_register_block_type')) {
			acf_register_block_type([
				'name' => 'sht/location-map',
				'category' => 'widgets',
				'icon' => 'location',
				'keywords' => [
					_x('Karte', 'Gutenberg block keyword', 'sha'),
					'map',
				],
				'supports' => [
					'align' => ['wide', 'full']
				],
				'align' => 'full',
				'title' => _x('Standort-Karte', 'Block title', 'sha'),
				'description' => _x('Eine Kartenansicht mit gewählten Standorten.', 'Block description', 'sha'),
				'render_callback' => function ($block, $content = '', $is_preview = false) {
					$block['is_context_edit'] = $is_preview;
					$block['data']['locations'] = get_field('locations');
					get_template_part('partials/block/location-map', null, $block);
				},
			]);
		}
	}

	public function registerFields()
	{
		if (function_exists('acf_add_local_field_group')) :
			acf_add_local_field_group([
				'key' => 'group_maplocations',
				'title' => _x('Map-Standorte', 'ACF field group label', 'sha'),
				'fields' => [
					[
						'key' => 'locations',
						'label' => _x('Standorte', 'ACF field label', 'sha'),
						'name' => 'locations',
						'type' => 'repeater',
						'instructions' => '',
						'required' => 0,
						'conditional_logic' => 0,
						'wrapper' => [
							'width' => '',
							'class' => '',
							'id' => '',
						],
						'collapsed' => '',
						'min' => 0,
						'max' => 0,
						'layout' => 'table',
						'button_label' => _x('Standort hinzufügen', 'ACF button label', 'sha'),
						'sub_fields' => [
							[
								'key' => 'location',
								'label' => _x('Location', 'ACF field label', 'sha'),
								'name' => 'location',
								'type' => 'google_map',
								'instructions' => '',
								'required' => 1,
								'conditional_logic' => 0,
								'wrapper' => [
									'width' => '',
									'class' => '',
									'id' => '',
								],
								'center_lat' => '46.75178603017687',
								'center_lng' => '7.626051951349616',
								'zoom' => 11,
								'height' => '',
							],
							[
								'key' => 'icon',
								'label' => _x('Icon', 'ACF field label', 'sha'),
								'name' => 'icon',
								'type' => 'select',
								'instructions' => '',
								'required' => 1,
								'conditional_logic' => 0,
								'wrapper' => [
									'width' => '',
									'class' => '',
									'id' => '',
								],
								'choices' => [
									'solid-red' => _x('Rot (gefüllt)', 'ACF field label', 'sha'),
									'contour-red' => _x('Rot (Kontur)', 'ACF field label', 'sha'),
									'contour-blue' => _x('Blau (gefüllt)', 'ACF field label', 'sha'),
								],
								'default_value' => 'solid-red',
								'allow_null' => 0,
								'multiple' => 0,
								'ui' => 0,
								'return_format' => 'value',
								'ajax' => 0,
								'placeholder' => '',
							],
							[
								'key' => 'link',
								'label' => 'Link',
								'name' => 'link',
								'type' => 'link',
								'instructions' => '',
								'required' => 0,
								'conditional_logic' => 0,
								'wrapper' => [
									'width' => '',
									'class' => '',
									'id' => '',
								],
								'return_format' => 'array',
							],
						],
					],
				],
				'location' => [
					[
						[
							'param' => 'block',
							'operator' => '==',
							'value' => 'acf/sht-location-map',
						],
					],
				],
				'menu_order' => 0,
				'position' => 'normal',
				'style' => 'default',
				'label_placement' => 'top',
				'instruction_placement' => 'label',
				'hide_on_screen' => '',
				'active' => true,
				'description' => '',
			]);
		endif;
	}
}
