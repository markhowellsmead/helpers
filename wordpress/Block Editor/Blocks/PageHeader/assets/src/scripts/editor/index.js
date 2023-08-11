import { getBlockDefaultClassName, registerBlockType } from '@wordpress/blocks';
import { InspectorControls, withColors, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { title as icon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import ColorPicker from '../../../../../../../.build/assets/gutenberg/_components/ColorPicker';
import SrcSetAttribute from '../../../../../../../.build/assets/gutenberg/_components/src-set-attribute';

import block_json from '../../../../block.json';
const { name: block_name } = block_json;
const classNameBase = getBlockDefaultClassName(block_name);

registerBlockType(block_name, {
	icon,
	getEditWrapperProps(attributes) {
		return { ...attributes, 'data-align': 'full' };
	},
	edit: withColors('overlayColor')(function (props) {
		const blockProps = useBlockProps();
		const { attributes, setAttributes } = props;
		const { overlayColor } = attributes;

		// get current post title
		const postTitle = useSelect((select) => select('core/editor').getEditedPostAttribute('title')) || '[Seitentitel]';

		// get current post featured image
		const featuredImageId = useSelect((select) => select('core/editor').getEditedPostAttribute('featured_media'));
		const imageObject = useSelect((select) => select('core').getMedia(featuredImageId, { context: 'view' }));

		const setOverlayColor = (overlayColor) => {
			setAttributes({ overlayColor });
		};

		return (
			<>
				<InspectorControls>
					<PanelBody>
						<ColorPicker props={props} overlayColor={overlayColor} setOverlayColor={setOverlayColor} />
					</PanelBody>
				</InspectorControls>
				<div {...blockProps}>
					{overlayColor && <span aria-hidden="true" className={`${classNameBase}__background has-${overlayColor}-background-color`} />}
					{!imageObject?.source_url && <div className={`${classNameBase}__figure ${classNameBase}__figure--empty`}></div>}
					{imageObject?.source_url && (
						<div className={`${classNameBase}__figure`}>
							<img
								src={imageObject?.source_url || ''}
								srcset={SrcSetAttribute(imageObject?.media_details?.sizes)}
								alt={imageObject?.alt_text || ''}
								className={`${classNameBase}__image`}
								width={imageObject?.media_details?.width}
								height={imageObject?.media_details?.height}
								loading="eager"
							/>
						</div>
					)}
					<div className={`${classNameBase}__outer`}>
						<div className={`${classNameBase}__inner`}>
							<h1 className={`${classNameBase}__title`} dangerouslySetInnerHTML={{ __html: postTitle }} />
						</div>
					</div>
				</div>
			</>
		);
	}),
});
