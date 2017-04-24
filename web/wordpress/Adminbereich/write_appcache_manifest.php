<?php
function update_manifest() {
	date_default_timezone_set('Europe/Zurich');
	$filename = $_SERVER['DOCUMENT_ROOT'].'/appcache.manifest';
	$contents = @file_get_contents($filename);
	if($contents){
		$contents = preg_replace(':(###WRITE_START###)(.*)(###WRITE_END###):','$1 Updated '.date('d.m.Y H:i:s'). ' $3',$contents);
	}else{
		$contents = 'CACHE MANIFEST'.chr(10).'###WRITE_START### Updated '.date('d.m.Y H:i:s').' ###WRITE_END###'.chr(10).chr(10).'NETWORK:'.chr(10).'*';
	}
	@file_put_contents($filename, $contents);
}//update_manifest
add_action('save_post', 'update_manifest');