/**
 * Generates an HTML FIGURE and IMAGE set based on
 * a valid image object returned from the WordPress media control.
 * This does NOT support image objects returned from the REST API!
 *
 * Pass in the classNameBase (which is used to construct the
 * CSS class names for the elements) and the image object.
 *
 * Usage:

{!!image.id && (
    <FigureWithImageFromMedia classNameBase={classNameBase} image={image} focalPoint={focalPoint} lazy={true} />
)}

 * mark@sayhello.ch since 1.2.2022
 */

import srcSetAttribute from '../srcset-attribute';

const FigureWithImageFromMedia = props => {
    const { image, classNameBase, focalPoint, lazy = true } = props;

    if (!image.id) {
        return '';
    }

    const { alt, sizes, url, title } = image;

    let image_style = {};

    if (!!focalPoint) {
        image_style.objectPosition = `${focalPoint.x * 100}% ${focalPoint.y * 100}%`;
    }

    return (
        <figure className={`${classNameBase}__figure`}>
            <img
                src={url}
                srcset={srcSetAttribute(sizes)}
                alt={alt || title}
                className={`${classNameBase}__image`}
                loading={!!lazy ? 'lazy' : 'eager'}
                style={image_style}
            />
        </figure>
    );
};

export default FigureWithImageFromMedia;
