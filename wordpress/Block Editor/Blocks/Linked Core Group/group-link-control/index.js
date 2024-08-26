import lodash from 'lodash';

import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';

import { LinkPopover } from './_components/link-popover/index.js';

/**
 * Restrict to specific blocks
 */
const allowedBlocks = ['core/group'];

/**
 * Add custom attributes for mobile visibility.
 */
addFilter('blocks.registerBlockType', 'sht/group-block-link-attributes', (settings) => {
	if (!allowedBlocks.includes(settings.name)) {
		return settings;
	}

	return lodash.assign({}, settings, {
		attributes: lodash.assign({}, settings.attributes, {
			rel: {
				type: 'string',
				default: '',
			},
			linkTarget: {
				type: 'string',
				default: '',
			},
			url: {
				type: 'string',
				default: '',
			},
			opensInNewTab: {
				type: 'boolean',
				default: false,
			},
		}),
	});
});

/**
 * Add visibility controls as block panel.
 */
addFilter(
	'editor.BlockEdit',
	'sht/group-block-link',
	createHigherOrderComponent((BlockEdit) => {
		return (props) => {
			const { name, isSelected, attributes, setAttributes } = props;
			const { linkTarget, url, rel, opensInNewTab } = attributes;

			if (!isSelected || !allowedBlocks.includes(name)) {
				return <BlockEdit {...props} />;
			}

			return (
				<>
					<LinkPopover
						attributes={{
							opensInNewTab,
							linkTarget,
							url,
							rel,
						}}
						setAttributes={setAttributes}
						isSelected={isSelected}
					/>
					<BlockEdit {...props} />
				</>
			);
		};
	})
);
