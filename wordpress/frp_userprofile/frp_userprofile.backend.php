<?php

///////////////////////////////////////////////////////////////////////////////////////////////////
//	add fields to backend user interface
///////////////////////////////////////////////////////////////////////////////////////////////////

//	Ref: http://justintadlock.com/archives/2009/09/10/adding-and-using-custom-user-profile-fields



add_action('admin_init', 'frp_profile_admin_page');
function frp_profile_admin_page(){

	//	edit
	add_action( 'show_user_profile', 'frp_profile_show_extra_profile_fields', 10 );
	add_action( 'edit_user_profile', 'frp_profile_show_extra_profile_fields', 10 );

	//	save
	add_action( 'personal_options_update', 'frp_profile_save_extra_profile_fields' );
	add_action( 'edit_user_profile_update', 'frp_profile_save_extra_profile_fields' );
}//frp_profile_admin_page

function frp_profile_show_extra_profile_fields( $user ) {

	global $cms;

	$user_teams = explode(',',get_the_author_meta('team', $user->ID));
	$user_managerroles = explode(',',get_the_author_meta('manager', $user->ID));

	echo '<h3>'.__('Extra profile information',THEME).'</h3>
		<table class="form-table">
		<tr>
			<th><label for="telephone">' .__('Telephone',THEME). '</label></th>
			<td>
				<input type="text" name="telephone" value="' .esc_attr(get_the_author_meta( 'tel', $user->ID )).'" class="regular-text" /><br>
			</td>
		</tr>
		<tr>
			<th><label for="job_title">' .__('Job title',THEME). '</label></th>
			<td>
				<input type="text" name="job_title" value="' .esc_attr(get_the_author_meta( 'job_title', $user->ID )).'" class="regular-text" /><br>
			</td>
		</tr>
		<tr>
			<th><label for="org">' .__('Organisation (TEMP)',THEME). '</label></th>
			<td>
				<input type="text" name="org" value="' .esc_attr(get_the_author_meta( 'org', $user->ID )).'" class="regular-text" /><br>
			</td>
		</tr>
		<tr>
			<th><label for="team">' .__('Team',THEME). '</label></th>
			<td>';
			foreach($cms->departments as $team => $teamAtts):
				$checked = in_array($team,$user_teams)?'checked="checked"':'';
				echo '<input type="checkbox" name="team[]" value="' .$team .'" '.$checked.' /> ' .$teamAtts['display_name']. '<br>';
			endforeach;

	echo '</td>
		</tr>
		<tr>
			<th><label for="manager">' .__('Manager',THEME). '</label></th>
			<td>';
			foreach($cms->departments as $team => $teamAtts):
				$checked = in_array($team,$user_managerroles)?'checked="checked"':'';
				echo '<input type="checkbox" name="manager[]" value="' .$team .'" '.$checked.' /> ' .$teamAtts['display_name']. '<br>';
			endforeach;

	echo '</td>
		</tr>

	</table>';
}//my_show_extra_profile_fields


function frp_profile_save_extra_profile_fields( $user_id ) {

	if ( !current_user_can( 'edit_user', $user_id ) )
		return false;

	update_user_meta( $user_id, 'telephone', $_POST['telephone']);
	update_user_meta( $user_id, 'job_title', $_POST['job_title']);
	update_user_meta( $user_id, 'org', $_POST['org']);
	update_user_meta( $user_id, 'img', $_POST['img']);


	if($_POST['team']!=''):
		update_user_meta( $user_id, 'team', implode(',',$_POST['team']));
	endif;

	if($_POST['manager']!=''):
		update_user_meta( $user_id, 'manager', implode(',',$_POST['manager']));
	endif;

}//frp_profile_save_extra_profile_fields

require_once("frp_userprofile.userImage.php");

