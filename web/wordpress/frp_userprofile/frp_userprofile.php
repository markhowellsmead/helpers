<?php
/*
Plugin Name: !frappant Extended User Profile (frp_userprofile)
Plugin URI: #
Description: Extends the standard WordPress user profile with bespoke fields and provides shortcode-based display functionality for use in RTE fields. Dependency on third-party plugin "meta-box" (http://wordpress.org/extend/plugins/meta-box/, included in this plugin) for user photos. Example of shortcode use [frp_userprofile name="derek" mode="small" server="http://www.MyOtherWordPressWebsite.com/"]
Version: 2.1 - 20.7.2012
Author: Mark Howells-Mead
Author URI: http://www.frappant.ch/
*/

function frp_userprofile_parse($atts, $content=null) {
	$frp_userprofile = new frp_userprofile();
	$atts=shortcode_atts(array(
		'mode' 			=> 'default',
		'name' 			=> '',
		'profilepage' 	=> '',
		'team' 			=> '',
		'userid' 		=> '',
		'server'		=> '', // get JSON code from remote WordPress source via CURL/Ajax » http://www.makeuseof.com/tag/tutorial-ajax-wordpress/
	), $atts);
	return $frp_userprofile->build($atts);
}//frp_userprofile_parse

add_shortcode('frp_userprofile', 'frp_userprofile_parse');

include_once('frp_userprofile.class');
include_once('frp_userprofile.backend.php');
include_once('frp_userprofile.ajax.php');