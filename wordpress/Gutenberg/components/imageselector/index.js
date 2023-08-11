/**
 * Image selector for Say Hello components
 * mark@sayhello.ch 11.5.2022
 *
 * This version uses the core data store and should be used if the
 * image is being rendered via ServerSideRender.
 *
 * The matching attribute (e.g. 'image') must be a Number, not an Object.
 *
 * Usage:
<ImageSelector
	attributes={attributes}
	setAttributes={setAttributes}
	attributeKey="image"
	allowedTypes={['image/jpg', 'image/jpeg']}
/>
 * OR
<ImageSelector
	attributes={attributes}
	setAttributes={setAttributes}
/>
 */

import { BaseControl, Button } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { MediaUploadCheck, MediaUpload } from '@wordpress/block-editor';
import { _x } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';

const classNameBase = 'c-imageselector';

import './index.scss';

const PreviewImage = props => {
    const { image: imageData } = props;

    if (
        !imageData ||
        !imageData.media_details ||
        !imageData.media_details.sizes ||
        !imageData.media_details.sizes.medium ||
        !imageData.media_details.sizes.medium.source_url
    ) {
        return '';
    }

    const { source_url } = imageData.media_details.sizes.medium;
    const { alt_text } = imageData;

    return <img src={source_url} alt={alt_text} className={`${classNameBase}__image`} />;
};

const ImageSelector = props => {
    const { allowedTypes, attributes, attributeKey, setAttributes, label, preview_image } = props;

    const allowed_types = allowedTypes || ['image'];
    const attribute_key = attributeKey || 'image';

    return (
        <BaseControl label={label}>
            <div className={classNameBase}>
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={media => {
                            setAttributes({ [attribute_key]: media.id });
                        }}
                        allowedTypes={allowed_types}
                        value={attributes[attribute_key]}
                        render={({ open }) => {
                            const image = attributes[attribute_key];

                            return (
                                <figure
                                    className={`${classNameBase}__figure ${
                                        !image ? `${classNameBase}__figure--noimage` : ''
                                    }`}
                                >
                                    {!!preview_image && <PreviewImage image={preview_image} />}
                                    <div className={`${classNameBase}__buttons`}>
                                        {!image && (
                                            <Button onClick={open} variant='primary'>
                                                {_x(
                                                    'Bild auswählen',
                                                    'Admin component button text',
                                                    'sha'
                                                )}
                                            </Button>
                                        )}
                                        {!!image && (
                                            <Fragment>
                                                <Button onClick={open} variant='primary'>
                                                    {_x(
                                                        'Bild ersetzen',
                                                        'Admin component button text',
                                                        'sha'
                                                    )}
                                                </Button>
                                                <Button
                                                    onClick={() =>
                                                        setAttributes({ [attribute_key]: 0 })
                                                    }
                                                    variant='link'
                                                    isDestructive
                                                >
                                                    {_x(
                                                        'Bild entfernen',
                                                        'Admin component button text',
                                                        'sha'
                                                    )}
                                                </Button>
                                            </Fragment>
                                        )}
                                    </div>
                                </figure>
                            );
                        }}
                    />
                </MediaUploadCheck>
            </div>
        </BaseControl>
    );
};

export default withSelect((select, props) => {
    const { attributes, attributeKey } = props;

    const image = attributes[attributeKey];

    if (!!image) {
        return {
            ...props,
            preview_image: select('core').getMedia(image),
        };
    }

    return props;
})(ImageSelector);
