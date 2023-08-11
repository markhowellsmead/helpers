<?php

use SayHello\Theme\Package\Lazysizes;

if (empty($images = get_field('images'))) {
	if ($args['is_context_edit'] ?? false) {
?>
		<section class="c-message c-message--danger wp-block-sht-imagegallery wp-block-sht-imagegallery--empty <?php echo !empty($args['align']) ? ' align' . $args['align'] : ''; ?>">
			<p class=""><strong><?php echo $args['title']; ?></strong>: <?php _ex('Keine Bilder ausgewählt', 'Editor block message', 'sha'); ?></p>
		</section>
<?php
	}
	return;
}

$target_height = 300;
$image_size = 'medium';

if ((get_field('image_size') ?? '') === 'small') {
	$target_height = 200;
	$image_size = 'thumbnail';
}

$align = $args['align'];
if (!empty($args['align'])) {
	$align = 'align' . $args['align'];
}

$unique = uniqid();

?>

<!-- Grid layout origin: https://github.com/xieranmaya/blog/issues/6 #wowza -->
<section class="wp-block-sht-imagegallery <?php echo $align; ?>">
	<div class="wp-block-sht-imagegallery__images c-grid500">
		<div class="c-grid500__inner">
			<?php foreach ($images as $image) {
				$source_image_size = ($image['sizes'][$image_size] ?? null) ? $image_size : 'large';
				$width = $image['sizes'][$source_image_size . '-width'] ?? $image['width'];
				$height = $image['sizes'][$source_image_size . '-height'] ?? $image['height'];

				if ($width < 100 || $height < 100) {
					$file_path = get_attached_file($image['ID']);
					$file_dims = getimagesize($file_path);
					$width = $file_dims[0];
					$height = $file_dims[1];
				}

				$flex_grow = $width * 100 / $height;
				$flex_basis = $width * $target_height / $height;
				$padding_bottom = ($height / $width) * 100;
				$href = $args['is_context_edit'] ?? false ? '#' : $image['sizes']['full'] ?? $image['sizes']['gutenberg_wide'];
			?>
				<div class="wp-block-sht-imagegallery__entry c-grid500__item" style="flex-grow:<?php echo $flex_grow; ?>;flex-basis:<?php echo $flex_basis; ?>px;">

					<?php
					if ($args['is_context_edit'] ?? false) {
					?>
						<span class="c-grid500__itemlink">
							<i class="c-grid500__uncollapse" style="padding-bottom:<?php echo $padding_bottom; ?>%"></i>
							<?php
							$image = wp_get_attachment_image($image['ID'], $source_image_size, false, ['class' => 'c-grid500__image']);
							if (!empty($image)) {
								$image = '<figure class="c-grid500__figure">' . $image . '</figure>';
							}
							echo $image;
							?>
						</span>
					<?php } else { ?>
						<a class="c-grid500__itemlink" href="<?php echo $href; ?>" _data-fancybox="gallery-<?php echo $unique; ?>" _data-caption="<?php echo $image['caption'] ?? $image['title']; ?>">
							<i class="c-grid500__uncollapse" style="padding-bottom:<?php echo $padding_bottom; ?>%"></i>
							<?php
							echo Lazysizes::getLazyImage($image['ID'], $source_image_size, 'c-grid500__figure', 'c-grid500__image');
							?>
						</a>
					<?php
					} ?>
				</div>
			<?php } ?>
		</div>
	</div>
</section>
