<?php
class WORDPRESS_APP {
	/*
		Core functionality for WordPress theme development
		Some of the functions in this class are a work in progress!
		m@mhm.li 18.9.2013
	*/

	var $key = '';

	////////////////////////////////////////////////////////////

	function __construct(){
		$this->key = basename(plugin_dir_path( __FILE__ ));
		$this->template_path 	= get_template_directory();
		$this->template_uri 	= get_template_directory_uri();
	}//__construct

	////////////////////////////////////////////////////////////
	
	function extend($functionality){
		/*
			load additional class functionality on request
			looks for a file with the name e.g. class.youtube.php
			in the template root folder which must contain
			a class called eg YOUTUBE_APP (i.e. uppercased functionality
			suffixed by _APP)

			usage:

			if(!$this->extend('youtube')){
				return '';
			}else{
				$videoID = intval($_GET['videoID']);
				return $this->youtube->getVideoTitle($videoID);
			}
			
		*/
		$functionality=strtolower($functionality);
		if(!$this->$functionality){

			if(file_exists($this->template_path.'/class.' .$functionality. '.php')){
				require_once('class.' .$functionality. '.php');
				$classname = strtoupper($functionality).'_APP';
				$this->$functionality = new $classname();
			}
		}
		return (bool)$this->$functionality;
	}//extend

	////////////////////////////////////////////////////////////

	function dump($var,$die=false){
		echo '<pre>' .print_r($var,1). '</pre>';
		if($die){die();}
	}//dump

	////////////////////////////////////////////////////////////

	function get_post_meta($post_id, $key, $single, $filter = false, $fallback_id=0){
		/*
			standard function to get post meta value
			if value on $post_id isn't set or is
			empty, and $fallback_id is not 0, then 
			return the value from the fallback post 
			instead (even if it is empty).
		*/
		$meta_value = get_post_meta($post_id, $key, $single);
		if(empty($meta_value) && $fallback_id!=0){
			$meta_value = get_post_meta($fallback_id, $key, $single);
		}
		if($filter){
			$meta_value = apply_filters('the_content',$meta_value);
		}
		
		return $meta_value;
	}//get_post_meta

	////////////////////////////////////////////////////////////

	function strftime($format, $timestamp=0){
		/*
			add the ordinal suffix to the PHP strftime function
			eg 1st, 2nd, 3rd etc.
			usage: $date_string = strftime('%d%O ', $timestamp)
		*/
		$format = str_replace('%O', date('S', $timestamp), $format);    
		return strftime($format, $timestamp);
	}//strftime

	////////////////////////////////////////////////////////////

	function extend_postdata(&$post){
		/*
			extends $post with additional data for view
			e.g. class names, permalink etc
		*/
	
		$post->viewdata = array(
			'post_date' => get_the_time('j\<\s\u\p\>S\<\/\s\u\p> F Y'),
			'permalink' => get_permalink(),
			'css' 		=> array(
				'selectors'=>array()
			),
			'thumbnail'	=> array(
				'url'=>'',
				'mode'=>'',
				'html'=>''
			),
			'label_more'=> __('Read this post »',$this->key),
			'teaser' 	=> apply_filters('the_content',$this->get_post_meta($post->ID,'teaser',true)),
		);

		// "more" link label
		switch($post->post_type){
			case 'page':
				$post->viewdata['label_more'] = __('View page »',$this->key);
				break;

		}

		// CSS classes
		foreach((get_the_category()) as $category){
			$post->viewdata['css']['selectors'][] = strtolower(urlencode($category->cat_name));
		}


		// thumbnail
		if($this->get_post_meta($post->ID,'show_thumbnail',true)!='No'){
		
			if($flickr_id = $this->get_post_meta($post->ID,'flickr_id',true)){
				$post->viewdata['thumbnail']['url'] = apply_filters('the_content','[flickr id='.$flickr_id.' size=m link=0]');

			}else{
				$post->viewdata['thumbnail']['url'] = $this->getThumbnailURL(array(
					'ID'	=> $post->ID,
					'size'	=> 'thumbmed',
				));
			}

			if($post->viewdata['thumbnail']['url']!=''){
				$post->viewdata['thumbnail']['mode'] = 'image';
			}
		}

		if($post->viewdata['thumbnail']['url']!=''){
			switch($post->viewdata['thumbnail']['mode']){
				
				case 'video':
					break;
					
				default:
					$post->viewdata['thumbnail']['html'] = '<img src="' .$post->viewdata['thumbnail']['url']. '">';
					break;
				
				
			}

			$post->viewdata['css']['selectors'][] = $post->viewdata['mode'];
		}


		// teaser text
		if($post->viewdata['teaser']==''){
			if(is_search()){
				if($post->post_type!='page'){
					$post->viewdata['teaser'] = get_the_excerpt();
				}
			}else{
				$post->viewdata['teaser'] = apply_filters('the_content',$this->get_post_meta($post->ID,'summary',true));
				if($post->viewdata['teaser']==''){
					$post->viewdata['teaser'] = get_the_excerpt();
				}
			}
		}

		// clean up
		$post->viewdata['css']['selectors']=implode(' ',$post->viewdata['css']['selectors']);

	}//extend_postdata

