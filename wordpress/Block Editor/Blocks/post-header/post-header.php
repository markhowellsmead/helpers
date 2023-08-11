<?php

$alignment = $data['attributes']['alignment'];
$title = get_the_title();
$excerpt = get_the_excerpt();

if (sht_theme()->Package->Gutenberg->isContextEdit()) {
	// Get the values passed in from the Editor and use them
	// for the preview, instead of the values from the database
	$title = $data['attributes']['post_title'];
	$excerpt = $data['attributes']['post_excerpt'];
}

?><section class="wp-block-sht-post-header has-text-align-<?php echo $alignment;?>">
	<div class="wp-block-sht-post-header__inner">
		<header class="wp-block-sht-post-header__header">
			<h1 class="wp-block-sht-post-header__title"><?php echo $title;?></h1>
		</header>
		<?php if (!empty($excerpt)) {?>
			<div class="wp-block-sht-post-header__excerpt"><?php echo $excerpt;?></div>
		<?php } elseif (sht_theme()->Package->Gutenberg->isContextEdit()) {?>
			<mark class="wp-block-sht-post-header__excerptempty"><?php _ex('Add an excerpt using the global "Excerpt" field. (Optional.)', 'Helptext', 'picard');?></mark>
		<?php }?>
	</div>
</section>
