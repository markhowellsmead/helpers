<?php
    
$path = $_SERVER['DOCUMENT_ROOT'].'/playground/is_dir/with spaces';
    
var_dump( is_dir($path) );