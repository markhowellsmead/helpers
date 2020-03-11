const { _x } = wp.i18n;
const { ServerSideRender, PanelBody, SelectControl } = wp.components;
const { select } = wp.data;
const { InspectorControls } = wp.blockEditor;
const { Component, Fragment } = wp.element;
const { withSelect } = wp.data;

class TaxonomySelector extends Component {

	constructor() {
		super( ...arguments );
	}

	setTaxonomy( taxonomy ) {
		const { setAttributes } = this.props;
		setAttributes( { taxonomy } );
	}

	render() {

		const { attributes, name, selectOptions } = this.props;
		const { taxonomy } = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={_x( 'Block Options', 'Editor panel title', 'sha' )} initialOpen={true}>
						<SelectControl
							label={_x( 'Kurstyp auswählen', 'Select field label', 'sha' )}
							value={taxonomy}
							options={selectOptions}
							onChange={this.setTaxonomy.bind( this )}
						/>
					</PanelBody>
				</InspectorControls>
				<ServerSideRender
					block={name}
					attributes={attributes}/>
			</Fragment>
		);
	}
}

export default withSelect( ( select, props ) => {

	const { getEntityRecords } = select( 'core' );

	let taxonomies = getEntityRecords( 'taxonomy', 'shp_courses_type', {
		per_page: -1,
		orderby: 'name',
		order: 'asc'
	} );

	if ( !taxonomies ) {
		return taxonomies;
	}

	let selectOptions = [{
		label: _x( 'Auswählen', 'Default selector label', 'sha' ),
		value: ''
	}];

	taxonomies.map( tax => {
		selectOptions.push( { value: tax.id, label: tax.name } );
	} );

	return {
		selectOptions: selectOptions
	};
} )( TaxonomySelector );
