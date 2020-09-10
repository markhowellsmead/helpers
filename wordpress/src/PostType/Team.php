<?php

namespace SayHello\Theme\PostType;

use Timber\Timber;
use Timber\Post as TimberPost;

/**
 * Stuff for team members
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class Team
{

	public function run()
	{
		add_action('init', [$this, 'registerPostType']);
		add_action('init', [$this, 'addCapabilities']);
		add_action('acf/init', [$this, 'registerBlocks']);
	}

	/**
	 * Registers the custom post type
	 * @return void
	 */
	public function registerPostType()
	{
		register_post_type(
			'sht_teammember',
			[
				'can_export' => false,
				'capabilities'	=> [
					'read' => 'read_sht_teammember',
					'edit_post' => 'edit_sht_teammember',
					'read_post' => 'read_sht_teammember',
					'delete_post' => 'delete_sht_teammember',
					'edit_posts' => 'edit_sht_teammembers',
					'edit_others_posts' => 'edit_others_sht_teammembers',
					'publish_posts' => 'publish_sht_teammembers',
					'read_private_posts' => 'read_private_sht_teammembers',
					'delete_posts' => 'delete_sht_teammembers',
					'delete_private_posts' => 'delete_private_sht_teammembers',
					'delete_published_posts' => 'delete_published_sht_teammembers',
					'delete_others_posts' => 'delete_others_sht_teammembers',
					'edit_private_posts' => 'edit_private_sht_teammembers',
					'edit_published_posts' => 'edit_published_sht_teammembers',
				],
				'has_archive' => false,
				'map_meta_cap' => false,
				'menu_icon' => 'dashicons-groups',
				'public' => true,
				'show_in_admin_bar' => true,
				'show_in_nav_menus' => false,
				'show_in_rest' => true,
				'show_ui' => true,
				'menu_position' => 7,
				'rewrite' => [
					'slug' => _x('team', 'URL slug for custom post type', 'sha')
				],
				'supports' => [
					'title',
					'editor',
					'thumbnail',
				],
				'labels' => [
					'name' => _x('Teammitglieder', 'CPT name', 'sht'),
					'singular_name' => _x('Teammitglied', 'CPT singular name', 'sht'),
					'add_new' => _x('Erstellen', 'CPT add_new', 'sht'),
					'add_new_item' => _x('Neues Teammitglied hinzufügen', 'cpt name', 'sht'),
					'edit_item' => _x('Teammitglied bearbeiten', 'cpt name', 'sht'),
					'new_item' => _x('Neues Teammitglied', 'cpt name', 'sht'),
					'view_item' => _x('Teammitglied anzeigen', 'cpt name', 'sht'),
					'view_items' => _x('Teammitglieder anzeigen', 'cpt name', 'sht'),
					'search_items' => _x('Teammitglieder durchsuchen', 'cpt name', 'sht'),
					'not_found' => _x('Keine Teammitglieder', 'cpt name', 'sht'),
					'not_found_in_trash' => _x('Keine Teammitglieder im Papierkorb', 'cpt name', 'sht'),
					'all_items' => _x('Alle Teammitglieder', 'cpt name', 'sht'),
					'archives' => _x('Archive', 'cpt name', 'sht'),
					'attributes' => _x('Attribute', 'cpt name', 'sht'),
					'name_admin_bar' => _x('Teammitglieder', 'Label for name admin bar', 'sht'),
				]
			]
		);
	}

	/**
	 * Add user capabilities
	 */
	public function addCapabilities()
	{
		$admin = get_role('administrator');
		$admin->remove_cap('edit_others_sht_teammembers');
		$admin->add_cap('edit_sht_teammember');
		$admin->add_cap('delete_sht_teammember');
		$admin->add_cap('read_sht_teammember');
		$admin->add_cap('publish_sht_teammember');
		$admin->add_cap('edit_sht_teammembers');
		$admin->add_cap('delete_sht_teammembers');
		$admin->add_cap('read_sht_teammembers');
		$admin->add_cap('publish_sht_teammembers');

		$editor = get_role('editor');
		$editor->add_cap('edit_sht_teammember');
		$editor->add_cap('delete_sht_teammember');
		$editor->add_cap('read_sht_teammember');
		$editor->add_cap('publish_sht_teammember');
		$editor->add_cap('edit_sht_teammembers');
		$editor->add_cap('delete_sht_teammembers');
		$editor->add_cap('read_sht_teammembers');
		$editor->add_cap('publish_sht_teammembers');
	}

	public function registerBlocks()
	{
		if (function_exists('acf_register_block_type')) {
			acf_register_block_type(array(
				'name' => 'sht/teamlist',
				'category' => 'sht/sayhello',
				'icon' => 'groups',
				'align' => 'full',
				'supports' => [
					'align' => [],
					'mode' => false,
				],
				'title' => _x('Team-Liste', 'Block title', 'sha'),
				'description' => __('Stellt eine Liste der Teammitglieder dar.', 'BLock description', 'sha'),
				'render_callback' => [$this, 'renderTeamList'],
			));
		}
	}

	public function renderTeamList($block, $content = '', $is_preview = false)
	{
		$context = Timber::get_context();
		$context['block'] = $block;
		$context['block']['is_edit_mode'] = $is_preview;
		$context['block']['data'] = get_fields($context['block']['id']);
		if (!empty($context['block']['data']['entries'] ?? null)) {
			foreach ($context['block']['data']['entries'] as &$entry) {
				$entry = new TimberPost($entry);
			}
			Timber::render('blocks/teamlist.twig', $context);
		}
	}
}
