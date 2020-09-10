<?php

namespace SayHello\Theme\Package;

/**
 * Woocommerce manipulation
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class Woocommerce
{

	public function run()
	{
		add_action('after_setup_theme', [$this, 'addThemeSupport']);

		// Move a standard output action to a different template location
		remove_action('woocommerce_before_single_product_summary', 'woocommerce_show_product_sale_flash', 10);
		add_action('sht_woocommerce_single_product_sidebar', 'woocommerce_show_product_sale_flash', 10);

		add_filter('woocommerce_ajax_added_to_cart', [$this, 'redirectToCart'], 10);

	}

	public function addThemeSupport()
	{
		// Image sizes are at 200% for retina display
		add_theme_support('woocommerce', [
			'thumbnail_image_width' => 512,
			'gallery_thumbnail_image_width' => 256,
			'single_image_width' => 568,
		]);

		add_theme_support('wc-product-gallery-zoom');
		add_theme_support('wc-product-gallery-lightbox');
		add_theme_support('wc-product-gallery-slider');
	}

	public function redirectToCart()
	{
		wp_send_json([
			'error' => true,
			'product_url' => wc_get_cart_url()
		]);
		exit;
	}
}
