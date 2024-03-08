import { __ } from '@wordpress/i18n';
import { getBlockDefaultClassName, registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { SelectControl, PanelBody, Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { menu as icon } from '@wordpress/icons';

import block_json from '../../../../block.json';
const { name: blockName } = block_json;
const classNameBase = getBlockDefaultClassName(blockName);

import './data-store';

registerBlockType(blockName, {
	icon,
	edit: ({ attributes, setAttributes }) => {
		const { menu, mode } = attributes;

		const menus = useSelect((select) => {
			return select('sht/menu-positions').getEntries();
		});

		const options = [];
		const menu_choices = [];

		if (!!menus) {
			menus.map((menu) => {
				options.push({
					label: menu.title,
					value: menu.id,
				});

				menu_choices[menu.id] = menu.title;
			});
		}

		const modes = [
			{
				label: __('All entries', 'shp_hotel_aare_mu'),
				value: 'all',
			},
			{
				label: __('Only top level', 'shp_hotel_aare_mu'),
				value: 'top-level',
			},
			{
				label: __('Only submenus', 'shp_hotel_aare_mu'),
				value: 'sub-level',
			},
		];

		const blockProps = useBlockProps();

		return [
			<>
				<InspectorControls>
					<PanelBody title={__('Block options', 'shp_hotel_aare_mu')} initialOpen={true}>
						{!menus && <Spinner />}
						{!!menus && <SelectControl label={__('Select predefined menu', 'shp_hotel_aare_mu')} value={menu} onChange={(menu) => setAttributes({ menu })} options={options} />}
						{!!menus && <SelectControl label={__('Mode', 'shp_hotel_aare_mu')} value={mode} onChange={(mode) => setAttributes({ mode })} options={modes} />}
					</PanelBody>
				</InspectorControls>
				<div {...blockProps}>
					<div className={`${classNameBase}__editorplaceholder`}>
						{!!menu_choices[menu] && <div dangerouslySetInnerHTML={{ __html: __('Menu «%s»', 'shp_hotel_aare_mu').replace('%s', menu_choices[menu]) }} />}
						{!menu_choices[menu] && <div dangerouslySetInnerHTML={{ __html: __('No menu selected', 'shp_hotel_aare_mu') }} />}
					</div>
				</div>
			</>,
		];
	},
});
