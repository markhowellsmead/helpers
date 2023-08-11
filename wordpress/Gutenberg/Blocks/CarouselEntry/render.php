<?php

use SayHello\Theme\Controller\Block as BlockController;

$image_id = $attributes['imageId'] ?? false;

$title = $attributes['title'] ?? '';
$text = $attributes['text'] ?? '';

$block_controller = new BlockController();
$block_controller->extend($block);

$classNameBase = $block['sht']['classNameBase'];

?>

<div class="<?php echo $classNameBase; ?> swiper-slide">
	<?php if ($image_id ?? false) { ?>
		<figure class="<?php echo $classNameBase; ?>__figure">
			<?php

			$focalPoint_x = $attributes['focalPoint']['x'] * 100;
			$focalPoint_y = $attributes['focalPoint']['y'] * 100;

			echo wp_get_attachment_image(
				$image_id,
				'full',
				false,
				[
					'class' => $classNameBase . '__image',
					'style' => "object-position: {$focalPoint_x}% {$focalPoint_y}%;"
				]
			);
			?>
		</figure>
	<?php } else { ?>
		<div class="<?php echo $classNameBase; ?>__figure <?php echo $classNameBase; ?>__figure--empty alignfull"></div>
	<?php } ?>

	<div class="<?php echo $classNameBase; ?>__entry-content alignwide">
		<?php
		echo $content;
		?>
	</div>
</div>
