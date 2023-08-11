<?php

namespace SayHello\Theme\Blocks\Menu;

use WP_REST_Response;

class Block
{
	public function run()
	{
		add_action('init', [$this, 'register']);
		add_action('rest_api_init', [$this, 'endpoints']);
	}

	public function register()
	{
		register_block_type(__DIR__);
	}

	public function endpoints()
	{
		register_rest_route('sht', '/menu-positions', [
			'methods' => 'GET',
			'permission_callback' => '__return_true',
			'callback' => function () {
				if (empty($nav_menus = get_registered_nav_menus())) {
					return new WP_REST_Response($nav_menus);
				}

				$response_data = [];

				foreach ($nav_menus as $key => $label) {
					$response_data[] = [
						'id' => $key,
						'title' => $label
					];
				}

				return new WP_REST_Response($response_data);
			},
		]);
	}
}
