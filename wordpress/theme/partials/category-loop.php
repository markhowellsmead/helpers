<?php

<ul class="<?php echo $classNameBase; ?>__entries">
    <?php
    foreach ($category_ids as $category_id) {
        $category = get_term($category_id);
    ?>
    <li class="<?php echo $classNameBase; ?>__entry">
        <a class="<?php echo $classNameBase; ?>__entrylink"><?php echo esc_html($category->name); ?></a>
    </li>
    <?php
    }
?>
</ul>
