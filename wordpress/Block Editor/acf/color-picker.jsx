/**
 * Customize the ACF color picker with the
 * colours from the Theme. (Runs in the Editor
 * only if this script is used in blocks.js.)
 * mhm March 2020
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

/**
 * 
 * OR…
 *
 * Modify the ACF color picker with the colors from
 * theme.json. Add this to .build/assets/scripts/admin/index.js
 * Use this version if the color picker isn't on the editor view.
 * (e.g. in the category editor.)
 *
 * If there are more than about 10 colors, the interface may
 * not be brilliant. Not much can be done about that.
 *
 * 4.3.2022 mark@sayhello.ch
 */

import theme_json from '../../../../theme.json';
const { settings } = theme_json;
const { palette } = settings.color;

acf.addFilter('color_picker_args', function (args) {
    const colors = palette.map(color => color.color);
    args.palettes = colors;
    return args;
});
