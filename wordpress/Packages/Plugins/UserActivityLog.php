<?php

namespace SayHello\Theme\Package\Plugins;

/**
 * User Activity Log Plugin stuff
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class UserActivityLog
{
	public function run()
	{
		if (is_admin()) {
			// Block nag banner from User Activity Log
			update_option('ual_promo_time', (0 - time()));
		}
	}
}
