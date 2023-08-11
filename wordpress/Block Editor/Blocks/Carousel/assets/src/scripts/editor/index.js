import { getBlockDefaultClassName, registerBlockType } from '@wordpress/blocks';
import { Inserter, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { IconButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import icon from './icon';

import block_json from '../../../../block.json';
const { name: block_name } = block_json;
const classNameBase = getBlockDefaultClassName(block_name);

function BlockAppender({ className, rootClientId }) {
	return (
		<Inserter
			rootClientId={rootClientId}
			renderToggle={({ onToggle, disabled }) => (
				<IconButton className={className} onClick={onToggle} disabled={disabled} label={__('Neuen Karussell-Eintrag hinzufügen', 'sha')} icon="plus" />
			)}
			isAppender
		/>
	);
}

registerBlockType(block_name, {
	icon,
	getEditWrapperProps(attributes) {
		return { ...attributes, 'data-align': 'full' };
	},
	edit: ({ clientId }) => {
		const ALLOWED_INNER_BLOCKS = ['sht/carousel-entry'],
			INNER_BLOCKS_TEMPLATE = [['sht/carousel-entry']];

		const blockProps = useBlockProps();

		return (
			<div {...blockProps}>
				<div className={`${classNameBase}__entries`}>
					<InnerBlocks
						allowedBlocks={ALLOWED_INNER_BLOCKS}
						template={INNER_BLOCKS_TEMPLATE}
						templateLock={false}
						_renderAppender={() => <BlockAppender rootClientId={clientId} className={`${classNameBase}__button-block-appender`} />}
					/>
				</div>
			</div>
		);
	},
	save: () => {
		return <InnerBlocks.Content />;
	},
});
