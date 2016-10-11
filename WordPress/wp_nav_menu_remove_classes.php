<?php
//	remove class names current-page-ancestor and current-page-parent
//	from menus generated using wp_nav_menu. applies to all menus
//	on the current page
//	mhm 28.11.2012

add_filter('wp_nav_menu_items','remove_current_classes', 10, 4 );
function remove_current_classes($items, $args ) {
	return preg_replace('/current[_-]page[_-][ancestor|parent]/','',$items);
}