import { getBlockDefaultClassName, registerBlockType } from '@wordpress/blocks';
import { InspectorControls, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { ImageControl } from '@humanmade/block-editor-components';

import { getImageDataForSize } from '../../../../../../../.build/assets/gutenberg/_components/ImageUtils';
import FocalPointControl from '../../../../../../../.build/assets/gutenberg/_components/focal-point-control';

import icon from './icon';

import block_json from '../../../../block.json';
const { name: block_name } = block_json;
const classNameBase = getBlockDefaultClassName(block_name);

registerBlockType(block_name, {
	icon,
	getEditWrapperProps(attributes) {
		return { ...attributes, 'data-align': 'wide' };
	},
	edit: ({ attributes, setAttributes }) => {
		const { imageId, focalPoint } = attributes;

		const imageData = useSelect((select) => select('core').getMedia(imageId));
		const imageDataForSize = getImageDataForSize(imageData, 'full');
		const imageFocalPointStyle = { objectPosition: `${focalPoint.x * 100}% ${focalPoint.y * 100}%` };

		const blockProps = useBlockProps(),
			ALLOWED_INNER_BLOCKS = ['core/heading', 'core/paragraph', 'core/buttons'],
			INNER_BLOCKS_TEMPLATE = [
				['core/heading', { placeholder: __('Überschrift eingeben…', 'sha') }],
				['core/paragraph', { placeholder: __('Beschreibung eingeben…', 'sha') }],
				[
					'core/buttons',
					{},
					[
						[
							'core/button',
							{
								backgroundColor: 'white',
								textColor: 'black',
								className: 'is-style-with-arrow',
								fontSize: 'xsmall',
								content: __('mehr erfahren', 'sha'),
							},
						],
					],
				],
			];

		return (
			<>
				<InspectorControls>
					<PanelBody title={__('Medien')}>
						<ImageControl
							value={imageId}
							onChange={(image) => setAttributes({ imageId: image?.id })}
							buttonText={__('Bild auswählen', 'sha')}
							modalTitle={__('Bild auswählen', 'sha')}
							removeButtonText={__('Bild entfernen', 'sha')}
							replaceButtonText={__('Bild ersetzen', 'sha')}
							label={__('Hauptbild', 'sha')}
						/>
						{imageData?.source_url && (
							<FocalPointControl imageId={imageId} attributes={attributes} setAttributes={setAttributes} attributeKey={'focalPoint'} />
						)}
					</PanelBody>
				</InspectorControls>

				<div {...blockProps}>
					{imageId && imageDataForSize && (
						<div className={`${classNameBase}__figure`}>
							<img style={imageFocalPointStyle} className={`${classNameBase}__image`} src={imageDataForSize?.src} alt={imageDataForSize?.alt} />
						</div>
					)}
					<div className={`${classNameBase}__entry-content`}>
						<InnerBlocks allowedBlocks={ALLOWED_INNER_BLOCKS} template={INNER_BLOCKS_TEMPLATE} templateLock={'all'} />
					</div>
				</div>
			</>
		);
	},
	save: () => {
		return <InnerBlocks.Content />;
	},
});
