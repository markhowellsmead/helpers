<?php

namespace SayHello\Theme\Block;

/**
 * Basic SSR block
 *
 * @author Say Hello GmbH <hello@sayhello.ch>
 */
class Basic
{

	public function run()
	{
		add_action('init', [$this, 'register']);
	}

	/**
	 * Registers the block for server-side rendering
	 */
	public function register()
	{
		register_block_type('sht/basic', [
			'attributes' => [
				'align' => [
					'type'  => 'string',
				],
			],
			'render_callback' => function (array $attributes) {

				$classes = [];
				$size = $attributes['image_size'];

				if (!empty($align = $attributes['align'] ?? '')) {
					$classes[] = "align{$align}";
				}

				ob_start();
?>

			<div <?php echo get_block_wrapper_attributes(['class' => implode(' ', $classes)]); ?>>
				... Block content...
			</div>
<?php
				$html = ob_get_contents();
				ob_end_clean();
				return $html;
			}
		]);
	}
}
