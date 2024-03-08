<?php

use SayHello\ShpHotelAareMu\Controller\Block as BlockController;

if (empty($theme_location = $attributes['menu'] ?? '')) {
	return;
}

$mode = esc_html($attributes['mode'] ?? 'all');

$block_controller = new BlockController;
$block_controller->extend($block);

$class_names = $block['shp']['class_names'];
$classNameDefault = $block['shp']['classNameDefault'];

$class_names .= " {$classNameDefault}--mode-{$mode}";

?>
<div class="<?php echo $class_names; ?>">
	<?php
	wp_nav_menu(
		[
			'theme_location' => $theme_location,
			'container' => 'nav',
			'container_class' => "{$classNameDefault}__container {$classNameDefault}__container--{$theme_location} {$classNameDefault}__container--mode-{$mode}",
			'menu_class' => "{$classNameDefault}__menu {$classNameDefault}__menu--{$theme_location} {$classNameDefault}__menu--mode-{$mode}",
			'fallback_cb' => false,
			'depth' => $mode === 'top-level' ? 1 : 2,
		]
	);
	?>
</div>