/**
 * Image object selector for Say Hello components
 * mark@sayhello.ch 23.5.2022
 *
 * This version uses the core data store and should be used if the
 * image is being rendered via ServerSideRender or directly using a React component.
 *
 * The matching attribute (e.g. 'image') must be an Object, not just a Number.
 *
 * Usage:
 *
 * Attribute in main file:
 
image: {
    type: 'Object',
    default: {
        id: false,
    },
},
     
 * Component use:
        
<ImageObjectSelector
	attributes={attributes}
	setAttributes={setAttributes}
	attributeKey="image"
	allowedTypes={['image/jpg', 'image/jpeg']}
/>
 * 
 * OR
 *
<ImageObjectSelector
	attributes={attributes}
	setAttributes={setAttributes}
/>
 */

import { BaseControl, Button } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { MediaUploadCheck, MediaUpload } from '@wordpress/block-editor';
import { _x } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';
import srcSetAttribute from '../srcset-attribute';

import './index.scss';

const classNameBase = 'c-imageselector';

const PreviewImage = props => {
    const { image } = props;

    if (!image.id) {
        return '';
    }

    const { alt, sizes, url } = image;

    return (
        <img
            src={url}
            alt={alt}
            srcset={srcSetAttribute(sizes)}
            className={`${classNameBase}__image`}
        />
    );
};

const ImageObjectSelector = props => {
    const { allowedTypes, attributes, attributeKey, setAttributes, label, preview_image } = props;

    const allowed_types = allowedTypes || ['image'];
    const attribute_key = attributeKey || 'image';

    const image_id = attributes[attribute_key].id || 0;

    return (
        <BaseControl label={label}>
            <div className={classNameBase}>
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={media => {
                            setAttributes({ [attribute_key]: media });
                        }}
                        allowedTypes={allowed_types}
                        value={image_id}
                        render={({ open }) => {
                            const image = attributes[attribute_key];

                            return (
                                <figure
                                    className={`${classNameBase}__figure ${
                                        !image ? `${classNameBase}__figure--noimage` : ''
                                    }`}
                                >
                                    {!!image_id && (
                                        <PreviewImage image={attributes[attribute_key]} />
                                    )}
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
                                                        setAttributes({
                                                            [attribute_key]: { id: 0 },
                                                        })
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
})(ImageObjectSelector);
