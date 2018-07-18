<?php

use MHM\Test;
use MHM\Nested\Again\Plugin;

spl_autoload_register(function ($class) {
    $classes = explode('\\', $class);
    array_shift($classes);
    $path = implode(DIRECTORY_SEPARATOR, $classes);
    $classFile = dirname(__FILE__).'/Classes/'.$path.'.php';
    //echo "Loading $classFile<br>";
    include $classFile;
});

new Plugin('Hello sky');
