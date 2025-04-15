/**
 * Image selector component for WordPress Block Editor
 * Image attribute is an object containing the ID.
 * Last updated 15 th April 2025
 * mark@sayhello.ch
 *
 * Usage:
 *
 	image: {
		type: 'object',
		default: {
			id: 0,
		},
	},
	…
	import ImageSelector from '../_components/ImageSelector/index.js';
	…
	const { image } = attributes;
	<ImageSelector attributes={attributes} setAttributes={setAttributes} />
 * 
 **/

import { BaseControl, Button } from '@wordpress/components';
import { MediaUploadCheck, MediaUpload } from '@wordpress/block-editor';
import { _x } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';

import './index.scss';

const classNameBase = 'c-imageselector';

const PreviewImage = ({ image }) => {
    if (!image?.media_details?.sizes?.medium?.source_url) {
        return null;
    }

    const { source_url } = image.media_details.sizes.medium;
    const { alt_text } = image;

    return <img src={source_url} alt={alt_text} className={`${classNameBase}__image`} />;
};

const ImageSelector = ({
    allowedTypes = ['image'],
    attributes,
    attributeKey = 'image',
    setAttributes,
    label,
    withPreviewImage = false,
}) => {
    const imageAttr = attributes[attributeKey];
    const imageId = imageAttr?.id;

    const previewImage = useSelect(
        select => (imageId != null ? select('core').getMedia(imageId) : null),
        [imageId]
    );

    return (
        <BaseControl label={label}>
            <div className={classNameBase}>
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={media => {
                            setAttributes({ [attributeKey]: { id: media?.id } });
                        }}
                        allowedTypes={allowedTypes}
                        value={imageId}
                        render={({ open }) => (
                            <figure
                                className={`${classNameBase}__figure ${
                                    !imageId ? `${classNameBase}__figure--noimage` : ''
                                }`}
                            >
                                {withPreviewImage && previewImage && (
                                    <PreviewImage image={previewImage} />
                                )}
                                <div className={`${classNameBase}__buttons`}>
                                    {!imageId && (
                                        <Button onClick={open} variant='primary'>
                                            {_x(
                                                'Bild auswählen',
                                                'Admin component button text',
                                                'sha'
                                            )}
                                        </Button>
                                    )}
                                    {!!imageId && (
                                        <>
                                            <Button onClick={open} variant='primary'>
                                                {_x(
                                                    'Bild ersetzen',
                                                    'Admin component button text',
                                                    'sha'
                                                )}
                                            </Button>
                                            <Button
                                                onClick={() => setAttributes({ [attributeKey]: 0 })}
                                                variant='link'
                                                isDestructive
                                            >
                                                {_x(
                                                    'Bild entfernen',
                                                    'Admin component button text',
                                                    'sha'
                                                )}
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </figure>
                        )}
                    />
                </MediaUploadCheck>
            </div>
        </BaseControl>
    );
};

export default ImageSelector;
