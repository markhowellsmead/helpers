<?php
/*
Plugin Name: Clear temporary files
Plugin URI: http://www.frappant.ch/
Description: Register WordPress cron task to clear all files and subfolders from a defined folder. Runs every half-hour.
Author: !frappant Webfactory - Mark Howells-Mead
Version: 1.0
Author URI: http://www.frappant.ch/
*/

class FrpClearTemporaryFiles {
	
	var $key = 'frp_clear_temporary_files',
		$scheduledtask = 'frp_clear_temporary_files';

	//////////////////////////////////////////////////

	public function __construct(){

		// register/deregister this plugin with the cron scheduler on activation/deactivation
		register_activation_hook( __FILE__, array(&$this, 'activation') );
		register_deactivation_hook( __FILE__, array(&$this, 'deactivation') );

		// add cron helper and cron action function
		add_filter( 'cron_schedules', array(&$this, 'cron_add_minute') );
		add_action( $this->scheduledtask, array(&$this, 'clear_temporary_files') );

		// add settings page
		add_action( 'admin_menu', array(&$this, 'admin_menu'));
		add_action( 'admin_init', array(&$this, 'settings_init'));
		
		// load plugin translations
		add_action( 'init', array(&$this, 'load_languages') );

	}

	//////////////////////////////////////////////////
	
	public function activation(){
		// register this task with the cron queue when the plugin is activated

		$timestamp = wp_next_scheduled( $this->scheduledtask );

		if( $timestamp == false ){
			// Schedule the event for right now, then to repeat using the hook $this->key
			wp_schedule_event( time(), 'halfhour', $this->scheduledtask );
		}

	}

	//////////////////////////////////////////////////
	
	public function deactivation(){
		// remove this task from the cron queue when the plugin is deactivated
		wp_clear_scheduled_hook( $this->scheduledtask );
	}

	//////////////////////////////////////////////////
	
	
	public function load_languages(){
		load_theme_textdomain($this->key, __DIR__.'/language');
	}

	//////////////////////////////////////////////////

	public function cron_add_minute( $schedules ) {
		// Adds a new schedule frequency to the existing schedules.
		$schedules['halfhour'] = array(
			'interval' => 1800,
			'display' => __( 'Once every half-hour', $this->key)
		);
		return $schedules;
	}

	//////////////////////////////////////////////////
	
	public function clear_temporary_files(){
		// the function which will be called by the cron task
		$upload_dir = wp_upload_dir();
		$options = get_option( $this->key.'_settings' );
		if( isset($options['tempfolder']) && $options['tempfolder']!=='' ){
			$folder = trailingslashit($upload_dir['basedir']) . $options['tempfolder'];
			$this->recursive_rmdir( $folder );
		}
	}

	//////////////////////////////////////////////////
	
	public function recursive_rmdir($dir) { 
		// remove files and subfolders of the specified folder recursively
		if (is_dir($dir)) {
			$objects = scandir($dir);
			foreach ($objects as $object) {
				if ($object != "." && $object != "..") {
					if (filetype($dir."/".$object) == "dir"){
						$this->recursive_rmdir($dir."/".$object);
						@rmdir($dir."/".$object);
					}else{
						unlink($dir."/".$object);
					}
				}
				reset($objects);
			}
		}
	}

	//////////////////////////////////////////////////

	public function admin_menu() {
		add_options_page(__('Clear temporary files', $this->key), __('Clear temp. files', $this->key), 'manage_options', $this->key.'.php', array(&$this, 'options_page_content') );
	}

	//////////////////////////////////////////////////

	public function options_page_content(){

		settings_fields( $this->key );
		
		echo '<div class="wrap">
			<form action="options.php" method="post">
				<h2>' .__('Clear temporary files', $this->key). '</h2>';

		settings_fields( $this->key );
		do_settings_sections( $this->key );
		submit_button();

		echo '</form></div>';
	}

	//////////////////////////////////////////////////

	public function settings_init() { 
	
		register_setting( $this->key, $this->key.'_settings' );
	
		add_settings_section(
			'section0', 
			__( 'Options', $this->key ), 
			array($this, 'settings_section_0'),
			$this->key
		);
	
		add_settings_field( 
			'tempfolder', 
			__( 'Folder path', $this->key ), 
			array($this, 'field_0_render'),
			$this->key, 
			'section0' 
		);
	}

	//////////////////////////////////////////////////

	public function settings_section_0(  ) { 
	
		//echo __( 'This section description', $this->key );
	
	}
	//////////////////////////////////////////////////

	public function field_0_render() { 
	
		$upload_dir = wp_upload_dir();
		$options = get_option( $this->key.'_settings' );
		
		echo '<code>' .$upload_dir['baseurl']. '/</code><input type="text" name="' .$this->key. '_settings[tempfolder]" value="' .$options['tempfolder']. '">
			<p class="description">' .__( 'The entire contents of this folder (including subfolders) will be irrevocably deleted when the appropriate cron task is run. The folder itself will not be deleted.', $this->key). '</p>';

	}
}

new FrpClearTemporaryFiles();