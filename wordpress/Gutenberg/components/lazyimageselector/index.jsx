/**
 * LazyImageSelector for Say Hello components
 * mark@sayhello.ch 24.3.2020
 *
 * This version uses the lazyImage logic and can be used if the
 * image is being rendered directly in the editor. The matching
 * attribute (e.g. 'image') must be an Object, not a Number.
 *
 * Use our ImageSelector component if you need to use the
 * component with a ServerSideRender component, in which case,
 * the matching attribute must be a Number, and contain the Media ID.
 *
 * Usage:
<LazyImageSelector
	attributes={attributes}
	setAttributes={setAttributes}
	attributeKey="image"
	allowedTypes={['image/jpg', 'image/jpeg']}
	imageFormat="full"
/>
 * OR
<LazyImageSelector
	attributes={attributes}
	setAttributes={setAttributes}
/>
 */

import { Button } from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';
import { MediaUploadCheck, MediaUpload } from '@wordpress/block-editor';
import { _x } from '@wordpress/i18n';

import { getLazySrcs } from './lazyimage.jsx';

export default class LazyImageSelector extends Component {

	constructor( props ) {
		super( ...arguments );
		this.props = props;
	}

	render() {

		const {
			allowedTypes,
			attributes,
			attributeKey,
			imageFormat,
			setAttributes,
			objectFocalPoint
		} = this.props;

		const allowed_types = allowedTypes || [ 'image' ];
		const attribute_key = attributeKey || 'image';
		const image_format = imageFormat || 'full';

		let style_orig = {};
		let style_pre = {};

		if (this.props.objectFocalPoint) {
			style_orig.objectPosition = `${this.props.objectFocalPoint.x * 100}% ${this.props.objectFocalPoint.y * 100}%`;
			style_pre.objectPosition = `${this.props.objectFocalPoint.x * 100}% ${this.props.objectFocalPoint.y * 100}%`;
		}

		const image_attribute = attributes[attribute_key];

		return (
			<Fragment>
				<div className="o-imageselector">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={image => {
								getLazySrcs(image.id, image_format).then(image => setAttributes({[attribute_key]: image}));
							}}
							allowedTypes={allowed_types}
							value={image_attribute.id}
							render={({open}) => {
								return (
									<figure
										className={`o-imageselector__figure ${!image_attribute.id ? 'o-imageselector__figure--noimage' : ''}`}
										style={style_orig}
										>
										{
											!!image_attribute.id &&
											<img
												className="o-imageselector__image"
												onClick={open}
												src={image_attribute.org[0]}
												alt={image_attribute.alt}
												style={style_orig}
												/>
										}
										<div className="o-imageselector__buttons">
											{
												!image_attribute.id &&
												<Button
													onClick={open}
													isLarge
													isPrimary>
														{_x('Bild auswählen', 'Admin component button text', 'sha')}
												</Button>
											}
											{
												!!image_attribute.id &&
												<Fragment>
													<Button
														onClick={open}
														isLarge
														isPrimary>
														{_x('Bild ersetzen', 'Admin component button text', 'sha')}
													</Button>
													<Button
														onClick={() => setAttributes({[attribute_key]: {id: false}})}
														isSmall
														isSecondary>
														{_x('Bild entfernen', 'Admin component button text', 'sha')}
													</Button>
												</Fragment>
											}
										</div>
									</figure>
								);
							}}
						/>
					</MediaUploadCheck>
				</div>
			</Fragment>
		);
	}
}
