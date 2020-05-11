<?php

namespace SayHello\Theme\Vendor;

use Walker_Nav_Menu;

class DropDownNavWalker extends Walker_Nav_Menu
{
	public function start_lvl(&$output, $depth = 0, $args = null)
	{
		$indent = str_repeat(chr(9), $depth);
		$output .= PHP_EOL.$indent.'<ul class="c-dropdownmenu__entries c-dropdownmenu__entries--level' .($depth+2). '">'.PHP_EOL;
	}
}
