<?php
/**
* Use the functions in this class individually as required. The class is not planned for use as a whole.
*
* @since 05.09.14 mhm
*/

class custom_filters_for_wordpress {

	static function media_filter_imageselection( $query = array() ) {
		/**
		* Restrict media selection in galleries to images which have the custom checkbox "is_gallery_image" set.
		* Implement using add_filter( 'ajax_query_attachments_args', 'media_filter_galleryimages', 10, 1 );
		*
		* @since 	5.9.2014
		*
		* @param 	array $query	Query parameters for attachment posts
		* @return 	array 			Revised query parameters
		*/
		
		if(isset($_POST['post_id']) && get_post_type($_POST['post_id']) == 'gallerie'){
			if(!is_array($query['meta_query'])){
				$query['meta_query'] = array();
			}
			
			$query['meta_query'][] = array(
				'key' => 'is_gallery_image',
				'value' => true,
				'compare' => '==='
			);
		}	
		return $query;
	}//media_filter_imageselection
	
}