import { _x } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import ServerSideRender from '@wordpress/server-side-render';
import { menu as icon } from '@wordpress/icons';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	Disabled,
	SelectControl,
	PanelBody,
	Spinner,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';

import block_json from '../../../block.json';
const { name: blockName } = block_json;

import './data-store';

console.log(123456789);

registerBlockType(blockName, {
	icon,
	edit: ({ attributes, setAttributes }) => {
		const { menu } = attributes;

		const menus = useSelect((select) => {
			return select('sht/menu-positions').getEntries();
		});

		const options = [];

		if (!!menus) {
			menus.map((menu) => {
				options.push({
					label: menu.title,
					value: menu.id,
				});
			});
		}

		const blockProps = useBlockProps();

		return [
			<>
				<InspectorControls>
					<PanelBody
						title={_x('Block-Optionen', 'PanelBody Title', 'sha')}
						initialOpen={true}
					>
						{!menus && <Spinner />}
						{!!menus && (
							<SelectControl
								label={_x(
									'Vordefinierte Navigation auswählen',
									'Select control label',
									'sha'
								)}
								value={menu}
								onChange={(menu) => setAttributes({ menu })}
								options={options}
							/>
						)}
					</PanelBody>
				</InspectorControls>
				<div {...blockProps}>
					<Disabled>
						<ServerSideRender
							block={blockName}
							attributes={attributes}
						/>
					</Disabled>
				</div>
			</>,
		];
	},
});
