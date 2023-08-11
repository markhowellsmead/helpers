<?php

use SayHello\Theme\Package\Lazysizes;

if (empty($args['posts'])) {
	return;
}

if (!empty($align = $args['attributes']['align'] ?? '')) {
	$align = ' align'.$align;
}

?>

<section class="wp-block-sht-blog-cards<?php echo $align;?>">
	<div class="wp-block-sht-blog-cards__inner">
		<div class="wp-block-sht-blog-cards__entrieswrap">
			<ul class="wp-block-sht-blog-cards__entries">
				<?php foreach ($args['posts'] as $args_post) {
					if (has_post_thumbnail($args_post)) {
						$thumbnail = '<a class="wp-block-sht-blog-cards__figurelink" href="'.get_the_permalink($args_post->ID).'">'.Lazysizes::getLazyImage(get_post_thumbnail_id($args_post), 'thumbnail', 'wp-block-sht-blog-cards__figure', 'wp-block-sht-blog-cards__image').'</a>';
					} else {
						$thumbnail = '<div class="wp-block-sht-blog-cards__figure wp-block-sht-blog-cards__figure--empty"></div>';
					}
					?>
					<li class="wp-block-sht-blog-cards__entry">
						<?php echo $thumbnail; ?>
						<h3 class="wp-block-sht-blog-cards__entrytitle wp-block-sht-blog-cards__entrytitle">
							<a href="<?php the_permalink($args_post->ID);?>"><?php echo get_the_title($args_post->ID);?></a>
						</h3>
						<time class="wp-block-sht-blog-cards__entrydate" datetime="<?php echo get_the_date('c', $args_post->ID); ?>"><?php printf(_x('Published on %s', 'sht'), get_the_date(null, $args_post->ID)); ?></time>
						<?php if (!empty($excerpt = get_the_excerpt($args_post->ID))) {?>
							<div class="wp-block-sht-blog-cards__excerpt">
								<?php echo $excerpt;?>
							</div>
							<?php
						}?>
						<div class="wp-block-sht-blog-cards__readmorewrap"><a class="wp-block-sht-blog-cards__readmore" href="<?php the_permalink($args_post->ID);?>"><?php _ex('Read more', 'Blog card read more text', 'sht');?></a></div>
					</li>
				<?php }?>
			</ul>
		</div>
	</div>
</section>
