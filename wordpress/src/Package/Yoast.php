<?php

namespace MarkHowellsMead\Theme\Package;

/**
 * Customization for the Yoast SEO plugin for Wordpress
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 * @version 1.0
 */
class Yoast
{

	/**
	 * Hooks the admin_init action and the wpseo_manage_options filter.
	 *
	 * @return void
	 */
	public function run()
	{
		add_action('admin_init', [$this, 'addYoastCap']);
		add_filter('wpseo_manage_options', [$this, 'defineYoastCap']);
		add_filter('wpseo_metabox_prio', [$this, 'lowerYoastMetaboxPriority'], 10);
	}

	/**
	 * Adds the defined YOAST cap to the administrator Role.
	 *
	 * @return void;
	 */
	public function addYoastCap()
	{
		$role = get_role('administrator');
		$role->add_cap('wpseo_manage_options');
	}

	/**
	 * Defines the YOAST capability name.
	 *
	 * @return string YOAST capability
	 */
	public function defineYoastCap()
	{
		return 'wpseo_manage_options';
	}

	/**
	 * Lowers the YOAST Metabox priority, thus it wont be on the upper part of the editor.
	 *
	 * @return String   Priority of the YOAST Metabox
	 */
	public function lowerYoastMetaboxPriority()
	{
		return 'low';
	}
}
