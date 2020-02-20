<?php

namespace SayHello\Theme\Package;

/**
 * Snackbar stuff
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class Snackbar
{

	public function run()
	{
		// Prio. 20 to ensure default script already enqueued
		add_action('wp_enqueue_scripts', [ $this, 'assetData' ], 20, 0);
	}

	public function assetData()
	{

		$special_pages = sht_theme()->Package->Navigation->getSpecialPages();

		if (!empty($special_pages['profile'] ?? null)) {
			wp_localize_script(sht_theme()->prefix . '-script', 'sht_snackbar', [
				'links' => [
					'view_list' => get_permalink($special_pages['profile']->ID)
				],
				'text' => [
					'view_favourites' => _x('Merkliste anzeigen', 'Banner message link text', 'sht'),
					'favourite_added' => _x('Der Artikel wurde in Ihrer Merkliste gespeichert.', 'Banner message text', 'sht'),
					'favourite_removed' => _x('Der Artikel wurde aus Ihrer Merkliste entfernt.', 'Banner message text', 'sht')
				]
			]);
		}
	}
}
