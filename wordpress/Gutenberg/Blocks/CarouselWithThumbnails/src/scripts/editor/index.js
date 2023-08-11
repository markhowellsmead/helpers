import { getBlockDefaultClassName, registerBlockType } from '@wordpress/blocks';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
} from '@wordpress/block-editor';
import { Button, PanelBody } from '@wordpress/components';
import { _x } from '@wordpress/i18n';
import ServerSideRender from '@wordpress/server-side-render';

import block_json from '../../../block.json';
const { name: block_name } = block_json;
const classNameBase = getBlockDefaultClassName(block_name);

registerBlockType(block_name, {
	edit: ({ attributes, setAttributes, clientId }) => {
		const blockProps = useBlockProps();
		const { images, updated } = attributes;

		setAttributes({ blockId: clientId });

		return (
			<div {...blockProps}>
				<InspectorControls>
					<PanelBody title={_x('Bilder', 'PanelBody title', 'sha')}>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(selection) => {
									let images = [];
									selection.map((image) => {
										images.push(image.id);
									});

									// Force the server-side render to update
									// so that e.g. new captions are correctly
									// displayed
									setAttributes({
										images,
										updated: Date.now(),
									});
								}}
								allowedTypes={['image']}
								value={images ? images : undefined}
								multiple={true}
								gallery={true}
								addToGallery={false}
								render={({ open }) => (
									<Button variant="primary" onClick={open}>
										{!!images
											? _x(
													'Bildauswahl anpassen',
													'Media control button text',
													'sha'
											  )
											: _x(
													'Bilder auswählen',
													'Media control button text',
													'sha'
											  )}
									</Button>
								)}
							/>
						</MediaUploadCheck>
					</PanelBody>
				</InspectorControls>
				{images && (
					<ServerSideRender
						block={block_name}
						attributes={{
							images: images,
							updated: updated,
						}}
					/>
				)}
				{!images && (
					<div className="c-editormessage c-editormessage--error">
						Keine Bilder ausgewählt.
					</div>
				)}
			</div>
		);
	},
});
