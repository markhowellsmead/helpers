import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { comment as icon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import block_json from '../../../../block.json';
const { name: block_name } = block_json;

registerBlockType(block_name, {
	icon,
	edit: (props) => {
		const blockProps = useBlockProps();

		const { attributes, setAttributes, clientId } = props;

		setAttributes({ blockId: clientId });

		return (
			<div {...blockProps}>
				<InnerBlocks allowedBlocks={['core/paragraph', 'gravityforms/form']} template={[['core/paragraph', { placeholder: 'Add your content here' }]]} />
			</div>
		);
	},
	save: (props) => {
		const blockProps = useBlockProps.save();
		const { attributes } = props;
		const { blockId } = attributes;

		return (
			<div {...blockProps}>
				<div class="c-modal">
					<div className="c-modal__toggle-wrap">
						<button aria-controls={`block-${blockId}`} className="c-modal__toggle" aria-expanded="false" type="button">
							Toggle modal
						</button>
					</div>
					<div className="c-modal__inner" id={`block-${blockId}`} aria-hidden="true">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},
});
