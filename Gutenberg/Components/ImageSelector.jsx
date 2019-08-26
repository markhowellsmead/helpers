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
const { MediaUploadCheck, MediaUpload } = wp.blockEditor;
const { _x } = wp.i18n;

import { getLazySrcs } from './LazyImage.jsx';

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
				<MediaUploadCheck>
					<MediaUpload
						onSelect={image => {
							getLazySrcs(image.id, image_format).then(image => setAttributes({image}));
						}}
						allowedTypes={allowed_types}
						value={image.id}
						render={({open}) => {
							let title = _x('Bild auswählen', 'Block button text', 'sha');
							if (image.id) {
								title = _x('Replace Image', 'Admin component button text', 'sha');
							}
							return (
								<Fragment>
									{
										image.id &&
										<figure className="c-imageselector__figure"><img class="c-imageselector__image" onClick={open} src={image.org[0]} alt={image.alt}/></figure>
									}
									<Button onClick={open} isDefault isLarge>
										{title}
									</Button>
									{
										image.id &&
										<Button onClick={() => setAttributes({image: {id: false}})} isLink isDestructive isLarge>
											{_x('Remove image', 'Admin component button text', 'sha')}
										</Button>}

								</Fragment>
							);
						}}
					/>
				</MediaUploadCheck>
			</Fragment>
		);
	}
}
