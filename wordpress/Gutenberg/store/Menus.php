<?php

namespace SayHello\Theme\Store;

use WP_REST_Response;

/**
 * Registers REST API endpoints to get WordPress Menus
 * The registration of the Menus takes place in the Navigation Package.
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class Menus
{
	public function run()
	{
		add_action('rest_api_init', [$this, 'endpoints']);
	}

    public function endpoints()
	{
		register_rest_route('sht', '/menus', array(
			'methods' => 'GET',
			'permission_callback' => '__return_true',
			'callback' => function () {
				if (empty($nav_menus = wp_get_nav_menus())) {
					return new WP_REST_Response($nav_menus);
				}

				$response_data = [];

				foreach (array_values($nav_menus) as $values) {
					$response_data[] = [
						'slug' => $values->slug,
						'id' => $values->term_id,
						'title' => $values->name
					];
				}

				return new WP_REST_Response($response_data);
			},
		));
		
		register_rest_route('sht', '/menu-positions', array(
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
		));
	}

}
