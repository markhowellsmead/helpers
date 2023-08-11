/**
 * Takes the post type and slug from the editor BODY class
 * and adds a custom class name to the .block-editor-writing-flow element
 * Usage: import './customWrapperClass/index.js';
 *
 * Don't forget to extend the admin BODY class with the 
 * admin_body_class hook in PHP.
	
add_filter('admin_body_class', 'my_admin_body_class');
function my_admin_body_class($classes)
{
	global $post;
	if ($post->post_type === 'block_area') {
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
			document.querySelector('.block-editor-writing-flow').classList.add('block-editor-writing-flow--' + post_type);
			document.querySelector('.block-editor-writing-flow').classList.add('block-editor-writing-flow--' + post_type + '-' + post_name);
		}
	}
});

