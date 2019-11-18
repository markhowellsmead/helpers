const { _x } = wp.i18n;
const { InnerBlocks, RichText } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { Component } = wp.element;

registerBlockType( 'sht/accordion', {
	title: _x( 'Akkordeon', 'Block title', 'sha' ),
	icon: 'format-aside',
	category: 'sht/blocks',
	attributes: {
		blockId: {
			type: 'string',
			default: ''
		},
		title: {
			type: 'string',
			default: ''
		}
	},
	supports: {
		mode: false,
		html: false,
		multiple: true,
		reusable: true
	},
	getEditWrapperProps( attributes ) {
		return { 'data-align': 'wide' };
	},
	edit: class extends Component {

		constructor( props ) {
			super( ...arguments );
			this.props = props;
		}

		render() {
			const { attributes, setAttributes } = this.props;

			setAttributes( { blockId: this.props.clientId } );

			return (
				<div className={`b-accordion`}>
					<RichText
						tagName="h2"
						placeholder={_x('Geben Sie einen Titel hier ein', 'RichText field placeholder', 'sha')}
						className="b-accordion__title"
						multiline={false}
						allowedFormats={[]}
						value={attributes.title}
						keepPlaceholderOnFocus={true}
						onChange={(value) => {
							setAttributes({title: value});
						}}
					/>
				<div className={`b-accordion__inner`}>
					<InnerBlocks
						allowedBlocks={ [
							'core/paragraph',
							'core/list',
							'core/heading',
							'core/columns'
						] }
					/>
				</div>
			</div>
			);
		}
	},
	save( props ) {

		const { attributes } = props;

		return (
			<div className={`b-accordion`} data-accordion>
				{
					attributes.title &&
					<div class="b-accordion__header">
						<RichText.Content
							className='b-accordion__title'
							value={attributes.title}
							tagName="h2"
							/>
						<button data-accordion-toggler class="b-accordion__trigger" aria-controls={`accordion-${ attributes.blockId }`} aria-expanded="true">
							<span class="screen-reader-text">{ _x('Diesen Bereich zu-/aufklappen', 'Accordion button text', 'sht') }</span>
							<span class="b-accordion__icon"></span>
						</button>
					</div>
				}
				<div className={`b-accordion__inner`} id={`accordion-${ attributes.blockId }`}>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
