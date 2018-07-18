<?php
// For implementation in WordPress
// via http://www.tomjn.com/talks/code-deodorant-2014/
// September 2014

class Capaldi {
	
	function __construct(){
		add_filter('the_content', array($this, 'swear'), -1);
	}//__construct
	
	function swear($content){
		return 'Bugger';
	}

}

new Capaldi();