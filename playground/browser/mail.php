<?php
function dump($var,$die=false){
	echo '<pre>' .print_r($var,1). '</pre>';
	if($die){die();}
}//dump

mail('support@frappant.ch','Browserinformation von '.$_SERVER['REMOTE_ADDR'],'<html><head></head><body><style>*{text-align:left}table{margin-bottom:1em}table,th,td{border-collapse:collapse;border:1px solid #ccc}td,th{padding:4px 8px}</style>'.stripslashes($_REQUEST['content']).'</body><html>','From: support@frappant.ch'.chr(10).'Content-type: text/html; charset=utf-8'.chr(10));