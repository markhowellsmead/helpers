<?php
namespace Cubetech\Theme\Packages;

/**
 * General Widget stuff
 *
 * @author Mark Howells-Mead <mark@cubetech.ch>
 * @version 1.0
 */
class Widgets
{
	/**
	 * Hooks the actions
	 *
	 * @return void
	 */
	public function run()
	{
		add_action('widgets_init', [$this, 'unregisterWidgets'], 11);
	}

	public function unregisterWidgets()
	{
		unregister_widget('WP_Widget_Pages');
		unregister_widget('WP_Widget_Calendar');
		unregister_widget('WP_Widget_Archives');
		unregister_widget('WP_Widget_Custom_HTML');
		unregister_widget('WP_Widget_Links');
		unregister_widget('WP_Widget_Media_Audio');
		unregister_widget('WP_Widget_Media_Image');
		unregister_widget('WP_Widget_Media_Gallery');
		unregister_widget('WP_Widget_Media_Video');
		unregister_widget('WP_Widget_Meta');
		unregister_widget('WP_Widget_Search');
		// unregister_widget('WP_Widget_Text');
		unregister_widget('WP_Widget_Categories');
		unregister_widget('WP_Widget_Recent_Posts');
		unregister_widget('WP_Widget_Recent_Comments');
		unregister_widget('WP_Widget_RSS');
		unregister_widget('WP_Widget_Tag_Cloud');
		// unregister_widget('WP_Nav_Menu_Widget');
	}
}
