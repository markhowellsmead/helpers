<?php

namespace SayHello\Theme\Block;

/**
 * Gallery Block
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class Gallery
{
	public function run()
	{
		add_action('init', [$this, 'registerBlocks']);
	}

	public function registerBlocks()
	{
		register_block_type('sht/gallery', [
			'attributes' => [
				'images' => [
					'type'  => 'array',
					'items' => [
						'type' => 'integer',
					],
				],
				'className' => [
					'type'  => 'string',
				],
				'updated' => [
					'type'  => 'integer',
				]
			],
			'render_callback' => function ($attributes, $content, $block) {
				ob_start();
				get_template_part('/partials/block/gallery', null, [
					'attributes' => $attributes,
					'content' => $content,
					'block' => $block
				]);
				$html = ob_get_contents();
				ob_end_clean();
				return $html;
			}
		]);
	}
}
