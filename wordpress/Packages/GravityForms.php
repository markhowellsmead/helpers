<?php

namespace Cubetech\Theme\Packages;

/**
 * Configuration for Gravity Forms
 *
 * @author Mark Howells-Mead <mark@permanenttourist.ch>
 * @version 1.0
 */
class GravityForms
{
	public function run()
	{
		add_action('gform_enqueue_scripts_1', [$this, 'dequeueGravityFormsCSS'], 11);
		add_filter('gform_ajax_spinner_url', [$this, 'replaceGravityFormsSpinner'], 10);
	}

	public function dequeueGravityFormsCSS()
	{
		wp_dequeue_style('gforms_reset_css');
		wp_dequeue_style('gforms_datepicker_css');
		wp_dequeue_style('gforms_formsmain_css');
		wp_dequeue_style('gforms_ready_class_css');
		wp_dequeue_style('gforms_browsers_css');
	}

	/**
	 * Replaces ajax spinner of gravity forms
	 *
	 * @return void
	 */
	public function replaceGravityFormsSpinner()
	{
		return  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
	}
}
