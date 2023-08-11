// externals
import assign from 'lodash.assign';
import classnames from 'classnames';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Toolbar, Button } from '@wordpress/components';

// icon
const icon = () => {
	return <svg aria-hidden="true" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" class="dashicon dashicons-star-filled"><path d="M10 1l3 6 6 .75-4.12 4.62L16 19l-6-3-6 3 1.13-6.63L1 7.75 7 7z" fill="currentColor"></path></svg>;
}

// option class and name
const optionClass = 'has-special-option';
const optionName = 'shtSpecialOption';

// enable filters for blocks
const enableToolbarOptionOnBlock = {
	'core/paragraph': false, // block: defaultState (boolean)
}

/**
 * Add toolbar option attribute to block.
 *
 * @param {object} settings Current block settings.
 * @param {string} name Name of block.
 *
 * @returns {object} Modified block settings.
 */
const addToolbarOptionAttribute = ( settings, name ) => {
	// if toolbar option is not enabled for this block
	if ( !( name in enableToolbarOptionOnBlock ) ) {
		return settings;
	}

	// use lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign( settings.attributes, {
		[ optionName ]: {
			type: 'boolean',
			default: enableToolbarOptionOnBlock[ name ],
		},
	} );

	return settings;
}

/**
 * Add toolbar option control to BlockEdit
 *
 * @param {object} BlockEdit Current block edit component.
 *
 * @returns {object} Modified block block edit component.
 */
const addToolbarOptionControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		// if toolbar option is not enabled for this block
		if ( !( props.name in enableToolbarOptionOnBlock ) ) {
			return (
				<BlockEdit { ...props } />
			);
		}

		// remove the special option class if exists
		let classes = props.attributes.className ? props.attributes.className.trim().split( " " ) : [];
		classes = classes.filter( function ( value, index, arr ) { return value !== optionClass } );

		// add the special option class
		if ( props.attributes[ optionName ] ) {
			classes = classnames( classes, optionClass );
		}

		// set className
		props.setAttributes( { className: classnames( classes ) } );

		// return the blockedit with the extra option
		return (
			<Fragment>
				{
					<BlockControls>
						<div class="components-toolbar">
							<Button
								icon={icon}
								value={props.attributes[optionName] ? false : true}
								label={__('Spezial Option', 'sht')}
								isPressed={props.attributes[optionName]}
								onClick={() => {
									props.setAttributes({[optionName]: props.attributes[optionName] ? false : true});
								}}
								style={props.attributes[optionName] ? {
									backgroundColor: '#555d66',
									color: '#ffffff' ,
									border: '#ffffff 2px solid',
									boxSizing: 'border-box',
									borderRadius: '6px',
									padding: '6px',
								} : {}}
							></Button>
						</div>
					</BlockControls>
				}
				<BlockEdit { ...props } />
			</Fragment>
		);
	};
}, 'addToolbarOptionControl' );

// toolbar option filters
addFilter( 'blocks.registerBlockType', 'sht/attribute/special-option', addToolbarOptionAttribute );
addFilter( 'editor.BlockEdit', 'sht/toolbar/special-option', addToolbarOptionControl );
