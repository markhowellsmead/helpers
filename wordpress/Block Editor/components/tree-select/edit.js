import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	Disabled,
	PanelBody,
	TreeSelect,
	Spinner,
} from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { __, _x } from '@wordpress/i18n';
import ServerSideRender from '@wordpress/server-side-render';

import metadata from '../../../../block.json';

const Edit = ({ attributes, setAttributes, api_categories }) => {
	const { category } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title={_x('Settings')} initialOpen={true}>
					{(!api_categories || !api_categories.length) && <Spinner />}
					{!!api_categories.length && (
						<TreeSelect
							label={_x(
								'Select a category',
								'SelectControl label',
								'shp_gantrisch_adb'
							)}
							selectedId={category}
							onChange={(category) => {
								setAttributes({ category });
							}}
							tree={api_categories}
						/>
					)}
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				<Disabled>
					<ServerSideRender
						block={metadata.name}
						attributes={{ category }}
					/>
				</Disabled>
			</div>
		</>
	);
};

export default withSelect((select, props) => {
	let api_categories = [
		{
			id: 0,
			label: __('Select'),
		},
	];

	let categoryEntries = select(
		'shp_gantrisch_adb/categories_for_select'
	).getCategories();

	if (categoryEntries) {
		categoryEntries.map((category) => {
			const entry = {
				id: category.id,
				name: category.label,
				children: [],
			};

			if (category.children.length) {
				category.children.map((child) => {
					entry.children.push({
						id: child.id,
						name: child.label,
					});
				});
			}

			api_categories.push(entry);

			return category;
		});
	}

	return { ...props, api_categories: api_categories };
})(Edit);
