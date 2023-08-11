<?php

/**
 * Gallery Template
 * Loaded by Core register_block_type render_callback
 */

use SayHello\Theme\Package\Lazysizes;

$attributes = $args['attributes'] ?? [];

if (empty($attributes['images'] ?? [])) {
	if (sht_theme()->Plugin->ACF->isContextEdit($is_preview)) {
		printf(
			'<section class="c-editormessage c-editormessage--error"><p>%s</p></section>',
			_x('Bitte wählen Sie Bilder für die Ausgabe aus.', 'Editor message', 'sha')
		);
	}
	return;
}

$images = [];

foreach ($attributes['images'] as $image_id) {
	if (sht_theme()->Package->Gutenberg->isContextEdit()) {
		$images[] = sprintf(
			'<div class="%1$s__figurewrap"><figure class="%1$s__figure"><img class="%1$s__image" src="%2$s"/></figure>%3$s</div>',
			$attributes['className'],
			wp_get_attachment_image_src($image_id, 'large')[0],
			!empty($caption = wp_get_attachment_caption($image_id)) ? sprintf(
				'<figcaption>%s</figcaption>',
				$caption
			) : ''
		);
	} else {
		$images[] = sprintf(
			'<div class="%s__figurewrap">%s%s</div>',
			$attributes['className'],
			'<figure class="' . $attributes['className'] . '__image">' . wp_get_attachment_image($image_id, 'thumbnail', false, ['class' => "{$attributes['className']}__image"]) . '</figure>',
			!empty($caption = wp_get_attachment_caption($image_id)) ? sprintf(
				'<figcaption>%s</figcaption>',
				$caption
			) : ''
		);
	}
}

if (!empty($images)) {
	printf(
		'<div class="%1$s"><div class="%1$s__inner">%2$s</div></div>',
		$attributes['className'],
		implode('', $images)
	);
}
