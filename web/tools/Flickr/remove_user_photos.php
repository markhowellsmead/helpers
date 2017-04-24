<?php

/*
jm santi 122710827@N03
pepeinsuiza 63324153@N05

api
key 8703c9741dc1f3294c7e26c8b50eb5af
secret 203d87ac12749d97
user_id 87637435@N00
*/

function dump($var,$die=false){
	echo '<pre>' .print_r($var,1). '</pre>';
	if($die){die();}
}

function callAPI($url){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,$url);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $contents = curl_exec($ch);
    curl_close($ch);
    return json_decode($contents,TRUE);
}

//////////////////////////////////////////////////

$users = array(
    'lindenstrasse70',
    'pepedelarafoto'
);

$group_id = '605848@N25';
  
//////////////////////////////////////////////////

// Swiss Strobist group pool

$images = callAPI('https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=227ded2f3d0727bf52526c22c734b486&group_id=' .urlencode($group_id). '&format=json&nojsoncallback=1&auth_token=72157668394648264-ef9b969998354f11&api_sig=f7c103c2685bf13a4162bdd9eba4f91f');

if( !isset($images['photos']) || !isset($images['photos']['photo']) ){
    var_dump($images);
    exit;
}

foreach ($images['photos']['photo'] as $image){
    if( in_array($image['ownername'], $users) ){
        dump(callApi('https://api.flickr.com/services/rest/?method=flickr.groups.pools.remove&api_key=227ded2f3d0727bf52526c22c734b486&photo_id=' .$image['id']. '&group_id=' .urlencode($group_id). '&format=json&nojsoncallback=1&auth_token=72157668394648264-ef9b969998354f11&api_sig=0cf6d137cc9f4c7a8a14d03e11ad3d59'));
    }
}