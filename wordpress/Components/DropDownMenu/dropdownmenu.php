<?php

use \SayHello\Theme\Vendor\DropDownMenuWalker;

wp_nav_menu(
	[
		'theme_location' => 'primary',
		'container' => 'nav',
		'container_class' => 'c-menu c-menu--primary c-dropdownmenu',
		'menu_id' => 'primary-menu',
		'walker' => new DropDownMenuWalker()
	]
);
