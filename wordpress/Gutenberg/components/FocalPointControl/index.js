/**
 * Adds a focal point picker when an image has been selected.
 * Block attributes image and focalPoint (both as objects) are
 * required. The data is used by LazyImage to create the
 * working HTML.
 *
 * mark@sayhello.ch 14.10.2021
 *
 * Usage (partial, relevant code parts):

attributes: {
    focalPoint: {
        type: 'Object',
        default: {
            x: 0.5,
            y: 0.5,
        },
    },
    image: {
        type: 'Object',
        default: {
            id: false,
        },
    },
}

import FocalPointControl from './focalpointcontrol';
…

<FocalPointControl
    image={image}
    attributes={attributes}
    setAttributes={setAttributes}
/>

 */

import { FocalPointPicker, Spinner } from '@wordpress/components';
import { withSelect } from '@wordpress/data';

const FocalPointControl = props => {
    const { image, imageData, attributes, setAttributes } = props;

    if (!image) {
        return <p>Kein Bild ausgewählt</p>;
    }

    if (!imageData) {
        return <Spinner />;
    }

    const { focalPoint } = attributes;

    return (
        <FocalPointPicker
            url={imageData.media_details.sizes.full.source_url}
            dimensions={{
                width: imageData.media_details.sizes.full.width,
                height: imageData.media_details.sizes.full.height,
            }}
            value={focalPoint}
            onChange={focalPoint => setAttributes({ focalPoint })}
        />
    );
};

export default withSelect((select, props) => {
    const { image } = props;
    return {
        imageData: image.id ? select('core').getMedia(image.id) : null,
    };
})(FocalPointControl);
