<?php

$classNameBase = wp_get_block_default_classname($block->name);
$colourClass = '';

if (!empty($attributes['overlayColor'] ?? '')) {
	$colourClass = " has";
	//dump($attributes['overlayColor']);
}

?>

<div class="<?php echo $classNameBase; ?> alignfull is-layout-constrained">

	<?php if (get_post_thumbnail_id() ?? false) { ?>
		<figure class="<?php echo $classNameBase; ?>__figure alignfull">
			<?php
			echo wp_get_attachment_image(
				get_post_thumbnail_id(),
				'full',
				false,
				[
					'class' => $classNameBase . '__image'
				]
			);
			?>

			<?php if (!empty($attributes['overlayColor'] ?? '')) { ?>
				<span aria-hidden="true" class="<?php echo $classNameBase; ?>__background has-<?php echo $attributes['overlayColor']; ?>-background-color has-background-dim"></span>
			<?php } ?>

		</figure>
	<?php } else { ?>
		<div class="<?php echo $classNameBase; ?>__figure <?php echo $classNameBase; ?>__figure--empty alignfull"></div>
	<?php } ?>

	<div class="<?php echo $classNameBase; ?>__outer">
		<div class="<?php echo $classNameBase; ?>__inner">
			<h1 class="<?php echo $classNameBase; ?>__title"><?php echo get_the_title(); ?></h1>
		</div>
	</div>
</div>