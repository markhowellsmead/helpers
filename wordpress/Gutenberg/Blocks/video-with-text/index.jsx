import { Button, SelectControl, PanelBody, ToggleControl } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck, MediaPlaceholder, InnerBlocks, RichText, InspectorControls } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { __, _x } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'sht/video-with-text', {
	title: _x( 'Video mit Text', 'Block title', 'sha' ),
	icon: <svg id="video-with-text" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><defs><filter id="Rectangle_2" x="6.845" y="5.845" width="12.155" height="12.155" filterUnits="userSpaceOnUse"><feOffset/><feGaussianBlur result="blur"/><feFlood flood-opacity=".161"/><feComposite operator="in" in2="blur"/><feComposite in="SourceGraphic"/></filter></defs><path id="Rectangle_1" data-name="Rectangle 1" fill="none" d="M0 0h20v20H0z"/><g id="Group_1" data-name="Group 1"><path id="Path_1" data-name="Path 1" d="M1.99 1h12.27a.99.99 0 0 1 .99.99v12.27a.99.99 0 0 1-.99.99H1.99a.99.99 0 0 1-.99-.99V1.99A.99.99 0 0 1 1.99 1zm11.677 12.667V2.583H2.583v11.084zM8.125 4.958a1.583 1.583 0 1 0-1.583 1.584 1.588 1.588 0 0 0 1.583-1.584zM10.5 8.917s0-4.75 2.375-4.75v7.917a.794.794 0 0 1-.792.792H4.167a.794.794 0 0 1-.792-.792V6.542c1.583 0 2.375 3.167 2.375 3.167s.792-2.375 2.375-2.375A2.928 2.928 0 0 1 10.5 8.917z"/><g filter="url(#Rectangle_2)"><g id="Rectangle_2-2" data-name="Rectangle 2" fill="#eee" stroke="#000"><path stroke="none" d="M0 0h12.155v12.155H0z" transform="translate(6.84 5.84)"/><path fill="none" d="M.5.5h11.155v11.155H.5z" transform="translate(6.84 5.84)"/></g></g><path id="Line_1" data-name="Line 1" transform="translate(8.438 8.5)" fill="none" stroke="#000" d="M0 0h7.091"/><path id="Line_2" data-name="Line 2" transform="translate(8.364 10.5)" fill="none" stroke="#000" d="M0 0h9.117"/><path id="Line_3" data-name="Line 3" transform="translate(8.364 12.5)" fill="none" stroke="#000" d="M0 0h8.104"/><path id="Line_4" data-name="Line 4" transform="translate(8.488 15.468)" fill="none" stroke="#707070" d="M0 0h2.026"/></g></svg>,
	category: 'layout',
	keywords: [
		_x( 'Video', 'Gutenberg block keyword', 'sha' ),
	],
	supports: {
		align: [
			'wide',
			'full'
		],
	},
	attributes: {
		title: {
			type: 'string',
			default: ''
		},
		video: {
			type: 'Object',
			default: {
				id: false,
			}
		},
	},
	edit( props ) {
		return [
			(
				<InspectorControls>
					<PanelBody
						title={__('Video', 'sha')}
						initialOpen={true}
					>
						<Fragment>
							{
								props.attributes.video.id &&
								<Fragment>
									<video>
										<source src={props.attributes.video.url} type={props.attributes.video.mime} />
									</video>
									{
										props.attributes.video.id &&
										<Button onClick={() => props.setAttributes({video: {id: false}})} isLink isDestructive isLarge>
											{__('Video entfernen', 'sha')}
										</Button>
									}
								</Fragment>
							}
							{
								!props.attributes.video.id &&
									<MediaUploadCheck>
										<MediaPlaceholder
											onSelect={video => {
												props.setAttributes({video});
											}}
											allowedTypes={['video/mp4']}
											value={props.attributes.video.id}
										/>
									</MediaUploadCheck>
							}
						</Fragment>
					</PanelBody>
				</InspectorControls>
			), (
				<div className={'b-video-with-text'}>
					<div className="b-video-with-text__inner">
						<div className="b-video-with-text__contentwrapper">
							<RichText
								tagName="h2"
								placeholder={__('Titel eingeben', 'sha')}
								className="b-video-with-text__title"
								unstableOnSplit={() => false}
								value={props.attributes.title}
								keepPlaceholderOnFocus={true}
								onChange={(value) => {
									props.setAttributes({title: value});
								}}
							/>
							<InnerBlocks
								allowedBlocks={['core/paragraph', 'core/button']}
								template={[
									['core/paragraph'], ['core/button']
								]}
								templateLock={false}
							/>
						</div>
						<div className="b-video-with-text__videowrapper">
							{
								props.attributes.video.id &&
								<figure class="b-video-with-text__videoaspect">
									<div class="wp-block-embed__wrapper">
										<video class="b-video-with-text__video">
											<source src={props.attributes.video.url} type={props.attributes.video.mime} />
										</video>
									</div>
								</figure>
							}
						</div>
					</div>
				</div>
			)
		];
	},
	save( props ) {
		return (
			<div className={'b-video-with-text'}>
				<div className="b-video-with-text__inner">
					<div className="b-video-with-text__contentwrapper">
						{
							props.attributes.title &&
							<h2 className="b-video-with-text__title">{props.attributes.title}</h2>
						}
						<InnerBlocks.Content/>
					</div>
					<div className="b-video-with-text__videowrapper">
						{
							props.attributes.video.id &&
							<figure class="b-video-with-text__videoaspect">
								<div class="wp-block-embed__wrapper">
									<video class="b-video-with-text__video" controls playsinline>
										<source src={props.attributes.video.url} type={props.attributes.video.mime} />
									</video>
								</div>
							</figure>
						}
					</div>
				</div>
			</div>
		);
	}
} );
