/**
 * Provides the ImageSizeSelector component: a SelectControl to 
 * select an image size from the list of available preset image sizes.
 * 
 * mark@sayhello.ch since 5.3.2025
 */

import { SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { _x } from '@wordpress/i18n';

export const ImageSizeSelector = ({ value, setAttributes }) => {
	const imageSizes = useSelect((select) => {
		const settings = select('core/block-editor').getSettings();
		return settings.imageSizes;
	}, []);

	if (!imageSizes || !imageSizes?.length) {
		return null;
	}

	const imageSizeOptions = imageSizes.map((imageSize) => {
		return {
			label: imageSize.name,
			value: imageSize.slug,
		};
	});

	return <SelectControl label={_x('Image size', 'SelectControl label', 'sht')} value={value} options={imageSizeOptions} onChange={(imageSize) => setAttributes({ imageSize })} />;
};
