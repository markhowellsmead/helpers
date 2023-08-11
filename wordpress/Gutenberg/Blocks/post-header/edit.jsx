import { _x } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { ServerSideRender } from '@wordpress/components';

import edit from './edit.jsx';

registerBlockType('sht/post-header', {
	title: _x('Post or Page Header', 'Block title', 'sha'),
	description: _x('This block automatically shows the current post/page title and optional excerpt.', 'Block instructions', 'sha'),
	icon: 'slides',
	category: 'widgets',
	supports: {
		mode: false,
		html: false,
		multiple: false,
		reusable: false,
	},
	attributes: {
		alignment: {
			type: 'string',
			default: 'center',
		},
		post_title: {
			type: 'string',
			default: '',
		},
		post_excerpt: {
			type: 'string',
			default: '',
		},
	},
	example: {
		attributes: {
			alignment: 'center',
		},
	},
	keywords: [
		_x('Excerpt',' Gutenberg block keyword', 'sha'),
		_x('Title',' Gutenberg block keyword', 'sha'),
		_x('Header',' Gutenberg block keyword', 'sha')
	],
	edit
});
