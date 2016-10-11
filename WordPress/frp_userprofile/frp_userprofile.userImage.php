<?php
add_action('admin_init', 'initUserImageMetaBox');

function initUserImageMetaBox(){
	add_action( 'show_user_profile', 'UserImageMetaBox', 10 );
	add_action( 'edit_user_profile', 'UserImageMetaBox', 10 );

	if (!empty($_REQUEST['post_id'])) return;

	if ($_REQUEST['action']=='plupload_image_upload'){
		$_GET['action'] = 'plupload_image_upload';
		add_action( 'wp_ajax_plupload_image_upload', 'frp_handle_upload' );
	}
	elseif($_REQUEST['action']=='rwmb_reorder_images'){

		$_GET['action'] = 'rwmb_reorder_images';
		add_action( 'wp_ajax_rwmb_reorder_images', 'frp_reorder_images' );

	}elseif($_REQUEST['action']=='rwmb_delete_file'){

		$_GET['action'] = 'rwmb_delete_file';
		add_action( 'wp_ajax_rwmb_delete_file','frp_delete_file' );

	}else{
		session_start();
		$_SESSION['user_id'] = $_GET['user_id'];
	}

}//initUserImageMetaBox


function UserImageMetaBox($user){
	global $wpdb;
	require_once(trailingslashit(WP_PLUGIN_DIR).'meta-box/meta-box.php');

	$config = array(
	    'id' => 'userimages',			// meta box id, unique per meta box
	    'title' => 'Demo Meta Box',		// meta box title
	    'pages' => array(),				// post types, accept custom post types as well, default is array('post'); optional
	    'context' => 'normal',			// where the meta box appear: normal (default), advanced, side; optional
	    'priority' => 'high',			// order of meta box: high (default), low; optional
	    'fields' => array(
	    	array(
				'name'	=> __('User profile image/s'),
				'desc'	=> __('List view, detail view'),//'vlnr.: Listenansicht, Detailansicht (Tipp: Drag+Drop)',
				'id'	=> "{$prefix}userimages",
				'type'	=> 'plupload_image',
				'max_file_uploads' => 2,
			)
		),
	    'local_images' => false,		// Use local or hosted images (meta box images for add/remove)
	    'use_with_theme' => false		//change path if used with theme set to true, false for a plugin or anything else for a custom path(default false).
	);

	$my_meta = new RW_Meta_Box($config);

	wp_nonce_field( "rwmb-save-{hans}", "nonce_{hans}" );

	$class = RW_Meta_Box::get_class_name("plupload_image");
	// Add additional actions for fields
	if ( method_exists( $class, 'add_actions' ) )call_user_func( array( $class, 'add_actions' ) );
	if ( method_exists( $class, 'admin_enqueue_scripts' ) )call_user_func( array( $class, 'admin_enqueue_scripts' ) );

	$metas = $wpdb->get_results("SELECT `ID` FROM ".$wpdb->posts.",".$wpdb->postmeta." WHERE ".$wpdb->posts.".ID = ".$wpdb->postmeta.".post_id && ".$wpdb->postmeta.".meta_key = 'user' && ".$wpdb->postmeta.".meta_value = '".$user->ID."' ORDER BY ".$wpdb->posts.".menu_order, ".$wpdb->posts.".ID asc" );

	foreach($metas as $data) $meta[]=$data->ID;

	$html = RW_Meta_Box::apply_field_class_filters( $config["fields"][0], 'begin_html', '', $meta );
	$html .= RW_Meta_Box::apply_field_class_filters( $config["fields"][0], 'html', '', $meta );
	$html .= RW_Meta_Box::apply_field_class_filters( $config["fields"][0], 'end_html', '', $meta );

	echo $html;
}//UserImageMetaBox


function frp_handle_upload(){
	session_start();
	check_admin_referer( 'rwmb-upload-images_' . $_REQUEST['field_id'] );
	// You can use WP's wp_handle_upload() function:
	$file       = $_FILES['async-upload'];
	$file_attr  = wp_handle_upload( $file, array(
		'test_form'=> true,
		'action'   => 'plupload_image_upload'
	) );
	$attachment = array(
		'guid'           => $file_attr['url'],
		'post_mime_type' => $file_attr['type'],
		'post_title'     => preg_replace( '/\.[^.]+$/', '', basename( $file['name'] ) ),
		'post_content'   => '',
		'post_status'    => 'inherit'
	);

	// Adds file as attachment to WordPress
	$id = wp_insert_attachment( $attachment, $file_attr['file'], $post_id );
	if ( ! is_wp_error( $id ) )	{
		$response = new WP_Ajax_Response();
		wp_update_attachment_metadata( $id, wp_generate_attachment_metadata( $id, $file_attr['file'] ) );

		add_post_meta( $id, 'user',$_SESSION['user_id'], false );

		$response->add( array(
			'what' => 'rwmb_image_response',
			'data' => RWMB_Plupload_Image_Field::img_html( $id )
		) );
		$response->send();
	}
	exit;
}//frp_handle_upload


function frp_reorder_images(){
	$order    = isset( $_POST['order'] ) ? $_POST['order'] : 0;
	parse_str( $order, $items );
	$items = $items['item'];
	$order = 1;
	foreach ( $items as $item ){
		wp_update_post( array(
			'ID'          => $item,
			'menu_order'  => $order ++
		));
	}
	RW_Meta_Box::ajax_response( __( 'Order saved', 'rwmb' ), 'success' );
}//frp_reorder_images


function frp_delete_file(){
	$attachment_id = isset( $_POST['attachment_id'] ) ? intval( $_POST['attachment_id'] ) : 0;
	$ok = wp_delete_attachment( $attachment_id );
	if ( $ok )
		RW_Meta_Box::ajax_response( '', 'success' );
	else
		RW_Meta_Box::ajax_response( __( "Error: Cannot delete file", 'rwmb' ), 'error' );
}