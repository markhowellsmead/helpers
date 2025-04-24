import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { __experimentalHStack as HStack, ToggleControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';

/**
 * Adds a new attribute to the core/columns block for mobile reverse.
 * This attribute allows users to reverse the order of columns on mobile devices.
 */
addFilter('blocks.registerBlockType', 'my-plugin/columns-mobile-reverse-attribute', (settings, name) => {
	if (name === 'core/columns') {
		settings.attributes = {
			...settings.attributes,
			mobileReverse: {
				type: 'boolean',
				default: false,
			},
		};
	}
	return settings;
});

/**
 * Adds a toggle to the block inspector for the mobile reverse option.
 * This toggle allows users to reverse the column order on mobile devices.
 */
const withMobileReverseToggle = createHigherOrderComponent(
	(BlockEdit) => (props) => {
		if (props.name !== 'core/columns') {
			return <BlockEdit {...props} />;
		}
		const {
			attributes: { mobileReverse },
			setAttributes,
		} = props;
		return (
			<Fragment>
				<BlockEdit {...props} />
				<InspectorControls>
					<HStack className={'c-inspectorcontrols__custom-control'}>
						<ToggleControl label="Reverse direction on mobile devices" checked={!!mobileReverse} onChange={(value) => setAttributes({ mobileReverse: !!value })} />
					</HStack>
				</InspectorControls>
			</Fragment>
		);
	},
	'withMobileReverseToggle'
);
addFilter('editor.BlockEdit', 'my-plugin/columns-mobile-reverse-toggle', withMobileReverseToggle);

/**
 * Adds a class for the mobile reverse option in the view context.
 */
function addMobileReverseClass(extraProps, blockType, attributes) {
	if (blockType.name === 'core/columns' && attributes.mobileReverse) {
		extraProps.className = [extraProps.className, 'wp-block-columns--mobile-reverse'].filter(Boolean).join(' ');
		console.log('extraProps', extraProps);
	}
	return extraProps;
}
addFilter('blocks.getSaveContent.extraProps', 'my-plugin/columns-mobile-reverse-class-save', addMobileReverseClass);

/**
 * Adds a class for the mobile reverse option in the edit context.
 */
const withMobileReverseClass = createHigherOrderComponent(
	(BlockListBlock) => (props) => {
		const { name, attributes, className = '' } = props;
		if (name === 'core/columns' && attributes.mobileReverse) {
			return <BlockListBlock {...props} className={className + ' wp-block-columns--mobile-reverse'} />;
		}
		return <BlockListBlock {...props} />;
	},
	'withMobileReverseClass'
);

addFilter('editor.BlockListBlock', 'my-plugin/columns-mobile-reverse-class-edit', withMobileReverseClass);
