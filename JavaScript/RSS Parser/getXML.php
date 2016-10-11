<?php
if(isset($_GET['url']) && !empty($_GET['url'])){
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL,$_GET['url']);
	curl_setopt($ch, CURLOPT_FAILONERROR,1);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION,1);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
	curl_setopt($ch, CURLOPT_TIMEOUT, 15);
	$retValue = curl_exec($ch);			 
	curl_close($ch);
	
	header('Content-Type: application/xml; charset=utf-8');
	echo $retValue;
}