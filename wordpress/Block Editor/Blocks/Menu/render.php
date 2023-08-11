<?php

use SayHello\Theme\Controller\Block as BlockController;


if (empty($theme_location = $attributes['menu'] ?? '')) {
	if (sht_theme()->Package->Gutenberg->isContextEdit()) {
?>
		<div class="c-editormessage c-editormessage--error"><?php _ex('Bitte wählen Sie eine vordefinierte Navigation aus.', 'Navigation block editor message', 'sha'); ?></div>
<?php
	}
	return;
}

$block_controller = new BlockController;
$block_controller->extend($block);

$class_names = $block['sht']['class_names'];
$classNameBase = $block['sht']['classNameBase'];

?>
<div class="<?php echo $class_names; ?>">
	<?php
	$menu = wp_nav_menu(
		[
			'echo' => false,
			'theme_location' => $theme_location,
			'container' => 'nav',
			'container_class' => "{$classNameBase}__container {$classNameBase}__container--{$theme_location}",
			'menu_class' => "{$classNameBase}__menu {$classNameBase}__menu--{$theme_location} is-layout-flex",
		]
	);

	if (empty($menu) && sht_theme()->Package->Gutenberg->isContextEdit()) {
	?>
		<div class="c-editormessage c-editormessage--error"><?php _ex('Die ausgewählte Navigation is leer.', 'Navigation block editor message', 'sha'); ?></div>
	<?php
	}

	echo $menu;
	?>
</div>