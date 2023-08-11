<?php

use SayHello\Theme\Controller\Block as BlockController;

$block_controller = new BlockController();
$block_controller->extend($block);

$classNameBase = $block['sht']['classNameBase'];

?>

<div class="<?php echo $classNameBase; ?> alignfull">
	<div class="<?php echo $classNameBase; ?>__entries c-swiper c-swiper--pagination swiper">
		<div class="<?php echo $classNameBase; ?>__wrapper swiper-wrapper">
			<?php
			echo $content;
			?>
		</div>
		<div class="swiper-pagination"></div>
	</div>
</div>
