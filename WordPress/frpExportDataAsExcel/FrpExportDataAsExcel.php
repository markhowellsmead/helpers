<?php
/*
Plugin Name: Frp_ExportDataAsExcel
Description: Export Data as Excel File
Text Domain: frp_ExportDataAsExcel
Domain Path: languages
Version: 1.0
Author: frappant
Author URI: http://frappant.ch
*/

class FrpExportDataAsExcel{
	
		function __construct(){
			register_activation_hook( __FILE__, array(&$this, 'activate' ) );
			define( 'FRP_EXPORT_DATA_AS_EXCEL_PLUGINURL', plugins_url( '/', __FILE__ ) );
			include(plugin_dir_path(__FILE__) .'Classes/exportData.php');
			wp_enqueue_script( 'frpExportExcel',FRP_EXPORT_DATA_AS_EXCEL_PLUGINURL .'Resources/Public/Javascript/ui.js' , null, 1.0, true );	
			add_action( 'wp_ajax_actionExportExcel', array(&$this,'exportExcel'));
			add_action( 'admin_menu', array(&$this, 'pluginMenu') );
		}
		
		function activate(){
			$url = WP_CONTENT_DIR . '/uploads/frpExportDataAsExcel';
			
			if (!file_exists( $url ) ){
        		error_log($url,0);
				wp_mkdir_p( $url );
			}
		}

		function pluginMenu(){
			add_menu_page('Excel Export', 'Excel Export', 'manage_options', 'mt-top-level-handle', array(&$this, 'pluginMenuContent'), FRP_EXPORT_DATA_AS_EXCEL_PLUGINURL.'Resources/Public/Icons/icnPlugin.png' );	
		}
		
		function pluginMenuContent() {
			if ( !current_user_can( 'manage_options' ) )  {
				wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
			}
			echo '
			<div class="wrap">
				<h2>Daten exportieren</h1>
				<p>Wenn du unten auf Export-Datei herunterladen klickst, wird WordPress eine Excel-Datei f&uuml;r dich erstellen, die du auf deinem Computer speichern kannst.</p>
				<h3>W&auml;hle, was du exportieren m&ouml;chtest</h3>
				<form method="post" action="'.$_SERVER['PHP_SELF'].'">
					<p>
						<label>
							<input type="radio" name="content" value="users" checked="checked">
							Users
						</label>
					</p>
					<p class="description">
						Spalten: Nr, Name, Vorname, Jahrgang, Strasse, PLZ, Ort, Telefon, E-mail, Geburtsdatum, Telefon, Loginname
					</p>
					<p class="submit">
						<input type="submit" name="submit" id="submitExportExcel" class="button button-primary" value="Export-Datei herunterladen">
					</p>
				</form>
			</div>';
		}
	 	
	 	function exportExcel(){
			$datatype = $_POST['datatype'] ;
			new ExportData($datatype);
			wp_die(); 
	 	}			
}
new FrpExportDataAsExcel();