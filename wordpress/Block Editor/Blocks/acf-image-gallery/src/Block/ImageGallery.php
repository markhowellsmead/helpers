<?php

namespace SayHello\Theme\Block;

/**
 * Image gallery with ACF field
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class ImageGallery
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
				'name' => 'image-gallery',
				'category' => 'common',
				'icon' => 'format-gallery',
				'keywords' => [
					_x('Bilder', 'Gutenberg block keyword', 'sha'),
				],
				'post_types' => ['post', 'page', 'mhm-place'],
				'supports' => [
					'align' => ['wide', 'full']
				],
				'title' => _x('Galerie', 'Block title', 'sha'),
				'description' => __('Eine Bildgalerie mit redaktionell ausgewählten Bilder.', 'Block description', 'sha'),
				'render_callback' => function ($block, $content = '', $is_preview = false) {
					$block['is_context_edit'] = $is_preview;
					get_template_part('partials/block/image-gallery', null, $block);
				},
			]);
		}
	}

	public function registerFields()
	{
		if (function_exists('acf_add_local_field_group')) :

			acf_add_local_field_group([
				'key' => 'group_block_gallery',
				'title' => 'Block: Gallery',
				'fields' => [
					[
						'key' => 'image_size',
						'label' => _x('Bildgrösse', 'ACF field label', 'sha'),
						'name' => 'image_size',
						'type' => 'select',
						'instructions' => '',
						'required' => 0,
						'conditional_logic' => 0,
						'wrapper' => [
							'width' => '',
							'class' => '',
							'id' => '',
						],
						'choices' => [
							'small' => 'Klein',
							'regular' => 'Standard',
						],
						'default_value' => 'regular',
						'allow_null' => 0,
						'multiple' => 0,
						'ui' => 0,
						'return_format' => 'value',
						'ajax' => 0,
						'placeholder' => '',
					],
					[
						'key' => 'images',
						'label' => _x('Bilder', 'ACF field label', 'sha'),
						'name' => 'images',
						'type' => 'gallery',
						'instructions' => '',
						'required' => 0,
						'conditional_logic' => 0,
						'wrapper' => [
							'width' => '',
							'class' => '',
							'id' => '',
						],
						'return_format' => 'array',
						'preview_size' => 'thumbnail',
						'insert' => 'append',
						'library' => 'all',
						'min' => '',
						'max' => '',
						'min_width' => '',
						'min_height' => '',
						'min_size' => '',
						'max_width' => '',
						'max_height' => '',
						'max_size' => '',
						'mime_types' => 'jpg,png',
					],
				],
				'location' => [
					[
						[
							'param' => 'block',
							'operator' => '==',
							'value' => 'acf/image-gallery',
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
