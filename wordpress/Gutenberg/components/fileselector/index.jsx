/**
 * File selector for Say Hello components
 * mark@sayhello.ch 24.6.2020
 *
 * Usage:
	<FileSelector
		className='c-block__file'
		image={this.props.attributes.file}
		attributeKey='file'
		allowed_types={['application/pdf']}
		attributes={this.props.attributes}
		setAttributes={this.props.setAttributes}
		/>
 */

import { Button } from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';
import { MediaUploadCheck, MediaUpload } from '@wordpress/block-editor';
import { _x } from '@wordpress/i18n';

export class FileSelector extends Component {

	constructor( props ) {
		super( ...arguments );
		this.props = props;
	}

	render() {

		const { attributes, allowedTypes, attributeKey, setAttributes, className } = this.props;

		const allowed_types = allowedTypes ?? [];
		const attribute_key = attributeKey || 'file';
		const file_attribute = attributes[ attribute_key ];

		return (
			<Fragment>
				<div className="c-mediaselector components-base-control components-file-selector">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={file => {
								setAttributes({[attribute_key]: file});
							}}
							allowedTypes={allowed_types}
							value={file_attribute.id}
							render={({open}) => {
								return (
									<Fragment>
										<div className={`c-mediaselector__figure${!file_attribute.id ? ' c-mediaselector__figure--nofile' : ''}`}>
											{
												file_attribute.id &&
												<Fragment>
													{
														!!file_attribute.sizes.thumbnail.url &&
														<img onClick={open} className="c-mediaselector__file" src={file_attribute.sizes.thumbnail.url} alt={file_attribute.alt} />
													}
													{
														!file_attribute.sizes.thumbnail.url && !!file_attribute.icon &&
														<img onClick={open} className="c-mediaselector__file" src={file_attribute.icon} alt={file_attribute.alt} />
													}
													<p className="c-mediaselector__filename">{ file_attribute.url }</p>
												</Fragment>
											}
											<div className="c-mediaselector__buttons">
												{
													!file_attribute.id &&
													<Button onClick={open} isPrimary>
														{_x('Datei auswählen', 'Admin component button text', 'sha')}
													</Button>
												}
												{
													file_attribute.id &&
													<Fragment>
														<Button onClick={open} isPrimary>
															{_x('Datei ersetzen', 'Admin component button text', 'sha')}
														</Button>
														<Button onClick={() => setAttributes({file_attribute: {id: false}})} isSecondary>
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
			</Fragment>
		);
	}
}
