<?php

namespace SayHello\Theme\Widgets;

use Timber\Timber;

/**
 * Adds widget for link to sayhello.ch as site sponsor
 */
class SayHello extends \WP_Widget
{
	/**
	 * Register widget with WordPress.
	 */
	public function __construct()
	{
		parent::__construct(
			'sh_sayhello_widget',
			_x('Say Hello', 'UserMetaWidget title text', 'harris'),
			['description' => _x('Adds a link to sayhello.ch.', 'UserMetaWidget description text', 'harris')]
		);
	}
	public function run()
	{
		add_action('widgets_init', [$this, 'register_widget']);
	}
	
	/**
	 * Register widget
   */
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
		$context = Timber::get_context();
		$context['widget'] = [
			'image' => get_field('image', 'widget_' . $args['widget_id']),
			'text' => get_field('text', 'widget_' . $args['widget_id'])
		];
		Timber::render('widgets/sayhello.twig', $context);
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
