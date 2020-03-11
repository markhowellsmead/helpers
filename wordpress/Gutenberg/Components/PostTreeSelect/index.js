/**
 * Hierarchical Post selector for Say Hello components
 * Requires the “terms” util.
 * mark@sayhello.ch 6.11.2019
 *
 * Usage:
 <PostTreeSelect
 	postType="sht_proissue"
 	orderBy="menu_order"
 	attributes={attributes}
 	setAttributes={setAttributes}
 	label={_x( 'Hauptausgabe auswählen', 'Select field label', 'sha' )}
 />
 */

import { _x } from '@wordpress/i18n';
import { Spinner, TreeSelect } from '@wordpress/components';
import { select, withSelect } from '@wordpress/data';
import { Component } from '@wordpress/element';

import { buildTermsTree } from '../_utils/terms.jsx';

class PostSelector extends Component {
	constructor(props) {
		super(...arguments);
		this.props = props;
	}

	/**
	 * Must return a single DOM node, hence the anonymous wrapper
	 */
	render() {
		const {
			attributes,
			name,
			selectOptions,
			setAttributes,
			label
		} = this.props;
		const { post } = attributes;

		if (!selectOptions) {
			return <Spinner />;
		} else {
			const treeOptions = buildTermsTree(
				selectOptions.map(item => ({
					id: item.id,
					parent: item.parent,
					name: item.title
				}))
			);

			return (
				<TreeSelect
					label={label}
					tree={treeOptions}
					selectedId={post}
					onChange={post => {
						setAttributes({ post: post });
					}}
				/>
			);
		}
	}
}

export default withSelect((select, props) => {
	const { getEntityRecords } = select('core');

	const order_by = props.orderBy || 'menu_order';

	let posts = getEntityRecords('postType', props.postType, {
		per_page: 100,
		order_by: order_by,
		order: 'asc'
	});

	if (!posts) {
		return posts;
	}

	let selectOptions = [
		{
			label: _x('Auswählen', 'Default selector label', 'sha'),
			value: ''
		}
	];

	posts.map(post => {
		selectOptions.push({
			id: post.id,
			parent: post.parent,
			title: post.title.raw
				? post.title.raw
				: `#${item.id} (${__('Kein Titel', 'sha')})`
		});
	});

	return {
		selectOptions: selectOptions
	};
})(PostSelector);
