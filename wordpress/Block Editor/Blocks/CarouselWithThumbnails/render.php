<?php

namespace SayHello\Theme\Blocks\CustomerQuote;

use SayHello\Theme\Controller\Block as BlockController;

$images = $attributes['images'] ?? [];

if (empty($images)) {
	return;
}

$block_controller = new BlockController;
$block_controller->extend($block);

$classNameBase = $block['sht']['classNameBase'];

wp_enqueue_script('swiperjs');

$blockScript = '/src/Blocks/Carousel/dist/scripts/view.js';
wp_enqueue_script('sht-carousel-gsap', get_template_directory_uri() . $blockScript, ['swiperjs'], filemtime(get_template_directory() . $blockScript), true);

$slides = [];
$thumbnails = [];
foreach ($images as $image_id) {
	$image = wp_get_attachment_image($image_id, 'large', false, ['class' => "{$classNameBase}__image c-swiper__image"]);
	if (!empty($image)) {
		$slides[] = $image;
		$thumbnails[] = wp_get_attachment_image($image_id, 'thumbnail', false, ['class' => "{$classNameBase}__thumbnail c-swiper__thumbnail"]);
	}
}

?>

<div class="<?php echo $block['sht']['class_names']; ?> c-swiper" id="block-<?php echo $attributes['blockId']; ?>">

	<div class="swiper-main-wrapper">
		<div class="<?php echo $classNameBase; ?>__swiper swiper-container swiper-main" id="swiper-<?php echo $attributes['blockId']; ?>">
			<div class="<?php echo $classNameBase; ?>__swiper-wrapper swiper-wrapper">
				<?php foreach ($images as $image_id) { ?>
					<div class="<?php echo $classNameBase; ?>__swiper-slide swiper-slide">
						<?php
						$image = wp_get_attachment_image($image_id, 'large', false, ['class' => "{$classNameBase}__image swiper-image"]);
						$image_meta = wp_get_attachment_metadata($image_id);
						$aspect_class = $image_meta['width'] <= $image_meta['height'] ? 'is--portrait' : 'is--landscape';
						if (!empty($image)) {
						?>
							<figure class="<?php echo $classNameBase; ?>__figure swiper-figure <?php echo $aspect_class; ?>">
								<?php echo $image; ?>
							</figure>
						<?php
						}
						?>
					</div>
				<?php } ?>
			</div>

			<div class="<?php echo $classNameBase; ?>__buttons swiper-buttons">
				<div class="swiper-button-prev swiper-button-prev-block-<?php echo $attributes['blockId']; ?>"></div>
				<div class="swiper-button-next swiper-button-next-block-<?php echo $attributes['blockId']; ?>"></div>
			</div>
		</div>
	</div>

	<div class="swiper-container swiper-thumbs-pagination">
		<div class="swiper-wrapper">
			<?php
			$thumbnail_count = 0;
			foreach ($thumbnails as $thumbnail) { ?>
				<div class="swiper-slide"><?php echo $thumbnail; ?></div>
			<?php } ?>
		</div>
	</div>

</div>
