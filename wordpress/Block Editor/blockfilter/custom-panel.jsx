/**
 * Add custom panel including a custom TextControl
 * to the Block sidebar (which is visible when the
 * Block is in the array in isValidBlockType and 
 * also when the Block is selected in the Editor).
 * 
 * mark@sayhello.ch 11.6.2020
 */
 
import { TextControl, PanelBody } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { addFilter } from '@wordpress/hooks';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const isValidBlockType = function ( name ) {
	return [
		'core/paragraph',
		'core/image',
		'core/heading',
	].includes( name );
};

export const addMyCustomBlockControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		if ( isValidBlockType( props.name ) && props.isSelected ) {
			return (
				<Fragment>
					<BlockEdit { ...props } />
					<InspectorControls>
						<PanelBody title={ __( 'My Custom Panel Heading' ) }>
							<TextControl
								label={ __( 'My Custom Control' ) }
								help={ __( 'Some help text for my custom control.' ) }
								value={ props.attributes.scheduledStart || '' }
								onChange={ ( nextValue ) => {
									props.setAttributes( {
										scheduledStart: nextValue,
									} );
								} } />
						</PanelBody>
					</InspectorControls>
				</Fragment>
			);
		}

		return <BlockEdit { ...props } />;
	};
}, 'addMyCustomBlockControls' );

addFilter( 'editor.BlockEdit', 'my-plugin/my-control', addMyCustomBlockControls );
