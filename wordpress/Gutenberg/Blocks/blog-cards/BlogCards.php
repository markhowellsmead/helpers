<?php

namespace SayHello\Theme\Block;

/**
 * Blog cards
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class BlogCards
{

	public function run()
	{
		add_action('init', [$this, 'registerBlocks']);
	}

	public function registerBlocks()
	{
		register_block_type('sht/blog-cards', [
			'render_callback' => [$this, 'renderBlock']
		]);
	}

	public function renderBlock($attributes)
	{
		$posts = get_posts([
			'post_type' => 'post',
			'post_status' => 'publish',
			'posts_per_page' => 3,
			'ignore_sticky' => true
		]);

		if (count($posts) > 3) {
			// Sticky post!
			$posts = array_slice($posts, 0, 3);
		}

		if (!count($posts)) {
			return '';
		}

		ob_start();
		get_template_part('partials/block/blog-cards', null, [
			'attributes' => $attributes,
			'posts' => $posts
		]);
		$html = ob_get_contents();
		ob_end_clean();

		return $html;
	}
}
