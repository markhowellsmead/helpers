import domReady from '@wordpress/dom-ready';

domReady(() => {
	acf.add_filter('color_picker_args', function( args, field ){
		let palette = [];
		wp.data.select( "core/editor" ).getEditorSettings().colors.forEach(color => {
			palette.push(color.color);
		});
		if(palette.length){
			args.palettes = palette;
		}
		return args;
	});
});
