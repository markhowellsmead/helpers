<?php

use SayHello\Theme\Package\Lazysizes;

if (empty($args['posts'])) {
	return;
}

if (!empty($align = $args['attributes']['align'] ?? '')) {
	$align = ' align'.$align;
}

?>

<section class="c-cardgrid c-cardgrid--four<?php echo $align;?>">
	<div class="c-cardgrid__inner">
		<header class="c-cardgrid__header">
			<h2 class="c-cardgrid__title"><?php _ex('Latest blog posts', 'News list default title', 'sht');?></h2>
		</header>
		<div class="c-cardgrid__entrieswrap">
			<ul class="c-cardgrid__entries">
				<?php foreach ($args['posts'] as $args_post) {
					if (has_post_thumbnail($args_post)) {
						$thumbnail = '<a class="c-cardgrid__figurelink" href="'.get_the_permalink($args_post->ID).'">'.Lazysizes::getLazyImage(get_post_thumbnail_id($args_post), 'card', 'c-cardgrid__figure', 'c-cardgrid__image').'</a>';
					} elseif (!empty($video_url = get_field('video_ref', $args_post->ID))) {
						$thumbnail = sht_theme()->Package->Media->getVideoThumbnail($video_url);
						if (!empty($thumbnail)) {
							$thumbnail = sprintf(
								'<a class="c-cardgrid__figurelink" href="%s"><figure class="c-cardgrid__figure"><img alt="%s" class="c-cardgrid__image" src="%s"></figure></a>',
								get_the_permalink($args_post->ID),
								get_the_title($args_post->ID),
								$thumbnail
							);
						}
					} else {
						$thumbnail = '<div class="c-cardgrid__figure c-cardgrid__figure--empty"></div>';
					}
					?>
					<li class="c-cardgrid__entry">
						<?php echo $thumbnail; ?>
						<h3 class="c-cardgrid__entrytitle">
							<a href="<?php the_permalink($args_post->ID);?>"><?php echo get_the_title($args_post->ID);?></a>
						</h3>
						<time class="c-cardgrid__entrydate" datetime="<?php echo get_the_date('c', $args_post->ID); ?>"><?php printf(_x('Published on %s', 'sht'), get_the_date('', $args_post->ID)); ?></time>
						<?php if (!empty($excerpt = get_the_excerpt($args_post->ID))) {?>
							<div class="c-cardgrid__excerpt">
								<?php echo $excerpt;?>
							</div>
							<?php
						}?>
						<div class="c-cardgrid__readmorewrap"><a class="c-cardgrid__readmore" href="<?php the_permalink($args_post->ID);?>"><?php _ex('Read more', 'Blog card read more text', 'sht');?></a></div>
					</li>
				<?php }?>
			</ul>
		</div>
	</div>
</section>
