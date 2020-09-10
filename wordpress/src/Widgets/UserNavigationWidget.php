<?php

namespace MarkHowellsMead\Theme\Widgets;

use Timber\Timber;

/**
 * Adds widget for user navigation.
 * Extends the regular WP_Widget class and expects usage of the Advanced Custom Fields and Timber plugins.
 */
class UserNavigationWidget extends \WP_Widget
{
	/**
	 * Register widget with WordPress.
	 */
	public function __construct()
	{
		parent::__construct(
			'ct_usernavigation_widget',
			_x('Benutzernavigation', 'UserNavigationWidget title text', 'wptheme-flightregister'),
			array( 'description' => _x('Dieses Widget bildet die Navigation für angemeldete Benutzer ab.', 'UserNavigationWidget description text', 'wptheme-flightregister'), )
		);
	}
	public function run()
	{
		add_action('widgets_init', array($this, 'register_widget'));
	}
	
	//This widget can then be registered in the 'widgets_init' hook:
	// register Widget widget
	public function register_widget()
	{
		register_widget($this);
	}
	
	/**
	 * Front-end display of widget.
	 *
	 * @see WP_Widget::widget()
	 *
	 * @param array $args     Widget arguments.
	 * @param array $instance Saved values from database.
	 */
	public function widget($args, $instance)
	{
		$pages = get_field('pages', 'widget_' . $args['widget_id']);
		if (!empty($pages)) {
			$context = Timber::get_context();
			$context['pages'] = $pages;
			Timber::render('widgets/user-navigation.twig', $context);
		}
	}
	
	/**
	 * Back-end widget form.
	 *
	 * @see WP_Widget::form()
	 *
	 * @param array $instance Previously saved values from database.
	 */
	public function form($instance)
	{
	}
	
	/**
	 * Sanitize widget form values as they are saved.
	 *
	 * @see WP_Widget::update()
	 *
	 * @param array $new_instance Values just sent to be saved.
	 * @param array $old_instance Previously saved values from database.
	 *
	 * @return array Updated safe values to be saved.
	 */
	public function update($new_instance, $old_instance)
	{
		return $instance;
	}
}
