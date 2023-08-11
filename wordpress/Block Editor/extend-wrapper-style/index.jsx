/**
 * Takes the post type and slug from the editor BODY class
 * and adds a custom class name to the specified element
 * (In this example, .block-editor-block-list__layout)
 *
 * This allows us to add special styles in the editor for
 * a specific post type or e.g. a specific block area.
 *
 * Usage: import './extend-wrapper-style/index.js';
 *
 * Don't forget to extend the admin BODY class with the
 * admin_body_class hook in PHP. This requires PHP 7+
 * because of the null coalescing operators.

add_filter('admin_body_class', 'my_admin_body_class');
function my_admin_body_class($classes)
{
	global $post;
	if ($post->post_type ?? false && $post->post_name ?? false) {
		$classes .= ' post-type-'.$post->post_type.'--'.$post->post_name;
	}
	return $classes;
}
 *
 * mark@sayhello.ch 17.4.2020
 */

import domReady from '@wordpress/dom-ready';

domReady(() => {
	let body_classes = document.querySelector('body').classList;
	if (body_classes.contains('wp-admin') && body_classes.contains('block-editor-page')) {
		const matches = document
			.querySelector('body')
			.getAttribute('class')
			.match(/post-type-([a-z_]+)--([a-z_]+)/);
		if (matches) {
			const post_type = matches[1];
			const post_name = matches[2];
			document.querySelector('.block-editor-block-list__layout').classList.add('block-editor-block-list__layout--' + post_type);
			document.querySelector('.block-editor-block-list__layout').classList.add('block-editor-block-list__layout--' + post_type + '-' + post_name);
		}
	}
});
