/**
 * Provides the FigureWithImage component: a figure element with an image element inside.
 * The image element has a srcset attribute based on the available image sizes.
 * If the chosen image size is not 'full', the image element's src attribute 
 * is set to the chosen image size's source_url and there is no srcSetAttribute
 * 
 * mark@sayhello.ch since 5.3.2025
 */

import { useSelect } from '@wordpress/data';

export const FigureWithImage = ({ attributes, classNameBase, lazy = true }) => {
	const { image, imageSize } = attributes;

	if (!image?.id) {
		return '';
	}

	const imageData = useSelect((select) => select('core').getMedia(image.id));

	if (!imageData) {
		return '';
	}

	const { alt_text, media_details, source_url } = imageData;
	const { width, height, sizes } = media_details;

	// Join all of the available sizes together to form a srcset string
	const srcSetAttribute = (size, sizes) => {
		if (size === 'full') {
			return Object.entries(sizes)
				.map(([key, entry]) => `${entry.source_url} ${entry.width}w`)
				.join(', ');
		}

		return false;
	};

	const src = imageSize === 'full' ? source_url : sizes[imageSize].source_url;

	return (
		<figure className={`${classNameBase}__figure ${classNameBase}__figure--${imageSize}`}>
			<img src={src} srcset={srcSetAttribute(sizes)} alt={alt_text || ''} className={`${classNameBase}__image ${classNameBase}__image--${imageSize}`} width={width} height={height} loading={!!lazy ? 'lazy' : 'eager'} />
		</figure>
	);
};
