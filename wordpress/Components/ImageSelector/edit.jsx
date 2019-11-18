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

const { Button } = wp.components;
const { Component, Fragment } = wp.element;
const { MediaUploadCheck, MediaUpload } = wp.blockEditor;
const { _x } = wp.i18n;

import { getLazySrcs } from './LazyImage.jsx';

export class ImageSelector extends Component {

	constructor(props) {
		super(...arguments);
		this.props = props;
	}

	render() {

		const { allowedTypes, attributes, attributeKey, image, imageFormat, setAttributes } = this.props;

		const allowed_types = allowedTypes || ['image/jpg', 'image/jpeg'];
		const attribute_key = attributeKey || 'image';
		const image_format = imageFormat || 'full';

		return (
			<Fragment>
				<div class="c-imageselector">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={image => {
								getLazySrcs(image.id, image_format).then(image => setAttributes({[attribute_key]: image}));
							}}
							allowedTypes={allowed_types}
							value={[attribute_key].id}
							render={({open}) => {
								return (
									<Fragment>
										<figure className={`c-imageselector__figure ${!image.id ? 'c-imageselector__figure--noimage' : ''}`}>
											{
												image.id &&
												<img class="c-imageselector__image" onClick={open} src={image.org[0]} alt={image.alt}/>
											}
											<div class="c-imageselector__buttons">
												{
													!image.id &&
													<Button onClick={open} isDefault isLarge isPrimary>
														{_x('Bild auswählen', 'Admin component button text', 'sha')}
													</Button>
												}
												{
													image.id &&
													<Fragment>
														<Button onClick={open} isDefault isLarge>
															{_x('Bild ersetzen', 'Admin component button text', 'sha')}
														</Button>
														<Button onClick={() => setAttributes({image: {id: false}})} isDefault isSmall>
															{_x('Bild entfernen', 'Admin component button text', 'sha')}
														</Button>
													</Fragment>
												}
											</div>
										</figure>
									</Fragment>
								);
							}}
						/>
					</MediaUploadCheck>
				</div>
			</Fragment>
		);
	}
}
