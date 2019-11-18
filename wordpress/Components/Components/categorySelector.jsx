const { _x } = wp.i18n;
const { SelectControl } = wp.components;
const { Component } = wp.element;
const { select, withSelect } = wp.data;

class CategorySelector extends Component {

	constructor() {
		super( ...arguments );
	}

	render() {

		const { category, categories, onChange } = this.props;

		return (
			<SelectControl
				label={_x( 'Kategorie auswählen', 'Select field label', 'sha' )}
				value={ category }
				options={ categories }
				onChange={ onChange }
			/>
		);
	}
}

export default withSelect( ( select, props ) => {

	let categories = [{
		label: _x( 'Auswählen', 'Default selector label', 'sha' ),
		value: ''
	}];

	let categoryEntries = select( 'core' ).getEntityRecords('taxonomy', 'category', {
		order_by: 'name',
		per_page: -1
	});

	if ( categoryEntries ) {
		categoryEntries.map( category => {
			categories.push( { value: category.id, label: category.name } );
		} );
	}

	return {
		categories: categories
	};

} )( CategorySelector );
