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
		add_filter('gutenberg_can_edit_post_type', [ $this, 'maybeDisableGutenberg' ], 10, 2);
		add_filter('use_block_editor_for_post_type', [ $this, 'maybeDisableGutenberg' ], 10, 2);
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

}
