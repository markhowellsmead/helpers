/**
 * Usage:
 <CategorySelector
		category={attributes.category}
		onChange={category => {
		setAttributes({ category: category });
    }}/>
*/

import { _x } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';
import { Component } from '@wordpress/element';
import { select, withSelect } from '@wordpress/data';

class CategorySelector extends Component {
	constructor() {
		super(...arguments);
	}

	render() {
		const { category, categories, onChange } = this.props;

		return (
			<SelectControl
				label={_x('Kategorie auswählen', 'Select field label', 'sht')}
				value={category}
				options={categories}
				onChange={onChange}
			/>
		);
	}
}

export default withSelect((select, props) => {
	let categories = [
		{
			label: _x('Auswählen', 'Default selector label', 'sht'),
			value: ''
		}
	];

	let categoryEntries = select('core').getEntityRecords(
		'taxonomy',
		'category',
		{
			order_by: 'name',
			per_page: -1
		}
	);

	if (categoryEntries) {
		categoryEntries.map(category => {
			categories.push({ value: category.id, label: category.name });
		});
	}

	return {
		categories: categories
	};
})(CategorySelector);
