<?php
//	add following code snippets to functions.php 


//	wrap oEmbeds with a div
//	http://codex.wordpress.org/Embeds
	function oembed_wrap($html, $url, $attr) {
		$class = '';
		$url = parse_url($url);
		switch($url['host']){
			case 'www.flickr.com':
			case 'flickr.com':
				$class=' flickr';
			break;
			case 'www.youtube.com':
			case 'youtube.com':
				$class=' youtube';
			break;
			case 'www.vimeo.com':
			case 'vimeo.com':
				$class=' vimeo';
			break;
		}
		return '<div class="oembed'.$class.'"> '.$html.'</div>';
	}
	add_filter('embed_oembed_html', 'oembed_wrap', 10, 3);


//	adjust excerpt length in list view
	function my_excerpt_length($text){
		return 42;
	}
	add_filter('excerpt_length', 'my_excerpt_length');


/*	add class names to body tag
	use <body <?php body_class();?>>
*/
	function add_bodyclasses(){
		$classnames = array('add','these','values');
		return $classnames;
	}
	add_filter('body_class','add_bodyclasses');


//	remove image dimensions from IMG tags
	function remove_thumbnail_dimensions( $html ) {
	    $html = preg_replace( '/(width|height)=\"\d*\"\s/',"",$html);
	    return $html;
	}
	add_filter( 'the_content', 'remove_thumbnail_dimensions', 10 );
	add_filter( 'post_thumbnail_html', 'remove_thumbnail_dimensions', 10 );
	add_filter( 'image_send_to_editor', 'remove_thumbnail_dimensions', 10 );
