<?php

namespace MarkHowellsMead\Theme\Packages;

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
		add_filter('gform_countries', [$this, 'countries'], 10, 0);
	}
	
	/**
	 * Provide a custom list of available countries in a dropdown
	 * This example uses the shipping countries from WooCommerce.
	 *
	 * @return array	An array of countries for selection.
	 */
	public function countries()
	{
		$countries = [];
		foreach (array_values(WC()->countries->get_shipping_countries()) as $country) {
			$countries[] = $country;
		}

		return $countries;
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
