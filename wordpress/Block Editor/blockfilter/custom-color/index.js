/**
 * Add custom color control to core/group block, to allow editorial
 * control of a subelement's background color. The color is applied
 * using a CSS custom property
 *
 * Current version mark@sayhello.ch 27.10.2022
 */

import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { Fragment } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';
import { BaseControl, PanelBody } from '@wordpress/components';
import { ColorPalette, InspectorControls } from '@wordpress/block-editor';

const allowedBlocks = ['core/group'];

/**
 * Add custom block attribute to retain custom hex color
 */
addFilter('blocks.registerBlockType', 'sht/group-graphic-color', (settings) => {
	if (!allowedBlocks.includes(settings.name)) {
		return settings;
	}

	return lodash.assign({}, settings, {
		attributes: lodash.assign({}, settings.attributes, {
			graphicColor: {
				type: 'string',
			},
		}),
	});
});

/**
 * Add controls as block panel.
 */
addFilter(
	'editor.BlockEdit',
	'sht/group-graphic-color',
	createHigherOrderComponent((BlockEdit) => {
		return (props) => {
			const { name, attributes, setAttributes, isSelected } = props;

			const { graphicColor } = attributes;

			if (!isSelected || !allowedBlocks.includes(name)) {
				return <BlockEdit {...props} />;
			}
			return (
				<Fragment>
					<BlockEdit {...props} />
					<InspectorControls>
						<PanelBody
							title={__('Hintergrundgrafik', 'sht')}
							initialOpen={true}
						>
							<BaseControl label={__('Füllfarbe', 'sht')}>
								<ColorPalette
									value={graphicColor}
									disableCustomColors={false}
									onChange={(graphicColor) => {
										setAttributes({ graphicColor });
									}}
								/>
							</BaseControl>
						</PanelBody>
					</InspectorControls>
				</Fragment>
			);
		};
	})
);

/**
 * Add inline style to block wrapper in editor context
 */
addFilter(
	'editor.BlockListBlock',
	'sht/group-graphic-color',
	createHigherOrderComponent((BlockListBlock) => {
		return (props) => {
			const { attributes, name } = props,
				{ graphicColor } = attributes;

			if (!allowedBlocks.includes(name)) {
				return <BlockListBlock {...props} />;
			}

			return (
				<BlockListBlock
					{...props}
					wrapperProps={{
						style: { '--background-graphic-color': graphicColor },
					}}
				/>
			);
		};
	})
);

/**
 * Add inline style to block wrapper in save context
 */
addFilter(
	'blocks.getSaveContent.extraProps',
	'sht/group-graphic-color',
	(props, blockType, attributes) => {
		const { graphicColor } = attributes;

		if (!allowedBlocks.includes(blockType.name) || !graphicColor) {
			return props;
		}

		return lodash.assign(props, {
			style: `--background-graphic-color: ${graphicColor}`,
		});
	}
);
