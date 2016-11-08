<?php

$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $_GET['url']);
curl_setopt($curl, CURLOPT_FILETIME, true);
curl_setopt($curl, CURLOPT_NOBODY, true);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HEADER, true);
$header = curl_exec($curl);
$info = curl_getinfo($curl);
curl_close($curl);

header('Content-Type: application/json');
die(json_encode(explode("\r\n", $header)));
