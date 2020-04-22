<?php

function myprefix_register_meta()
{
	register_meta('post', '_sht_post_color', array(
		'show_in_rest' => true,
		'type' => 'string',
		'single' => true,
		'sanitize_callback' => 'sanitize_text_field',
		'auth_callback' => function () {
			return current_user_can('edit_posts');
		}
	));
}
add_action('init', 'myprefix_register_meta');
