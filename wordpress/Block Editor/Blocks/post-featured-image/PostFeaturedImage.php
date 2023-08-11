<?php

namespace SayHello\Theme\Block;

/**
 * Post featured image - alternative with size selector
 *
 * @author Say Hello GmbH <hello@sayhello.ch>
 */
class PostFeaturedImage
{

	public function run()
	{
		add_action('init', [$this, 'register']);
	}

	/**
	 * Registers the `sht/post-featured-image` block on the server.
	 */
	public function register()
	{
		register_block_type('sht/post-featured-image', [
			'attributes' => [
				'align' => [
					'default' => '',
					'type'    => 'string'
				],
				'image_size' => [
					'default' => 'post-thumbnail',
					'type'    => 'string'
				],
			],
			'render_callback' => function ($attributes) {

				if (!empty($align = $attributes['align'])) {
					$align = " align{$align}";
				}

				// Editor
				if (sht_theme()->Package->Gutenberg->isContextEdit()) {
					ob_start();
?>
				<div class="wp-block-sht-post-featured-image<?php echo $align; ?>">
					<div class="wp-block-sht-post-featured-image__figure wp-block-sht-post-featured-image__figure--empty"></div>
				</div>
			<?
					$html = ob_get_contents();
					ob_end_clean();
					return $html;
				}

				// Frontend, no post thumbnail
				if (!has_post_thumbnail(get_the_ID())) {
					return '';
				}

				// Frontend, with post thumbnail
				$size = $attributes['image_size'] ?? 'post-thumbnail';

				ob_start();
				$image = get_the_post_thumbnail(get_the_ID(), $size, ['class' => 'wp-block-sht-post-featured-image__image wp-block-sht-post-featured-image__image--' . $size]);
			?>
			<div class="wp-block-sht-post-featured-image<?php echo $align; ?>">
				<div class="wp-block-sht-post-featured-image__figure wp-block-sht-post-featured-image__figure--<?php echo $size; ?>"><?php echo $image; ?></div>
			</div>
<?php

				$html = ob_get_contents();
				ob_end_clean();
				return $html;
			}
		]);
	}
}
