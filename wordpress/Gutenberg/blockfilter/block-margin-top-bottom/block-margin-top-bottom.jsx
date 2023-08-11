// externals
import assign from 'lodash.assign';
import classnames from 'classnames';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, ButtonGroup, Toolbar, Tooltip } from '@wordpress/components';

// icon
const icon = () => {
	return (
		<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="1.5"><path fill="none" stroke="#000" stroke-width="1.18" d="M4.393 5.966h15.603v12.476H4.393z" transform="matrix(.89724 0 0 .80153 1.05873 2.21781)"/><path d="M2.99992485 9.164865L.17156904 11.99322083l2.828409 2.828409-.0079592-2.82815786.007906-2.82860695zM21.00008515 9.164865l2.82835581 2.82835582-2.828409 2.828409.0079592-2.82815786-.007906-2.82860695z" fill="#e2e2e2"/><path d="M9.171465 4.99992275l2.82835582-2.82835581 2.828409 2.828409-2.82815786-.0079592-2.82860695.007906zM14.828535 19.00008515l-2.82835582 2.82835581-2.828409-2.828409 2.82815786.0079592 2.82860695-.007906z"/></svg>
	)
}

// enable filters for blocks
// block: defaultMargin
const enableOnBlocks = {
	'core/heading': 'standard',
	'core/paragraph': 'standard',
	'core/group': 'standard',
	'core/columns': 'standard',
	'core/image': 'standard',
}

const controlOptionsTop = [
	{
		label: __( '0', 'sht' ),
		title: __( 'Kein Aussenabstand oben', 'sht' ),
		value: 'none',
	},
	{
		label: __( 'S', 'sht' ),
		title: __( 'Klein', 'sht' ),
		value: 'small',
	},
	{
		label: __( 'R', 'sht' ),
		title: __( 'Normal', 'sht' ),
		value: 'standard',
	},
	{
		label: __( 'M', 'sht' ),
		title: __( 'Mittelgross', 'sht' ),
		value: 'medium',
	},
	{
		label: __( 'L', 'sht' ),
		title: __( 'Gross', 'sht' ),
		value: 'large',
	},
	{
		label: __( 'XL', 'sht' ),
		title: __( 'Extragross', 'sht' ),
		value: 'xlarge',
	},
];

const controlOptionsBottom = controlOptionsTop;

/**
 * Add shtMarginTop and shtMarginBottom attribute to block.
 *
 * @param {object} settings Current block settings.
 * @param {string} name Name of block.
 *
 * @returns {object} Modified block settings.
 */
const addMarginAttribute = ( settings, name ) => {
	// if block font size is enabled for this block

	let defaultSize = 'standard';

	if ( name in enableOnBlocks ) {
		defaultSize = enableOnBlocks[ name ];
	}

	// use lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign( settings.attributes, {
		shtMarginTop: {
			type: 'string',
			default: defaultSize,
		},
		shtMarginBottom: {
			type: 'string',
			default: defaultSize,
		},
	} );

	return settings;
}

/**
 * Add font size options to BlockEdit
 *
 * @param {object} BlockEdit Current block edit component.
 *
 * @returns {object} Modified block block edit component.
 */
const addMarginControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {

		const { shtMarginTop, shtMarginBottom } = props.attributes;

		// remove all previous font size classes on props.attributes.className
		if ( props.attributes.className ) {
			let classes = props.attributes.className.trim().split( ' ' );

			Object.keys( controlOptionsTop ).map( key => {
				classes = classes.filter( function ( value, index, arr ) { return value !== 'has-block-margin-top--' + controlOptionsTop[ key ].value } );
			} );

			Object.keys( controlOptionsBottom ).map( key => {
				classes = classes.filter( function ( value, index, arr ) { return value !== 'has-block-margin-bottom--' + controlOptionsBottom[ key ].value } );
			} );

			props.attributes.className = classnames( classes );
		}

		let classNames = [];

		// add each classname from controlOptionsTop
		Object.keys( controlOptionsTop ).map( key => {
			classNames.push( {
				[ 'has-block-margin-top--' + controlOptionsTop[ key ].value ]: controlOptionsTop[ key ].value === shtMarginTop ? true : false
			} )
		} );

		// add each classname from controlOptionsBottom
		Object.keys( controlOptionsBottom ).map( key => {
			classNames.push( {
				[ 'has-block-margin-bottom--' + controlOptionsBottom[ key ].value ]: controlOptionsBottom[ key ].value === shtMarginBottom ? true : false
			} )
		} );

		props.attributes.className = classnames( props.attributes.className, classNames );

		// return the blockedit and a panel with font size settings
		return (
			<Fragment>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody
						title={ __( 'Aussenabstände', 'sht' ) }
						initialOpen={ false }
					>
						<div className="components-base-control">
							<label class="components-base-control__label">{ __( 'Abstand oben ändern', 'sht' ) }</label>
							<ButtonGroup>
								{Object.keys( controlOptionsTop ).map( key => {
									return (
										<Tooltip text={controlOptionsTop[key].title}>
											<Button
												isSecondary={controlOptionsTop[key].value !== shtMarginTop}
												isPrimary={controlOptionsTop[key].value === shtMarginTop}
												onClick={() => {
													props.setAttributes( {
														shtMarginTop: controlOptionsTop[key].value,
													})
												}}
											>{controlOptionsTop[key].label}</Button>
										</Tooltip>
									)
								} )}
							</ButtonGroup>
						</div>
						<div className="components-base-control">
							<label class="components-base-control__label">{ __( 'Abstand unten ändern', 'sht' ) }</label>
							<ButtonGroup>
								{Object.keys( controlOptionsBottom ).map( key => {
									return (
										<Tooltip text={controlOptionsTop[key].title}>
											<Button
												isSecondary={controlOptionsBottom[key].value !== shtMarginBottom}
												isPrimary={controlOptionsBottom[key].value === shtMarginBottom}
												onClick={() => {
													props.setAttributes( {
														shtMarginBottom: controlOptionsBottom[key].value,
													})
												}}
											>{controlOptionsBottom[key].label}</Button>
										</Tooltip>
									)
								} )}
							</ButtonGroup>
						</div>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, 'addMarginControls' );

// font size filter
addFilter( 'blocks.registerBlockType', 'sht/attribute/block-margin', addMarginAttribute );
addFilter( 'editor.BlockEdit', 'sht/control/block-margin', addMarginControls );
