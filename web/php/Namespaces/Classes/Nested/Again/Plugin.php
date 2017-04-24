<?php

namespace MHM\Nested\Again;

use MHM\Test;

class Plugin
{
    public function __construct($message)
    {
        echo '<p>Plugin message: ' .$message. '</p>';
        new Test('Hello from nested');
    }
}
