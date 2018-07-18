<?php
/*
Template Name: Upload (JSON Response)
*/
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json; charset=utf-8');

require_once('class.qqUploadedFileXhr.php');

$allowedExtensions = array('csv');
$sizeLimit = 102400; // KB

$uploader = new qqFileUploader($allowedExtensions, $sizeLimit);

$result = $uploader->handleUpload('',true);
echo json_encode($result);