<?php

'render_callback' => function (array $attributes) {
    ob_start();
    ?>
        <p>My HTML here</p>
    <?php
    $html = ob_get_contents();
    ob_end_clean();
    return $html;
}
