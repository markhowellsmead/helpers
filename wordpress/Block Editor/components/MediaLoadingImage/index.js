/**
 * Loading Image with spinner, for use with the regular
 * Media controller, which is implemented with the
 * MediaReplaceFlow or MediaPlaceholder components.
 *
 * The image object will be {url: blob://....} during
 * the upload process, so we can use this to render a
 * preview image.
 *
 * mark@sayhello.ch since January 2023
 */

import { isBlobURL } from '@wordpress/blob';
import { Spinner } from '@wordpress/components';

const MediaUploadLoadingImage = (props) => {
	const { classNameBase, image } = props;

	const isUploadingMedia = !image.id && isBlobURL(image.url);

	if (!image.url || !isUploadingMedia) {
		return null;
	}

	return (
		<div style={{ position: 'relative' }}>
			<img
				src={image.url}
				alt={null}
				onError={(error) => console.error(error)}
				ref={image}
				className={`${classNameBase}__loading-image`}
				style={{ opacity: 0.25 }}
			/>
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%,-50%)',
				}}
			>
				<Spinner />
			</div>
		</div>
	);
};

export default MediaUploadLoadingImage;
