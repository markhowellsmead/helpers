import { addFilter } from '@wordpress/hooks';

addFilter(
	'blocks.registerBlockType',
	'sht-steuerportal/paragraph-wide',
	function( settings, name ) {
		if ( name === 'core/paragraph' ) {
			return lodash.assign( {}, settings, {
				supports: lodash.assign( {}, settings.supports, {
					align: ['wide']
				} ),
			} );
		}
		return settings;
	}
);
