// WordPress
import { RichText } from '@wordpress/block-editor';
import { getBlockDefaultClassName, registerBlockType } from '@wordpress/blocks';
import { Component } from '@wordpress/element';
import { _x } from '@wordpress/i18n';
import { image as icon } from '@wordpress/icons';

// Say Hello
import ImageSelectorWithPlaceholder from '../_components/ImageSelectorWithPlaceholder/index.jsx';
import { LazyImage } from '../_components/lazyimage.jsx';

const blockName = 'sht/image-with-text';
const classNameBase = getBlockDefaultClassName( blockName );

registerBlockType( blockName, {
	title: _x( 'Bild mit Text', 'Block title', 'sha' ),
	description: _x( 'Block mit einem Bild und einen Text nebenan.', 'Block title', 'sha' ),
	icon,
	category: 'design',
	supports: {
		align: false,
		html: false
	},
	keywords: [
		_x('Zitat mit Bild', 'Block keyword', 'sha'),
		_x('Event-Teaser', 'Block keyword', 'sha'),
	],
	example: {
		attributes: {
			text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
			imageExternalURL: 'https://sayhello.ch/gutenberg-demo-image-do-not-delete.jpg'
		},
	},
	attributes: {
		imageExternalURL: {
			source: 'attribute',
			selector: `img.${classNameBase}__imagefromurl`,
			attribute: 'src'
		},
		image: {
			type: 'Object',
			default: {
				id: false
			}
		},
		text: {
			type: 'string'
		}
	},
	edit: class extends Component {

		constructor( props ) {
			super( ...arguments );
			this.props = props;
		}

		render() {

			const { attributes, className, setAttributes } = this.props;

			const { imageExternalURL, image, text } = attributes;

			return [
				(
					<div className={ className }>
						<div className={`${classNameBase}__inner`}>
							<div className={`${classNameBase}__figurewrap`}>
								<ImageSelectorWithPlaceholder
									attributes={attributes}
									setAttributes={setAttributes}
									allowedTypes={['image/jpeg']}
									accept={'image/jpeg'}
									allowURL={true}
									labels={{
										title: _x('Bild auswählen', 'MediaPlaceholder title', 'sha'),
										instructions: _x('Bitte wählen Sie ein Bild aus. (JPG.)', 'MediaPlaceholder instructions', 'sha')
									}}
									/>
								{ !!image.id &&
									<LazyImage className={`${classNameBase}__figure`} image={image} background={false} admin={true}/>
								}
								{
									!!imageExternalURL && !image.id &&
									<figure className={`${classNameBase}__figure`}>
										<img className={`${classNameBase}__imagefromurl`} src={imageExternalURL} alt='' />
									</figure>
								}
							</div>
							<div className={`${classNameBase}__contentwrap`}>
								<RichText
									tagName='p'
									placeholder={_x('Schreiben Sie einen Text…', 'Field placeholder', 'sha')}
									className={`${classNameBase}__text`}
									value={text}
									allowedFormats={[]}
									multiline={ false }
									keepPlaceholderOnFocus={true}
									onChange={(value) => {
										setAttributes({text: value});
									}}
								/>
							</div>
						</div>
					</div>
				)
			];
		}
	},
	save( { attributes, className } ) {

		const { imageExternalURL, image, text } = attributes;

		return (
			<div className={ className }>

				<div className={`${classNameBase}__inner`}>
					<div className={`${classNameBase}__figurewrap`}>
						{ !!image.id &&
							<LazyImage className={`${classNameBase}__figure`} image={image} background={false} admin={false}/>
						}
						{
							!!imageExternalURL && !image.id &&
							<figure className={`${classNameBase}__figure`}>
								<img className={`${classNameBase}__imagefromurl`} src={imageExternalURL} alt={text} />
							</figure>
						}
					</div>
					<div className={`${classNameBase}__contentwrap`}>
						<RichText.Content
							className={`${classNameBase}__text`}
							value={text}
							tagName='p'
						/>
					</div>
				</div>
			</div>
		);
	}
} );
