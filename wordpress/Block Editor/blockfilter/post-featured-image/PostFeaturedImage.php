<?php

namespace SayHello\Theme\Block;

/**
 * Core Post Featured Image block
 * From plugin
 *
 * @author Say Hello GmbH <hello@sayhello.ch>
 */
class PostFeaturedImage
{

	public function run()
	{
		add_action('render_block', [$this, 'renderBlock'], 10, 2);
	}

	public function renderBlock(string $html, array $block)
	{

		if ($block['blockName'] !== 'core/post-featured-image') {
			return $html;
		}

		$classNameBase = wp_get_block_default_classname($block['blockName']);
		$link = $block['attrs']['linkToPost'] ?? false ? '<a class="' . $classNameBase . '__floodlink" href="' . get_permalink() . '"></a>' : '';
		$size = $block['attrs']['sizeSlug'] ?? 'thumbnail';

		if (empty($html)) {

			if ($block['attrs']['useNewsFallbackImage'] ?? false) {
				$page_for_posts = get_option('page_for_posts');
				if (has_post_thumbnail($page_for_posts)) {
					return sprintf(
						'<figure class="%1$s">%2$s</figure>',
						$classNameBase,
						wp_get_attachment_image(get_post_thumbnail_id($page_for_posts), $size, false, ['class' => "attachment-thumbnail size-{$size}"])
					);
				}
			}

			if (empty($html) && ($block['attrs']['className'] ?? '') === 'is-style-with-fallback') {
				return '<div class="' . $classNameBase . ' ' . $classNameBase . '--empty">' . $link . '</div>';
			}
		}

		if (empty($html)) {
			return $html;
		}

		$image = wp_get_attachment_image(
			get_post_thumbnail_id(),
			$size,
			false,
			['class' => "attachment-thumbnail size-{$size} wp-post-image"]
		);

		if (empty($image)) {
			return '';
		}

		if (!empty($link)) {
			$image = sprintf('<a class="%s__link" href="%s">%s</a>', $classNameBase, get_permalink(), $image);
		}

		return sprintf('<figure class="%s" data-sht-customisedby="theme">%s</figure>', $classNameBase, $image);
	}
}
