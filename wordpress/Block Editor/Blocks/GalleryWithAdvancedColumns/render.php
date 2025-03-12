<?php
if (empty($content ?? '')) {
	return;
}


?><div <?php echo get_block_wrapper_attributes(); ?>>
	<?php echo $content; ?>
</div>
