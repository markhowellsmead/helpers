<?php
//	diese Datei in functions.php mittels require_once einziehen.
//	Konstant 'THEME' muss definiert sein!!!
//	mhm 7.11.2012

add_action( 'admin_init', 'theme_options_init' );
add_action( 'admin_menu', 'theme_options_add_page' ); 

function theme_options_init(){
	// globale initialisierung
	register_setting('theme_options', 'themeoptions_'.THEME);
}//theme_options_init


function theme_options_add_page() {
	//	neue Optionenseite in Backend hinzufügen. Inhalt der Seite in der Funktion theme_options_do_page definiert
	add_theme_page( __( 'Theme Options', THEME), __( 'Theme Options', THEME), 'edit_theme_options', 'theme_options', 'theme_options_do_page' );
}//theme_options_add_page


function theme_options_do_page() {

	global $select_options;
	if ( ! isset( $_REQUEST['settings-updated'] ) )
		$_REQUEST['settings-updated'] = false;

	echo '<div class="wrap"><div id="icon-options-general" class="icon32"></div>';
	echo "<h2>". __( 'Custom Theme Options', THEME) . "</h2>";

	if ( false !== $_REQUEST['settings-updated'] ){
		echo '<div id="setting-error-settings_updated" class="updated"><p><strong>' .__( 'Options saved', THEME). '</strong></p></div>';
	}
	
	echo '<form method="post" action="options.php">';
	settings_fields( 'theme_options' );
	$options = get_option('themeoptions_'.THEME);

	echo "<h3>". __( 'Custom Theme Options', THEME) . "</h3>";
	echo '<table class="form-table">
		<tr valign="top">
			<th scope="row">'.__( 'Company', THEME).'</th><td><input id="themeoptions_'.THEME.'[frp_company]" type="text" name="themeoptions_'.THEME.'[frp_company]" value="' .esc_attr( $options['frp_company'] ).'"></td>
		</tr> 
		<tr valign="top">
			<th scope="row">'.__( 'Address', THEME).'</th><td><input id="themeoptions_'.THEME.'[frp_address]" type="text" name="themeoptions_'.THEME.'[frp_address]" value="' .esc_attr( $options['frp_address'] ).'"></td>
		</tr> 
		<tr valign="top">
			<th scope="row">'.__( 'Post code', THEME).'</th><td><input id="themeoptions_'.THEME.'[frp_postcode]" type="text" name="themeoptions_'.THEME.'[frp_postcode]" value="' .esc_attr( $options['frp_postcode'] ).'"></td>
		</tr> 
		<tr valign="top">
			<th scope="row">'.__( 'City', THEME).'</th><td><input id="themeoptions_'.THEME.'[frp_city]" type="text" name="themeoptions_'.THEME.'[frp_city]" value="' .esc_attr( $options['frp_city'] ).'"></td>
		</tr> 
		<tr valign="top">
			<th scope="row">'.__( 'Telephone number', THEME).'</th><td><input id="themeoptions_'.THEME.'[frp_telephone]" type="text" name="themeoptions_'.THEME.'[frp_telephone]" value="' .esc_attr( $options['frp_telephone'] ).'"></td>
		</tr> 
		<tr valign="top">
			<th scope="row">'.__( 'Email', THEME).'</th><td><input id="themeoptions_'.THEME.'[frp_email]" type="text" name="themeoptions_'.THEME.'[frp_email]" value="' .esc_attr( $options['frp_email'] ).'"></td>
		</tr>
		<tr valign="top">
			<th scope="row">'.__( 'Gender', THEME).'</th><td><select id="themeoptions_'.THEME.'[frp_gender]" name="themeoptions_'.THEME.'[frp_gender]">
				<option>' .__('Select…', THEME). '</option>
				<option value="1"' .(esc_attr( $options['frp_gender'])=='1'?' selected':''). '>' .__('Male', THEME). '</option>
				<option value="2"' .(esc_attr( $options['frp_gender'])=='2'?' selected':''). '>' .__('Female', THEME). '</option>
			</select></td>
		</tr> 
		';

		/*
		// textarea mit wysiwyg-editor 
		echo '<tr valign="top"><th scope="row">'.__( 'Project description', THEME).'</th><td>';
		wp_editor($options['project_description'], 'themeoptions_'.THEME.'_project_description', array(
			'textarea_name' => 'themeoptions_'.THEME.'[project_description]',
			'teeny' => true,
			'media_buttons' => false
		));
		echo '</td></tr>';
		*/

	echo '</table>';
	
	echo '<p><input class="button-primary" type="submit" value="'.__( 'Save Options', THEME).'"></p>
	</form>
	</div>';

}//theme_options_do_page