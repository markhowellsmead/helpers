<?php

namespace SayHello\Theme\Package;

/**
* Configuration etc. for Gutenberg
*
* @author Mark Howells-Mead <mark@sayhello.ch>
*/
class Gutenberg
{

	public function run()
	{
		add_action('after_setup_theme', [$this, 'themeSupports']);

		add_filter('allowed_block_types', [$this, 'allowedBlockTypes'], 10, 2);
		
		add_filter('gutenberg_can_edit_post_type', [ $this, 'maybeDisableGutenberg' ], 10, 2);
		add_filter('use_block_editor_for_post_type', [ $this, 'maybeDisableGutenberg' ], 10, 2);
		
		add_action('wp_enqueue_scripts', [$this, 'assets']);

	}
	
	public function allowedBlockTypes($allowed_blocks, $post)
	{
		$allowed_blocks = array(
			'core/heading',
			'core/image',
			'core/list',
			'core/media-text',
			'core/paragraph',
			'core/video',
			'atomic-blocks/ab-accordion'
		);
 
		if ($post->post_type === 'page') {
			$allowed_blocks[] = 'core/shortcode';
		}
 
		return $allowed_blocks;
	}
	
	public function assets()
	{
		// Deregister a style which is delivered by a plugin
		wp_deregister_style('atomic-blocks-fontawesome');
	}

	public function maybeDisableGutenberg($can_edit, $post_type)
	{
		// Disable Gutenberg for Page Builder template
		// Make sure that $can_edit isn't already set to false
		if ($can_edit && basename(get_page_template()) === 'template-pagebuilder.php') {
			return false;
		}

		return $can_edit;
	}
	
	public function themeSupports()
	{
		// Allow colour picker
		add_theme_support('editor-color-palette');
		
		// Disable rainbow picker
		add_theme_support('disable-custom-colors');

		// Allow custom admin CSS in the editor
		add_theme_support('editor-styles');
		add_editor_style('assets/styles/admin/gutenberg.css');
	}

}
