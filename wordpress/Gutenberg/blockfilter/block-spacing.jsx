// externals
import assign from 'lodash.assign';
import classnames from 'classnames';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Toolbar } from '@wordpress/components';

// enable filters for blocks
// leave it empty, so the will option appear on all blocks
// if you add a block, the option will only apear on this specific blocks
// example option: {'core/heading'}
const enableBlockSpacingOnBlocks = {}

// global default spacing value
const spacingDefaultTop = 'normal';
const spacingDefaultBottom = 'normal';

// option class and name
const optionTopClassBase = 'has-spacing-top';
const optionTopName = 'shtSpacingTop';
const optionBottomClassBase = 'has-spacing-bottom';
const optionBottomName = 'shtSpacingBottom';

// spacing control options
const spacingControlOptions = [ {
		label: __( 'Kein Abstand', 'sht' ),
		value: 'disabled',
		iconTop: () => {
			return (
				<svg aria-hidden="true" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g><path d="M13.4142136,10.5857864 L14.1213203,11.2928932 L17.5,11.2928932 L17.5,12.2928932 L13.121,12.2927864 L12,13.4142136 L10.878,12.2927864 L6.5,12.2928932 L6.5,11.2928932 L9.87867966,11.2928932 L10.5857864,10.5857864 L11.292,11.2927864 L12.707,11.2927864 L13.4142136,10.5857864 Z" fill="currentColor" fill-rule="nonzero" transform="translate(12.000000, 12.000000) scale(1, -1) translate(-12.000000, -12.000000) "></path></g></svg>
			)
		},
		iconBottom: () => {
			return (
				<svg aria-hidden="true" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g><path d="M13.9142136,10.7928932 L14.6213203,11.5 L18,11.5 L18,12.5 L13.621,12.4998932 L12.5,13.6213203 L11.378,12.4998932 L7,12.5 L7,11.5 L10.3786797,11.5 L11.0857864,10.7928932 L11.792,11.4998932 L13.207,11.4998932 L13.9142136,10.7928932 Z" fill="currentColor" fill-rule="nonzero"></path></g></svg>
			)
		}
	}, {
		label: __( 'Klein', 'sht' ),
		value: 'small',
		iconTop: () => {
			return (
				<svg aria-hidden="true" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g><path d="M12.5,10.6893398 L12.4996797,12.3963398 L13.4142136,11.482233 L14.1213203,12.1893398 L12,14.3106602 L9.87867966,12.1893398 L10.5857864,11.482233 L11.4996797,12.3963398 L11.5,10.6893398 L12.5,10.6893398 Z M14,9.68933983 L14,10.6893398 L10,10.6893398 L10,9.68933983 L14,9.68933983 Z" fill="currentColor" fill-rule="nonzero" transform="translate(12.000000, 12.000000) scale(1, -1) translate(-12.000000, -12.000000) "></path></g></svg>
			)
		},
		iconBottom: () => {
			return (
				<svg aria-hidden="true" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g><path d="M12.5,11 L12.4996797,12.707 L13.4142136,11.7928932 L14.1213203,12.5 L12,14.6213203 L9.87867966,12.5 L10.5857864,11.7928932 L11.4996797,12.707 L11.5,11 L12.5,11 Z M14,10 L14,11 L10,11 L10,10 L14,10 Z" fill="currentColor" fill-rule="nonzero"></path></g></svg>
			)
		}
	},
	{
		label: __( 'Normal', 'sht' ),
		value: 'normal',
		iconTop: () => {
			return (
				<svg aria-hidden="true" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g><path d="M12.5,8.68933983 L12.4996797,14.3963398 L13.4142136,13.482233 L14.1213203,14.1893398 L12,16.3106602 L9.87867966,14.1893398 L10.5857864,13.482233 L11.4996797,14.3963398 L11.5,8.68933983 L12.5,8.68933983 Z M14,7.68933983 L14,8.68933983 L10,8.68933983 L10,7.68933983 L14,7.68933983 Z" fill="currentColor" fill-rule="nonzero" transform="translate(12.000000, 12.000000) scale(1, -1) translate(-12.000000, -12.000000) "></path></g></svg>
			)
		},
		iconBottom: () => {
			return (
				<svg aria-hidden="true" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g><path d="M12.5,8.68933983 L12.4996797,14.3963398 L13.4142136,13.482233 L14.1213203,14.1893398 L12,16.3106602 L9.87867966,14.1893398 L10.5857864,13.482233 L11.4996797,14.3963398 L11.5,8.68933983 L12.5,8.68933983 Z M14,7.68933983 L14,8.68933983 L10,8.68933983 L10,7.68933983 L14,7.68933983 Z" fill="currentColor" fill-rule="nonzero"></path></g></svg>
			)
		}
	},
	{
		label: __( 'Mittel', 'sht' ),
		value: 'medium',
		iconTop: () => {
			return (
				<svg aria-hidden="true" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g><path d="M12.5,6.68933983 L12.4996797,16.3963398 L13.4142136,15.482233 L14.1213203,16.1893398 L12,18.3106602 L9.87867966,16.1893398 L10.5857864,15.482233 L11.4996797,16.3963398 L11.5,6.68933983 L12.5,6.68933983 Z M14,5.68933983 L14,6.68933983 L10,6.68933983 L10,5.68933983 L14,5.68933983 Z" fill="currentColor" fill-rule="nonzero" transform="translate(12.000000, 12.000000) scale(1, -1) translate(-12.000000, -12.000000) "></path></g></svg>
			)
		},
		iconBottom: () => {
			return (
				<svg aria-hidden="true" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g><path d="M12.5,6.68933983 L12.4996797,16.3963398 L13.4142136,15.482233 L14.1213203,16.1893398 L12,18.3106602 L9.87867966,16.1893398 L10.5857864,15.482233 L11.4996797,16.3963398 L11.5,6.68933983 L12.5,6.68933983 Z M14,5.68933983 L14,6.68933983 L10,6.68933983 L10,5.68933983 L14,5.68933983 Z" fill="currentColor" fill-rule="nonzero"></path></g></svg>
			)
		}
	},
	{
		label: __( 'Gross', 'sht' ),
		value: 'large',
		iconTop: () => {
			return (
				<svg aria-hidden="true" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g><path d="M12.5,4.68933983 L12.4996797,18.3963398 L13.4142136,17.482233 L14.1213203,18.1893398 L12,20.3106602 L9.87867966,18.1893398 L10.5857864,17.482233 L11.4996797,18.3963398 L11.5,4.68933983 L12.5,4.68933983 Z M14,3.68933983 L14,4.68933983 L10,4.68933983 L10,3.68933983 L14,3.68933983 Z" fill="currentColor" fill-rule="nonzero" transform="translate(12.000000, 12.000000) scale(1, -1) translate(-12.000000, -12.000000) "></path></g></svg>
			)
		},
		iconBottom: () => {
			return (
				<svg aria-hidden="true" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g><path d="M12.5,4.68933983 L12.4996797,18.3963398 L13.4142136,17.482233 L14.1213203,18.1893398 L12,20.3106602 L9.87867966,18.1893398 L10.5857864,17.482233 L11.4996797,18.3963398 L11.5,4.68933983 L12.5,4.68933983 Z M14,3.68933983 L14,4.68933983 L10,4.68933983 L10,3.68933983 L14,3.68933983 Z" fill="currentColor" fill-rule="nonzero"></path></g></svg>
			)
		}
	},
];

