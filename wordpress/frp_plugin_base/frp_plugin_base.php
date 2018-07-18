<?php
/*
////////////////////////////////////////////////////////////////////////////////
//
// Replace "frp_plugin_base" everywhere in this file with the key of your plugin
// You should then delete this comment
//
////////////////////////////////////////////////////////////////////////////////


Plugin Name: !frappant Base Plugin
Plugin URI: #
Description: Start point for a simple shortcode-based plugin. This does not have any real functionality but should be used as a starting point.
Author: Mark Howells-Mead
Version: 1.0
Author URI: http://www.frappant.ch/
*/



// get [myShortcode] from content
// automatically understands parameter features
// e.g. [myShortcode id="1234"] 
// e.g. [myShortcode id="1234" layout="single"] 

add_shortcode('myShortcode', array('Frp_plugin_base','parse_shortcode'));


// class with functions to parse and output content
class Frp_plugin_base {

	var $pluginKey = 'frp_plugin_base';

	private function generate($atts,$content) {

		// Following line optional. Use if you need translations.
		//load_plugin_textdomain(self::$pluginKey,null,basename(dirname(__FILE__)).'/languages');
		
		$test = __('Hello world',self::$pluginKey);

		$out='';
		
		// add your functionality here....
		
		if(!empty($out)){
			return $atts['text_pre'].$out.$atts['text_post'];
		}else{
			return '';
		}

	}//generate


	function parse_shortcode($atts, $content=null){

		// define default values for shortcode attributes
		$atts=shortcode_atts(array(
			'id'		=> '',
			'layout'	=> '',
			'text_pre'	=> '<div class="frp_plugin_base">',
			'text_post'	=> '</div>'
		), $atts);
	
		if(!empty($atts["id"])||!empty($atts["url"])){
			return self::generate($atts,$content);
		}else{
			return '';
		}

	}//parse_shortcode
	
}//class