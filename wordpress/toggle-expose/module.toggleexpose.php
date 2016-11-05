<div class="mod row toggle-expose">

<?php
	function output_images($images, $size, $initially_visible = 0){
		function imagetag($image, $size, $n, $initially_visible){
			$prefix = '';
			$class = ' class="image"';
			$button = '';
			if($n > $initially_visible){
				$prefix = 'data-';
		    	$class = ' class="image is-hidden"';
    		}elseif($n === $initially_visible){
	    		$button = '<div class="button-holder"><button class="button button-primary toggle-expose">' .__('Show all images'). '</button></div>';
		    }
			return sprintf(
				'<figure %1$s %2$sstyle="background-image:url(\'%3$s\')"></figure>%4$s',
				$class,
				$prefix,
				wp_get_attachment_image_url( $image['id'], $size ),
				$button
			);
	    }

	    $n = 0;

		foreach($images as $image){
			echo imagetag($image, $size, ++$n, $initially_visible);
		}
	}
	
	$images = array_slice(get_sub_field('images'), 0, intval(get_option('posts_per_page')));
	output_images($images, 'post-thumbnail-full', 2);
	
?></div>
