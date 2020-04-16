/**
 * Customizes all ACF color picker fields in WordPress Admin
	* mark@sayhello.ch 16.4.2020
	*/

import domReady from '@wordpress/dom-ready';
import { select } from '@wordpress/data';

domReady(() => {
	acf.add_filter('color_picker_args', function( args, field ){
		let palette = [];
		select('core/editor').getEditorSettings().colors.forEach(color => {
			palette.push(color.color);
		});
		if(palette.length){
			args.palettes = palette;
		}
		return args;
	});
});
