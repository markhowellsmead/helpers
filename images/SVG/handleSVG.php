<?php

$usmap = dirname(__FILE__).'/v2.svgz';
$im = new Imagick();
$svg = file_get_contents($usmap);

/*loop to color each state as needed, something like*/ 

foreach($idColorArray as $state => $color){
//Where $color is a RRGGBB hex value
    $svg = preg_replace(
         '/id="'.$state.'" style="fill:#([0-9a-f]{6})/'
        , 'id="'.$state.'" style="fill:#'.$color
        , $svg
    );
}

$im->readImageBlob($svg);

/*png settings*/
$im->setImageFormat("png24");
$im->resizeImage(720, 445, imagick::FILTER_LANCZOS, 1);  /*Optional, if you need to resize*/

/*jpeg*/
$im->setImageFormat("jpeg");
$im->adaptiveResizeImage(720, 445); /*Optional, if you need to resize*/

$im->writeImage(dirname(__FILE__).'/'.date('Ymdhis').'.png');/*(or .jpg)*/
$im->clear();
$im->destroy();