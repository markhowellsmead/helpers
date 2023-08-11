/**
 * Usage:
	<CategorySelector
		attributes={attributes}
		setAttributes={setAttributes}
		label={_x( 'Select a category', 'Select field label', 'shp' )}
	/>
 */

import { Spinner, TreeSelect } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { Component } from '@wordpress/element';
import { __, _x } from '@wordpress/i18n';
import { Fragment } from 'react';

function decodeHtml(html) {
	var txt = document.createElement('textarea');
	txt.innerHTML = html;
	return txt.value;
}

class CategorySelector extends Component {
	constructor(props) {
		super(...arguments);
		this.props = props;
	}

	render() {
		const { attributes, setAttributes, selectOptions, label } = this.props;
		const { category_id } = attributes;

		return (
			<Fragment>
				{(!selectOptions || selectOptions.length < 2) && <Spinner />}
				{!!selectOptions && selectOptions.length > 1 && (
					<TreeSelect
						label={label}
						selectedId={category_id}
						onChange={(category_id) => {
							setAttributes({ category_id });
						}}
						tree={selectOptions}
					/>
				)}
			</Fragment>
		);
	}
}

export default withSelect((select, props) => {
	const entries = select('shp/categories_for_select').getEntries();

	let selectOptions = [
		{
			id: 0,
			name: __('No selection', 'shp'),
		},
	];

	if (!!entries) {
		entries.map((entry) => {
			selectOptions.push({
				id: entry.id,
				name: decodeHtml(entry.name),
				children: entry.children,
			});
		});
	}

	return {
		...props,
		selectOptions: selectOptions,
	};
})(CategorySelector);
