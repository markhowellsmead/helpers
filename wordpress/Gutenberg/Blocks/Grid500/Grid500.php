<?php

namespace SayHello\Theme\Block;

use Timber\Timber;

/**
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */

class Grid500
{
	public function run()
	{
		add_action('init', [$this, 'register']);
	}

	public function register()
	{
		// Block using ACF fields
		acf_register_block_type([
			'name' => 'sht/grid500',
			'category' => 'sht/custom-blocks',
			'icon' => 'images-alt2',
			'keywords' => [_x('Galerie', 'Gutenberg block keyword', 'sha'), _x('Bildergalerie', 'Gutenberg block keyword', 'sha'), _x('Bild', 'Gutenberg block keyword', 'sha')],
			'post_types' => ['post', 'page'],
			'supports' => [
				'align' => ['wide', 'full'],
				'mode' => false
			],
			'title' => _x('Bildergalerie (Flex-Layout)', 'Block title', 'sha'),
			'description' => __('Eine Bildgalerie, in der alle Bilder den verfügbaren Platz füllen.', 'Block description', 'sha'),
			'render_callback' => function ($block, $content = '', $is_preview = false) {
				$context = Timber::get_context();
				$context['block'] = $block;
				$context['block']['data']['images'] = get_field('images', $context['block']['id']);
				$context['block']['is_edit_mode'] = $is_preview;
				Timber::render('blocks/grid500.twig', $context);
			},
		]);
	}
}
