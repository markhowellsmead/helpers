<?php

namespace SayHello\Theme\Plugin;

/**
 * User Activity Log Plugin stuff
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class UserActivityLog
{
	public function __construct()
	{
		if (is_admin()) {
			// Block nag banner
			update_option('ual_promo_time', (0 - time()));
		}
	}

	public function run()
	{
		add_action('wp_dashboard_setup', [$this, 'removeWidgets'], 20);
	}

	public function removeWidgets()
	{
		remove_meta_box('wp_user_log_dashboard_widget', 'dashboard', 'normal');
	}
}
