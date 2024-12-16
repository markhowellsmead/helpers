/**
 * Hierarchical Post selector for Say Hello components
 * Requires the “terms” util.
 * mark@sayhello.ch 16.12.2024
 *
 * output: 'select' (SelectControl), otherwise TreeSelect
 *
 * Usage:
 <PostTreeSelect
 	postType="sht_proissue"
 	orderBy="menu_order"
 	attributes={attributes}
 	setAttributes={setAttributes}
 	attributeName="my_attribute"
 	label={_x( 'Hauptausgabe auswählen', 'Select field label', 'sha' )}
    query={{search:'Hello'}}
    output={'select'}
 />
 */

import { _x } from '@wordpress/i18n';
import { SelectControl, Spinner, TreeSelect } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

import { buildTermsTree } from './_build-terms-tree.js';

export const PostTreeSelector = (props) => {
	const { attributes, setAttributes, label, attributeKey, output, orderBy, toplevel, postType, query } = props;

	const attribute_key = attributeKey || 'post';

	// Using useSelect to fetch data
	const selectOptions = useSelect(
		(select) => {
			const { getEntityRecords } = select('core');

			const order_by = orderBy || 'menu_order';

			const queryArgs = {
				per_page: 100,
				order_by: order_by,
				order: 'asc',
			};

			let queryArgsMerged = {
				...queryArgs,
				...query,
			};

			// Only posts with no parent
			if (!!toplevel) {
				queryArgsMerged.parent = 0;
			}

			let posts = getEntityRecords('postType', postType, queryArgsMerged);

			if (!posts) {
				return null;
			}

			let options = [
				{
					id: '',
					parent: 0,
					title: _x('Keine Auswahl', 'Default selector label', 'sha'),
				},
			];

			posts.map((post) => {
				options.push({
					id: post.id,
					parent: post.parent,
					title: post.title.rendered ? post.title.rendered : `#${post.id} (${__('Kein Titel', 'sha')})`,
				});
			});

			return options;
		},
		[orderBy, toplevel, postType, query]
	);

	if (!selectOptions) {
		return <Spinner />;
	} else {
		if (output === 'select') {
			const options = selectOptions.map((item) => ({
				value: item.id,
				label: item.title,
			}));

			return (
				<SelectControl
					label={label}
					value={attributes[attribute_key]}
					options={options}
					onChange={(post) => {
						setAttributes({ [attribute_key]: post });
					}}
				/>
			);
		} else {
			const treeMap = selectOptions.map((item) => ({
				id: item.id,
				parent: item.parent,
				name: item.title,
			}));

			const treeOptions = buildTermsTree(treeMap);

			return (
				<TreeSelect
					label={label}
					tree={treeOptions}
					selectedId={attributes[attribute_key]}
					onChange={(post) => {
						setAttributes({ [attribute_key]: post });
					}}
				/>
			);
		}
	}
};
