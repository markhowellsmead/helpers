import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import block_json from '../../../../block.json';
const { name: block_name } = block_json;

import { SETTINGS_COLUMN_1, SETTINGS_COLUMN_2, SETTINGS_COLUMN_3, SETTINGS_COLUMNS } from './_settings.js';

const SQUARE_IMAGE = ['core/image', { aspectRatio: '1', sizeSlug: 'large', scale: 'cover' }, []];

const TEMPLATE_INNER = [
	['advanced-columns/column', SETTINGS_COLUMN_1, [SQUARE_IMAGE]],
	['advanced-columns/column', SETTINGS_COLUMN_2, [SQUARE_IMAGE]],
	['advanced-columns/column', SETTINGS_COLUMN_3, [SQUARE_IMAGE]],
];

const TEMPLATE_OUTER = [['advanced-columns/columns', SETTINGS_COLUMNS, TEMPLATE_INNER]];

registerBlockType(block_name, {
	edit: () => {
		return (
			<div {...useBlockProps()}>
				<InnerBlocks
					allowedBlocks={['advanced-columns/columns']}
					template={TEMPLATE_OUTER}
					templateLock="all"
				/>
			</div>
		);
	},
	save: () => {
		return (
			<div {...useBlockProps.save()}>
				<InnerBlocks.Content />
			</div>
		);
	},
});
