<?php

/**
 * Add this code to the Navigation Package.
 * (Don't replace the whole file!)
 */

namespace SayHello\Theme\Package;

class Navigation
{
	public function run()
	{
		add_filter('wp_nav_menu_args', [$this, 'navMenuArgs'], 1, 1);
	}

	public function navMenuArgs($args)
	{
		$args['fallback_cb'] = false;

		$dropdown_classes = '';
		if ($args['theme_location'] == 'primary') {
			$dropdown_classes = ' c-dropdownmenu__entries c-dropdownmenu__entries--level1';
		}
		$args['menu_class'] = 'c-menu__entries c-menu__entries--'.$args['theme_location'].$dropdown_classes;
		return $args;
	}
}
