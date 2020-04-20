import { Button } from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';
import { MediaUploadCheck, MediaUpload } from '@wordpress/block-editor';
import { _x } from '@wordpress/i18n';

export default class extends Component {
	constructor(props) {
		super(...arguments);
		this.props = props;
	}

	render() {
		const { allowedTypes, attributes, attributeKey, image, label, setAttributes } = this.props;

		const allowed_types = allowedTypes || ['image/jpg', 'image/jpeg'];
		const attribute_key = attributeKey || 'image';

		return (
			<div class="c-fileselector">
				<MediaUploadCheck>
					<MediaUpload
						onSelect={image => {
							setAttributes({ [attribute_key]: image });
						}}
						allowedTypes={allowed_types}
						value={[attribute_key].id}
						render={({ open }) => {
							return (
								<Fragment>
									<label class="components-base-control__label" for="inspector-select-control-1">
										{label}
									</label>
									<div className={`c-fileselector__figure ${!image.id ? 'c-fileselector__figure--nofile' : ''}`}>
										{image.id && image.sizes && <img src={image.sizes.thumbnail.url} />}
										{image.id && !image.sizes && <img src={image.url} />}
										<div class="c-fileselector__buttons">
											{!image.id && (
												<Button onClick={open} isDefault isLarge isPrimary>
													{_x('Datei auswählen', 'Admin component button text', 'sha')}
												</Button>
											)}
											{image.id && (
												<Fragment>
													<Button onClick={open} isDefault isLarge>
														{_x('Datei ersetzen', 'Admin component button text', 'sha')}
													</Button>
													<Button onClick={() => setAttributes({ image: { id: false } })} isDefault isSmall>
														{_x('Datei entfernen', 'Admin component button text', 'sha')}
													</Button>
												</Fragment>
											)}
										</div>
									</div>
								</Fragment>
							);
						}}
					/>
				</MediaUploadCheck>
			</div>
		);
	}
}
