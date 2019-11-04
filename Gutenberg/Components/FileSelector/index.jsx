/**
 * File selector for Say Hello components
 * mark@sayhello.ch 4.11.2019
 *
 * Usage:
 <FileSelector
 	attributes={attributes}
 	file={attributes.file}
 	setAttributes={setAttributes}
 	attributeKey="file"
 	allowedTypes={['application/pdf']}
 />
 */

const { Button } = wp.components;
const { Component, Fragment } = wp.element;
const { MediaUploadCheck, MediaUpload } = wp.blockEditor;
const { _x } = wp.i18n;

export default class extends Component {

	constructor(props) {
		super(...arguments);
		this.props = props;
	}

	render() {

		const { allowedTypes, attributes, attributeKey, file, setAttributes } = this.props;

		const allowed_types = allowedTypes || ['image/jpg', 'image/jpeg'];
		const attribute_key = attributeKey || 'file';

		return (
			<div class="c-fileselector">
				<MediaUploadCheck>
					<MediaUpload
						onSelect={file => {
							setAttributes( {[attribute_key]: file});
						}}
						allowedTypes={allowed_types}
						value={[attribute_key].id}
						render={({open}) => {

							console.log(file);
							return (
								<Fragment>
									<div className={`c-fileselector__figure ${!file.id ? 'c-fileselector__figure--nofile' : ''}`}>
										{
											file.id &&
											<img src={ file.sizes.thumbnail.url } />
										}
										<div class="c-fileselector__buttons">
											{
												!file.id &&
												<Button onClick={open} isDefault isLarge isPrimary>
													{_x('Datei auswählen', 'Admin component button text', 'sha')}
												</Button>
											}
											{
												file.id &&
												<Fragment>
													<Button onClick={open} isDefault isLarge>
														{_x('Datei ersetzen', 'Admin component button text', 'sha')}
													</Button>
													<Button onClick={() => setAttributes({file: {id: false}})} isDefault isSmall>
														{_x('Datei entfernen', 'Admin component button text', 'sha')}
													</Button>
												</Fragment>
											}
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
