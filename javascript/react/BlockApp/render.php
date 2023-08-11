<?php

namespace SayHello\Example\Blocks\OrderForm;

use SayHello\Example\Controller\Block as BlockController;

$block_controller = new BlockController;
$block_controller->extend($block);

$pluginKey = $block['shp']['pluginKey'];

$viewScript = '/src/Blocks/BlockApp/assets/dist/scripts/view.js';

wp_enqueue_script($pluginKey, shp_example_get_instance()->url . $viewScript, ['wp-element', 'wp-i18n'], filemtime(shp_example_get_instance()->dir . $viewScript), true);
wp_localize_script($pluginKey, 'shp_example_block_app', [
	'translations' => [
		'edit' => _x('Edit', 'Order list button text', 'shp_example'),
		'save' => _x('Save', 'Order list button text', 'shp_example'),
	],
	'links' => [
		'login' => get_permalink(get_option('options_page_login')),
	],
	'isLoggedIn' => (bool) is_user_logged_in(),
]);

wp_localize_script(
	$pluginKey,
	'wpApiSettings',
	[
		'root' => esc_url_raw(rest_url()),
		'nonce' => wp_create_nonce('wp_rest')
	]
);

?>
<div class="<?php echo $block['shp']['class_names']; ?>">
	<div data-example-block class="<?php echo $block['shp']['classNameDefault']; ?>__app" data-plugin-key="<?php echo $pluginKey; ?>"></div>
</div>
