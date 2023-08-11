import { _x } from '@wordpress/i18n';
import {
	ServerSideRender,
	PanelBody,
	SelectControl
} from '@wordpress/components';
import { select } from '@wordpress/data';
import { InspectorControls } from '@wordpress/block-editor';
import { Component, Fragment } from '@wordpress/element';
import { withSelect } from '@wordpress/data';

class TaxonomySelector extends Component {
	constructor() {
		super(...arguments);
	}

	setTaxonomy(taxonomy) {
		const { setAttributes } = this.props;
		setAttributes({ taxonomy });
	}

	render() {
		const { attributes, name, selectOptions } = this.props;
		const { taxonomy } = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={_x('Block Options', 'Editor panel title', 'sha')}
						initialOpen={true}
					>
						<SelectControl
							label={_x(
								'Kurstyp auswählen',
								'Select field label',
								'sha'
							)}
							value={taxonomy}
							options={selectOptions}
							onChange={this.setTaxonomy.bind(this)}
						/>
					</PanelBody>
				</InspectorControls>
				<ServerSideRender block={name} attributes={attributes} />
			</Fragment>
		);
	}
}

export default withSelect((select, props) => {
	const { getEntityRecords } = select('core');

	let taxonomies = getEntityRecords('taxonomy', 'shp_courses_type', {
		per_page: -1,
		orderby: 'name',
		order: 'asc'
	});

	if (!taxonomies) {
		return taxonomies;
	}

	let selectOptions = [
		{
			label: _x('Auswählen', 'Default selector label', 'sha'),
			value: ''
		}
	];

	taxonomies.map(tax => {
		selectOptions.push({ value: tax.id, label: tax.name });
	});

	return {
		selectOptions: selectOptions
	};
})(TaxonomySelector);
