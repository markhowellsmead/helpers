<?php

namespace SayHello\MustUsePlugin\Blocks\LeadWithButtons;

use SayHello\MustUsePlugin\Controller\Block as BlockController;

if (empty($content)) {
	return;
}

$block_controller = new BlockController();
$block_controller->extend($block);

$classNameBase = $block['shp']['classNameBase'] ?? '';

$text = $attributes['text'] ?? '';
?>

<div class="<?php echo $block['shp']['class_names']; ?>">
	<div class="<?php echo $classNameBase; ?>__inner">
		<?php if (!empty($text)) { ?>
			<div class="<?php echo $classNameBase; ?>__text">
				<?php echo esc_html($text); ?>
			</div>
		<?php } ?>

		<?php echo $content; ?>
	</div>
</div>
