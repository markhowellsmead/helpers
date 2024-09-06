/**
 * We save InnerBlocks.Content using the save() function so that
 * the button block content is available to the render.php file
 * as $content. The buttons are also locked in the editor so that
 * the user can't remove them (without jumping through some hurdles).
 *
 * mark@sayhello.ch 6.9.2024
*/

import { getBlockDefaultClassName, registerBlockType } from '@wordpress/blocks';
import { RichText, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import block_json from '../../../../block.json';
const { name: blockName } = block_json;
const classNameBase = getBlockDefaultClassName(blockName);

registerBlockType(blockName, {
	getEditWrapperProps: () => ({ 'data-align': 'wide' }),
	edit: (props) => {
		const { attributes, setAttributes } = props;
		const { text } = attributes;

		const blockProps = useBlockProps();

		return (
			<div {...blockProps}>
				<div className={`${classNameBase}__inner`}>
					<RichText
						key="field-text"
						value={text}
						onChange={(text) => setAttributes({ text })}
						tagName="div"
						placeholder={__('Write a lead text...', 'shp-must-use')}
						className={`${classNameBase}__text`}
					/>
					<InnerBlocks
						allowedBlocks={['core/buttons']}
						template={[
							[
								'core/buttons',
								{ lock: { move: true, remove: true } },
								[
									['core/button', { placeholder: __('Button 1', 'shp-must-use'), className: 'is-style-fill' }],
									['core/button', { placeholder: __('Button 2', 'shp-must-use'), className: 'is-style-outline' }],
								],
							],
						]}
						templateLock={false}
					/>
				</div>
			</div>
		);
	},
	save() {
		return <InnerBlocks.Content />;
	},
});
