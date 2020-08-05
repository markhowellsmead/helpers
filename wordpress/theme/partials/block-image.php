<?php

use SayHello\Theme\Package\Lazysizes;

/*
 * Output an optionally-linked figure and image, which is a LazySizes object
 * in the frontend or a wrapped regular wp_get_attachment_image in the editor.
 *
 * THIS PARTIAL REQUIRES WORDPRESS 5.5 OR NEWER
 *
 * Usage:
	get_template_part('partials/block-image', null, [
		'ID' => get_field('sht_moodimage', $post->ID),
		'size' => 'card-large',
		'image_class' => 'wp-block-sht-location-card__image c-card__image',
		'figure_class' => 'wp-block-sht-location-card__figure c-card__figure',
		'is_context_edit' => $is_preview,
		'link' => get_permalink($location->ID)
	]);
 */

$args = wp_parse_args($args, [
	'ID' => null,
	'size' => 'full',
	'image_class' => 'wp-block__image',
	'figure_class' => 'wp-block__figure',
	'is_context_edit' => false,
	'link' => '',
]);

// Make sure that the value is boolean
$args['is_context_edit'] = sht_theme()->Package->ACF->isContextEdit($args['is_context_edit']);

$image = '';

if ($args['is_context_edit']) {
	$image = wp_get_attachment_image($args['ID'], $args['size'], false, ['class' => $args['image_class']]);
	if (!empty($image)) {
		$image = '<figure class="' .$args['figure_class']. '">'.$image.'</figure>';
	}
} else {
	$image = Lazysizes::getLazyImage(
		$args['ID'],
		$args['size'],
		$args['figure_class'],
		$args['image_class']
	);
}

if (!empty($image) && !empty($args['link'])) {
	$image = sprintf('<a href="%s">%s</a>', $args['link'], $image);
}

echo $image;
