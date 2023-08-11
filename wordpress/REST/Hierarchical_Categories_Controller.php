<?php

/**
 * Register custom WordPress REST API endpoint of categories
 * an a hierarchical structure. The use of children[] allows
 * the data to be used by the Gutenberg <TreeSelect /> Component.
 *
 * Initialise using the rest_api_init hook.
 * $hierarchical_categories_controller = new Hierarchical_Categories_Controller();
 * $hierarchical_categories_controller->register_routes();
 *
 * mark@sayhello.ch January 2023
 *
 * Ref 1: https://www.sitepoint.com/creating-custom-endpoints-for-the-wordpress-rest-api/
 * Ref 2: https://tektriks.com/how-to-get-wordpress-categories-and-subcategories-as-a-multi-dimentional-array/
 */  

namespace SayHello\Theme\REST;

use WP_REST_Controller;
use WP_REST_Response;

class Hierarchical_Categories_Controller extends WP_REST_Controller
{
	public function register_routes()
	{
		$namespace = 'sht/v1';
		$path = 'categories-hierarchical';

		register_rest_route($namespace, '/' . $path, [
			[
				'methods' => 'GET',
				'callback' => [$this, 'get_items'],
				'permission_callback' => [$this, 'get_items_permissions_check']
			]
		]);
	}

	public function get_items_permissions_check($request)
	{
		return true;
	}

	public function get_items($request)
	{

		$entries = $this->getTaxonomyHierarchy('category');

		return new WP_REST_Response($entries, 200);
	}

	/**
	 * Recursively get taxonomy and its children
	 *
	 * @param string $taxonomy
	 * @param int $parent - parent term id
	 * @return array
	 */
	public function getTaxonomyHierarchy($taxonomy, $parent = 0)
	{
		// only 1 taxonomy
		$taxonomy = is_array($taxonomy) ? array_shift($taxonomy) : $taxonomy;

		// get all direct decendants of the $parent
		$terms = get_terms($taxonomy, array('parent' => $parent, 'hide_empty' => 0));

		// prepare a new array.  these are the children of $parent
		// we'll ultimately copy all the $terms into this new array, but only after they
		// find their own children
		$children = [];

		// go through all the direct decendants of $parent, and gather their children
		foreach ($terms as $term) {

			// recurse to get the direct decendants of "this" term
			$term->children = $this->getTaxonomyHierarchy($taxonomy, $term->term_id);

			// add the term to our new array
			$children[$term->term_id] = $term;
		}

		// send the results back to the caller
		return $children;
	}
}
