import {__, _x} from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { Component} from '@wordpress/element';
import { getBlockDefaultClassName, registerBlockType } from '@wordpress/blocks';

registerBlockType('sht/subtitle', {
	title: _x('Untertitel', 'Block title', 'sha'),
	icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><defs><clipPath id="a"><path d="M0 0h24v24H0z"/></clipPath></defs><g clip-path="url(#a)"><path fill="#fff" d="M0 0h24v24H0z"/><path data-name="Path 1" d="M19.616 13.656V3h-3.768v10.656a4.288 4.288 0 01-.768 2.82 3.53 3.53 0 01-2.784.9 4.341 4.341 0 01-1.836-.324 2.781 2.781 0 01-1.068-.84 2.777 2.777 0 01-.5-1.188 7.767 7.767 0 01-.12-1.368V3H5v10.656q0 3.5 1.908 5.184a7.89 7.89 0 005.388 1.68 7.918 7.918 0 005.376-1.692 6.494 6.494 0 001.944-5.172z"/></g></svg>,
	category: 'common',
	keywords: [
		_x('Titel', 'Gutenberg block keyword', 'sha'),
		'Subtitle'
	],
	supports: {
		html: false,
		reusable: false
	},
	attributes: {
		content: {
			type: 'string',
			default: ''
		}
	},
	edit: class extends Component {

		constructor(props) {
			super(...arguments);
			this.props = props;
		}

		render() {

			const { attributes, className, setAttributes } = this.props;
			const { content } = attributes;

			return [
				(
					<div className={className}>
						<RichText
							tagName="p"
							format="string"
							allowedFormats={ [] }
							formattingControls={ [] }
							placeholder={ _x('Geben Sie einen Untertitel ein', 'Field placeholder', 'sha') }
							className={ `${className}__content` }
							multiline={ false }
							value={ content }
							keepPlaceholderOnFocus={ true }
							onChange={(value) => {
								setAttributes({content: value.replace(/<\/?[^>]+(>|$)/g, '')});
							}}
						/>
					</div>
				)
			];
		}
	},
	save({ attributes }){
		const className = getBlockDefaultClassName( 'sht/subtitle' );
		const { content } = attributes;
		return(
			<RichText.Content tagName="p" className={ `${className}__content` } value={ content } />
		);
	}
});
