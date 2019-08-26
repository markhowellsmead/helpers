/**
 * Media selector for Say Hello components
 * mark@sayhello.ch 26.8.2019
 *
 * Usage: <ImageSelector
	 className="c-block__figure"
	 image={this.props.attributes.image}
	 image_format="full"
	 allowed_types={['image/jpg', 'image/jpeg', 'image/png']}
	 setAttributes={this.props.setAttributes}
 />
 */

const { Button } = wp.components;
const { Component, Fragment } = wp.element;
const { MediaUploadCheck, MediaPlaceholder } = wp.blockEditor;
const { _x } = wp.i18n;

import { LazyImage, getLazySrcs } from './LazyImage.jsx';

export class ImageSelector extends Component {

	constructor(props) {
		super(...arguments);
		this.props = props;
	}

	render() {

		const { image, image_format, allowed_types, setAttributes, className } = this.props;

		if(!allowed_types) {
			allowed_types = ['image/jpg', 'image/jpeg', 'image/png'];
		}

		return (
			<Fragment>
				{
					image.id &&
					<Fragment>
						<LazyImage className={className} image={image} background={false} admin={true}/>
						{
							image.id &&
							<Button onClick={() => setAttributes({image: {id: false}})} isLink isDestructive isLarge>
								{ _x('Bild entfernen', 'Admin button text', 'sha') }
							</Button>
						}
					</Fragment>
				}
				{
					!image.id &&
					<MediaUploadCheck>
						<MediaPlaceholder
							onSelect={image => {
								getLazySrcs(image.id, image_format).then(image => setAttributes({image}));
							}}
							allowedTypes={allowed_types}
							value={image.id}
						/>
					</MediaUploadCheck>
				}
			</Fragment>
		);
	}
}