	////////////////////////////////////////////////////////////

	public function getThumbnailURL($atts=array()){

		if(!isset($atts['ID'])){global $post;$atts['ID']=$post->ID;}
		if(!isset($atts['parentID'])){$atts['parentID']=$post->post_parent;}
		if(!isset($atts['size'])){$atts['size']='lead';}

		if(isset($atts['return']) && $atts['return']=='postimage'){
			// 2012-10-28
			$thumbnail_image=$this->get_post_meta($atts['ID'],"postimage",true);
			if($thumbnail_image!=''):
				$thumbnail_image='/media/'.$atts['size'].$thumbnail_image;
			endif;
			return $thumbnail_image;
		}

		$thumbnail_image = wp_get_attachment_image_src(get_post_thumbnail_id($atts['ID']),$atts['size']);
		$thumbnail_image = str_replace(
			'/post/',
			'/'.$atts['size'].'/',
			preg_replace(
				'#(-[0-9]+x[0-9]+)#',
				'',
				preg_replace('~/{2,}~','/',$thumbnail_image[0])
			)
		);

		if(($video_ref = $this->get_post_meta($atts['ID'],"video_ref",true))!=""){
			//	src für thumbnailbild von videodienst-webseite holen
			$thumbnail_image=$this->getVideoThumbnailSRC($video_ref);
		}

		if($thumbnail_image==''&&$atts['parentID']){
			$thumbnail_image = wp_get_attachment_image_src(get_post_thumbnail_id($atts['parentID']),$atts['size']);
			$thumbnail_image = str_replace('/post/','/'.$atts['size'].'/',$thumbnail_image[0]);
		}

		if($thumbnail_image==''){
			$thumbnail_image=$this->get_post_meta($atts['ID'],"postimage",true);
			if($thumbnail_image!=''){
				$thumbnail_image='/media/'.$atts['size'].$thumbnail_image;
			}
		}

		return $thumbnail_image;
	}

	////////////////////////////////////////////////////////////

	public function getVideoThumbnailSRC($source_url){
		/*
		*	@rev 				16.11.2012 13:28 mhm
		*	@param 	url			'http://www.youtube.com/watch?v=Cr2_Dn0e5nU'
		*	@return image src	'http://i.ytimg.com/vi/Cr2_Dn0e5nU/0.jpg'
		*	@ref 				http://code.google.com/apis/youtube/2.0/developers_guide_php.html#Understanding_Feeds_and_Entries
		*/

		if($source_url == ''){return '';}	//	angabe ohne url gibt leeres string zurück
		$atts=array('url' => $source_url);

		$aPath = parse_url($atts['url']);
		$aPath['host'] = str_replace('www.','',$aPath['host']);

		switch($aPath['host']){
			case ('youtube.com') :
			
				if(!$this->extend('youtube')){return '';}
				
				$atts['id'] = $this->youtube->getIDfromURL($atts['url']);

				if(!$atts['id']){
					return '';	//	wenn ID nicht verfügbar, gibt leeres string zurück
				}else{
					return 'http://i.ytimg.com/vi/'.$atts['id'].'/0.jpg';	//	gibt 1. thumbnail-bild-src zurück.
				}
				break;


			case ('vimeo.com') :

				$urlParts=explode('/',$atts['url']);
				$hash = @unserialize(@file_get_contents('http://vimeo.com/api/v2/video/'.$urlParts[3].'.php'));
				if($hash && $hash[0] && (isset($hash[0]['thumbnail_large']) && $hash[0]['thumbnail_large']!=='')){
					return $hash[0]['thumbnail_large'];
				}else{
					return '';
				}
				break;

			default:
				//	gibt leeres string zurück
				return '';
				break;	//	default
		}
	}	// getVideoThumbnailSRC

}// class