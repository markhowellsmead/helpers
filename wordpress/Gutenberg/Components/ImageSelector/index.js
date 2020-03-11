/**
 * Media selector for Say Hello components
 * mark@sayhello.ch 26.8.2019
 *
 * Usage:
<ImageSelector
	attributes={attributes}
	image={attributes.image}
	setAttributes={setAttributes}
	attributeKey="image"
	allowedTypes={['image/jpg', 'image/jpeg']}
	imageFormat="full"
/>
 * OR
<ImageSelector
	attributes={attributes}
	image={attributes.image}
	setAttributes={setAttributes}
/>
 */

import { _x } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';
import { MediaUpload, MediaUploadCheck } from '@wordpress/data';

import { getLazySrcs } from './LazyImage.jsx';

export class ImageSelector extends Component {
	constructor(props) {
		super(...arguments);
		this.props = props;
	}

	render() {
		const {
			allowedTypes,
			attributes,
			attributeKey,
			figureClassName,
			image,
			imageFormat,
			setAttributes
		} = this.props;

		const allowed_types = allowedTypes || ['image/jpg', 'image/jpeg'];
		const attribute_key = attributeKey || 'image';
		const figure_class_name = figureClassName || '';
		const image_format = imageFormat || 'full';

		return (
			<div class="o-imageselector">
				<MediaUploadCheck>
					<MediaUpload
						onSelect={image => {
							getLazySrcs(image.id, image_format).then(image =>
								setAttributes({
									[attribute_key]: image
								})
							);
						}}
						allowedTypes={allowed_types}
						value={[attribute_key].id}
						render={({ open }) => {
							return (
								<figure
									className={`o-imageselector__figure ${
										!image.id
											? 'o-imageselector__figure--noimage'
											: ''
									} ${figure_class_name}`}
								>
									{image.id && (
										<img
											className="o-imageselector__image"
											onClick={open}
											src={image.org[0]}
											alt={image.alt}
										/>
									)}
									<div class="o-imageselector__buttons">
										{!image.id && (
											<Button
												onClick={open}
												isDefault
												isLarge
												isPrimary
											>
												{_x(
													'Bild auswählen',
													'Admin component button text',
													'sht'
												)}
											</Button>
										)}
										{image.id && (
											<Fragment>
												<Button
													onClick={open}
													isDefault
													isLarge
												>
													{_x(
														'Bild ersetzen',
														'Admin component button text',
														'sht'
													)}
												</Button>
												<Button
													onClick={() =>
														setAttributes({
															image: {
																id: false
															}
														})
													}
													isDefault
													isSmall
												>
													{_x(
														'Bild entfernen',
														'Admin component button text',
														'sht'
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
		);
	}
}