// if you use default values for specific blocks
// leave it empty, so the spacingDefault is the default spacing for all blocks
// example option: {'core/heading': {top: 'normal', bottom: 'normal'}}
const spacingDefaults = {
	'core/heading': {
		[ optionTopName ]: 'normal',
		[ optionBottomName ]: 'normal'
	}
}

/**
 * Add spacing attributes to block.
 *
 * @param {object} settings Current block settings.
 * @param {string} name Name of block.
 *
 * @returns {object} Modified block settings.
 */
const addSpacingAttributes = ( settings, name ) => {
	// if spacing option is enabled for this block
	if ( Object.entries( enableBlockSpacingOnBlocks ).length !== 0 && !( name in enableBlockSpacingOnBlocks ) ) {
		return settings;
	}

	// use lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign( settings.attributes, {
		[ optionTopName ]: {
			type: 'string',
			default: ( ( name in spacingDefaults ) && spacingDefaults[ name ][ optionTopName ] ) ? spacingDefaults[ name ][ optionTopName ] : spacingDefaultTop,
		},
		[ optionBottomName ]: {
			type: 'string',
			default: ( ( name in spacingDefaults ) && spacingDefaults[ name ][ optionBottomName ] ) ? spacingDefaults[ name ][ optionBottomName ] : spacingDefaultBottom,
		},
	} );

	return settings;
}

/**
 * Add spacing options to BlockEdit
 *
 * @param {object} BlockEdit Current block edit component.
 *
 * @returns {object} Modified block block edit component.
 */
const addSpacingControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		// if spacing option is enabled for this block
		if ( Object.entries( enableBlockSpacingOnBlocks ).length !== 0 && !( props.name in enableBlockSpacingOnBlocks ) ) {
			return (
				<BlockEdit { ...props } />
			);
		}

		// remove all previous spacing classes on props.attributes.className
		let cleanedInitialClasses;
		if ( props.attributes.className ) {
			cleanedInitialClasses = props.attributes.className.trim().split( " " );

			Object.keys( spacingControlOptions ).map( key => {
				cleanedInitialClasses = cleanedInitialClasses.filter( function ( value, index, arr ) { return value !== optionTopClassBase + '-' + spacingControlOptions[ key ].value } );
				cleanedInitialClasses = cleanedInitialClasses.filter( function ( value, index, arr ) { return value !== optionBottomClassBase + '-' + spacingControlOptions[ key ].value } );
			} );
		}

		// check if the top and bottom class should be active depending on current value
		let isActiveTop = false;
		if ( spacingDefaults[ props.name ] && spacingDefaults[ props.name ][ optionTopName ] ) {
			if ( props.attributes[ optionTopName ] !== spacingDefaults[ props.name ][ optionTopName ] ) {
				isActiveTop = true;
			}
		} else {
			if ( props.attributes[ optionTopName ] !== spacingDefaultTop ) {
				isActiveTop = true;
			}
		}

		let isActiveBottom = false;
		if ( spacingDefaults[ props.name ] && spacingDefaults[ props.name ][ optionBottomName ] ) {
			if ( props.attributes[ optionBottomName ] !== spacingDefaults[ props.name ][ optionBottomName ] ) {
				isActiveBottom = true;
			}
		} else {
			if ( props.attributes[ optionBottomName ] !== spacingDefaultBottom ) {
				isActiveBottom = true;
			}
		}

		// generate the class name for top and bottom
		let topClasses = [ {
			[ optionTopClassBase + '-' + props.attributes[ optionTopName ] ]: isActiveTop
		} ];
		let bottomClasses = [ {
			[ optionBottomClassBase + '-' + props.attributes[ optionBottomName ] ]: isActiveBottom
		} ];

		// set className
		props.setAttributes( { className: classnames( cleanedInitialClasses, topClasses, bottomClasses ) } );

		// return the blockedit and a panel with spacing options
		return (
			<Fragment>
				{
					<BlockControls>
						<TopSpacingToolbar
							value={props.attributes[ optionTopName ]}
							onChange={ (topSpacing) => {
								props.setAttributes( {[ optionTopName ]: topSpacing } )
							} }/>
					</BlockControls>
				}
				{
					<BlockControls>
						<BottomSpacingToolbar
							value={props.attributes[ optionBottomName ]}
							onChange={ (bottomSpacing) => {
								props.setAttributes( {[ optionBottomName ]: bottomSpacing } )
							} }/>
					</BlockControls>
				}
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody
						title={ __( 'Aussenbstände', 'sht' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Aussenbstand oben auswählen' ) }
							value={ props.attributes[ optionTopName ] }
							options={ spacingControlOptions }
							onChange={ ( topSpacing ) => {
								props.setAttributes( { [ optionTopName ]: topSpacing } );
							} }
						/>
						<SelectControl
							label={ __( 'Aussenbstand unten auswählen' ) }
							value={ props.attributes[ optionBottomName ] }
							options={ spacingControlOptions }
							onChange={ ( bottomSpacing ) => {
								props.setAttributes( { [ optionBottomName ]: bottomSpacing } );
							} }
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, 'addSpacingControls' );

const TopSpacingToolbar = ( props ) => {
	const {
		value,
		onChange,
	} = props;

	function apply( spacing ) {
		return () => onChange( spacing );
	}

	const currentOption = spacingControlOptions.filter( function ( option, index, arr ) {
		return this.spacing == option.value
	}, { spacing: value } );

	return (
		<Toolbar
			isCollapsed={ true }
			icon={currentOption[0].iconTop}
			label={ __( 'Aussenbstand oben ändern', 'sht' ) }
			popoverProps={ {
				position: 'bottom right',
				isAlternate: true,
			} }
			controls={ spacingControlOptions.map( ( option ) => {
				return {
					title: option.label,
					icon: option.iconTop,
					size: option.value,
					isActive: value === option.value,
					role: 'menuitemradio',
					onClick: apply( option.value ),
				}
			})}
		/>
	);
}

const BottomSpacingToolbar = ( props ) => {
	const {
		value,
		onChange,
	} = props;

	function apply( spacing ) {
		return () => onChange( spacing );
	}

	const currentOption = spacingControlOptions.filter( function ( option, index, arr ) {
		return this.spacing == option.value
	}, { spacing: value } );

	return (
		<Toolbar
			isCollapsed={ true }
			icon={currentOption[0].iconBottom}
			label={ __( 'Aussenbstand unten ändern', 'sht' ) }
			popoverProps={ {
				position: 'bottom right',
				isAlternate: true,
			} }
			controls={ spacingControlOptions.map( ( option ) => {
				return {
					title: option.label,
					icon: option.iconBottom,
					size: option.value,
					isActive: value === option.value,
					role: 'menuitemradio',
					onClick: apply( option.value ),
				}
			})}
		/>
	);
}

// spacing controls filter
addFilter( 'blocks.registerBlockType', 'sht/attribute/block-spacing', addSpacingAttributes );
addFilter( 'editor.BlockEdit', 'sht/control/block-spacing', addSpacingControls );
