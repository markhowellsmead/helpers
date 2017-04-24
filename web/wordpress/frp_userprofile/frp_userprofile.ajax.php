<?php
//	http://www.andrewmpeters.com/blog/how-to-make-jquery-ajax-json-requests-in-wordpress/
//	mhm 18.7.2012

//	http://domain/wp-admin/admin-ajax.php?action=frp_userprofile&name=maria
//	http://domain/wp-admin/admin-ajax.php?action=frp_userprofile&team=frappant
//	http://domain/wp-admin/admin-ajax.php?action=frp_userprofile&team=frappant&image_size=user-compact

include_once('frp_userprofile.class');

function clean_user_data(&$userdata){
	unset($userdata->user_login);
	unset($userdata->user_pass);
	unset($userdata->user_activation_key);
	unset($userdata->user_status);
	unset($userdata->spam);
	unset($userdata->deleted);
	unset($userdata->rich_editing);
	unset($userdata->comment_shortcuts);
	unset($userdata->admin_color);
	unset($userdata->use_ssl);
	unset($userdata->show_admin_bar_front);
	unset($userdata->wp_capabilities);
	unset($userdata->wp_user_level);
	unset($userdata->wp_dashboard_quick_press_last_post_id);
	unset($userdata->primary_blog);
	unset($userdata->source_domain);
	unset($userdata->wp_capabilities);
	unset($userdata->wp_user_level);
	unset($userdata->dismissed_wp_pointers);
	unset($userdata->wpseo_title);
	unset($userdata->wpseo_metadesc);
	unset($userdata->wpseo_metakey);
	unset($userdata->additional_urls);
}

function ajax_get_team($dataIn){

	$status = 404;
	$data = array();

	$frp_userprofile = new frp_userprofile();

	$protocol = ((!empty($_SERVER['HTTPS']) && strtolower($_SERVER['HTTPS']) !== 'off') || $_SERVER['SERVER_PORT'] == 443) ? 'https' : 'http';

	if(isset($_REQUEST['name']) && ($_REQUEST['name']!='')){
	
		$frp_userprofile->atts['userid'] = $_REQUEST['name'];
		$frp_userprofile->get_userdata_single();

		$image_size = isset($_REQUEST['image_size']) && $_REQUEST['image_size']!='' ? $_REQUEST['image_size'] : 'dyn';

		if($frp_userprofile->userdata){
			$upload_dir = wp_upload_dir();

			if($frp_userprofile->userdata->userphoto_image_file!=''){
				$frp_userprofile->userdata->userphoto_image_file = $protocol.'://'.$_SERVER['HTTP_HOST'].'/media/' .$image_size. '/userphoto/'. $frp_userprofile->userdata->userphoto_image_file;

				if($frp_userprofile->userdata->userphoto_thumb_file!=''){
					// use larger image, which will be resized using the dynamic image handler script
					$frp_userprofile->userdata->userphoto_thumb_file = $protocol.'://'.$_SERVER['HTTP_HOST'].'/media/' .$image_size. '/userphoto/'. $frp_userprofile->userdata->userphoto_image_file;
				}

			}

			if(count($frp_userprofile->userdata->data->attachments)>0){
				foreach($frp_userprofile->userdata->data->attachments as &$attachment){
					$attachment->guid = $protocol.'://'.$_SERVER['HTTP_HOST'].preg_replace('/\/dyn\//','/'.$image_size.'/',$attachment->guid);	
					//$attachment->guid = $protocol.'://'.$_SERVER['HTTP_HOST'].$attachment->guid;
				}
			}

			clean_user_data($frp_userprofile->userdata->data);

			$status = 200;
			$data = $frp_userprofile->userdata;
		}

	}elseif(isset($_REQUEST['team']) && ($_REQUEST['team']!='')){
		// teamansicht
	    $team_members = $frp_userprofile->db_users_by_team($_REQUEST['team']);
	    foreach($team_members as $key => $team_member_data){
	    
		    $frp_userprofile->userdata = $team_member_data;

			$frp_userprofile->get_team();
			$frp_userprofile->get_attachments();

			$image_size = isset($_REQUEST['image_size']) && $_REQUEST['image_size']!='' ? $_REQUEST['image_size'] : 'dyn';

			if($frp_userprofile->userdata->userphoto_image_file!=''){
				$frp_userprofile->userdata->userphoto_image_file = $protocol.'://'.$_SERVER['HTTP_HOST'].'/media/' .$image_size. '/userphoto/'. $frp_userprofile->userdata->userphoto_image_file;
			}

			if(count($frp_userprofile->userdata->data->attachments)>0){
				foreach($frp_userprofile->userdata->data->attachments as &$attachment){
					$attachment->guid = $protocol.'://'.$_SERVER['HTTP_HOST'].$attachment->guid;
					if($image_size!='dyn'){
						$attachment->guid = preg_replace('/\/dyn\//','/'.$image_size.'/',$attachment->guid);	
					}
				}
			}
		    clean_user_data($team_member_data->data);
	    }
	    
	    $frp_userprofile->reindex_team_members($team_members,$_REQUEST['team']); // sort by manager, then by surname

	    $data = $team_members;
		$status = 200;
	}
	
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	header('Content-type: application/json');

	die(json_encode(array(
		'status' => $status,
		'data' => $data
	)));

	
}

add_action('wp_ajax_nopriv_frp_userprofile', 'ajax_get_team');
add_action('wp_ajax_frp_userprofile', 'ajax_get_team');