// externals
import assign from 'lodash.assign';
import classnames from 'classnames';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Toolbar } from '@wordpress/components';

// icon
const icon = () => {
	return (
		<svg aria-hidden="true" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M9.10449219,18 L9.95117188,15.4848633 L14.4584961,15.4848633 L15.2470703,18 L18.0195312,18 L13.6865234,5.76464844 L10.7978516,5.76464844 L6.43164062,18 L9.10449219,18 Z M13.7446289,13.3764648 L10.6401367,13.3764648 L12.2172852,8.56201172 L13.7446289,13.3764648 Z" fill="currentColor" fill-rule="nonzero"></path></g></svg>
	)
}

// enable filters for blocks
const enableFontWeightOnBlocks = {
	'core/heading': 'bold', // block: defaultFontWeight
	'core/paragraph': 'normal' // block: defaultFontWeight
}

// font weight options
const fontWeightControlOptions = [ {
		label: __( 'Light', 'sht' ),
		title: __( 'Light', 'sht' ),
		value: 'light',
	},
	{
		label: __( 'Normal', 'sht' ),
		title: __( 'Normal', 'sht' ),
		value: 'normal',
	},
	{
		label: __( 'Bold', 'sht' ),
		title: __( 'Bold', 'sht' ),
		value: 'bold',
	},
];

/**
 * Add fontWeight attribute to block.
 *
 * @param {object} settings Current block settings.
 * @param {string} name Name of block.
 *
 * @returns {object} Modified block settings.
 */
const addFontWeightAttribute = ( settings, name ) => {
	// if block font weight is enabled for this block
	if ( !( name in enableFontWeightOnBlocks ) ) {
		return settings;
	}

	// use lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign( settings.attributes, {
		shtFontWeight: {
			type: 'string',
			default: enableFontWeightOnBlocks[ name ],
		},
	} );

	return settings;
}

/**
 * Add font weight options to BlockEdit
 *
 * @param {object} BlockEdit Current block edit component.
 *
 * @returns {object} Modified block block edit component.
 */
const addFontWeightControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		// if block font weight is enabled for this block
		if ( !( props.name in enableFontWeightOnBlocks ) ) {
			return (
				<BlockEdit { ...props } />
			);
		}

		const { shtFontWeight } = props.attributes;

		// remove all previous font weight classes on props.attributes.className
		if ( props.attributes.className ) {
			let classes = props.attributes.className.trim().split( " " );

			Object.keys( fontWeightControlOptions ).map( key => {
				classes = classes.filter( function ( value, index, arr ) { return value !== 'has-font-weight-' + fontWeightControlOptions[ key ].value } );
			} );

			props.attributes.className = classnames( classes );
		}

		// generate each classname from fontWeightControlOptions
		let classNames = [];
		Object.keys( fontWeightControlOptions ).map( key => {
			classNames.push( {
				[ 'has-font-weight-' + fontWeightControlOptions[ key ].value ]: fontWeightControlOptions[ key ].value === shtFontWeight ? true : false
			} )
		} );

		// set the font weight class names only if font weight is not the blocks default font weight
		if ( enableFontWeightOnBlocks[ props.name ] !== shtFontWeight ) {
			props.attributes.className = classnames( props.attributes.className, classNames );
		}

		// return the blockedit and a panel with font weight settings
		return (
			<Fragment>
				{
					<BlockControls>
						<FontWeightToolbar
							value={shtFontWeight}
							onChange={ (weight) => {
								props.setAttributes( {
									shtFontWeight: weight,
								} )
							} }/>
					</BlockControls>
				}
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody
						title={ __( 'Schriftschnitt', 'sht' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Schriftschnitt auswählen' ) }
							value={ shtFontWeight }
							options={ fontWeightControlOptions }
							onChange={ ( selectedFontWeightOption ) => {
								props.setAttributes( {
										shtFontWeight: selectedFontWeightOption,
								} );
							} }
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, 'addFontWeightControl' );

const FontWeightToolbar = ( props ) => {
	const {
		value,
		onChange,
	} = props;

	function applyOrUnset( weight ) {
		return () => onChange( value === weight ? undefined : weight );
	}

	return (
		<Toolbar
			isCollapsed={ true }
			icon={icon}
			label={ __( 'Schriftschnitt ändern', 'sht' ) }
			popoverProps={ {
				position: 'bottom right',
				isAlternate: true,
			} }
			controls={ fontWeightControlOptions.map( ( option ) => {
				return {
					title: option.title,
					icon: icon,
					size: option.value,
					isActive: value === option.value,
					role: 'menuitemradio',
					onClick: applyOrUnset( option.value ),
				}
			})}
		/>
	);
}

// font weight filter
addFilter( 'blocks.registerBlockType', 'sht/attribute/font-weight', addFontWeightAttribute );
addFilter( 'editor.BlockEdit', 'sht/control/font-weight', addFontWeightControl );
