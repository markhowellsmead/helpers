<?php
function dump($var,$die=false){
	echo '<pre>' .print_r($var,1). '</pre>';
	if($die){die();}
}//dump

header('Content-Type: application/json');
header('Content-Type: text/javascript; charset=utf8');

$status = 200;
$return = (array)$_REQUEST;

if(isset($_REQUEST['savereturn'])){
	$status = 302;
	$return = $_REQUEST['page_list'];
}

die(json_encode(array(
	'status' => $status,
	'result' => $return
)));