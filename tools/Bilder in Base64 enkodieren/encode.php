<?php
header('Content-Type: text/plain; charset=utf-8');

$path= 'Logo_Mail-Sig.png';
$type = pathinfo($path, PATHINFO_EXTENSION);
$data = file_get_contents($path);
$base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);

die('<img src="' .$base64. '" alt="" />');