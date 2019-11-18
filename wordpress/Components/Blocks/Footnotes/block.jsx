const { __, _x } = wp.i18n;

const { Component } = wp.element;
const { InnerBlocks } = wp.blockEditor;
const { registerBlockType } = wp.blocks;

registerBlockType( 'sht/footnotes', {
	title: __( 'Fussnotizen', 'sht' ),
	icon: 'list-view',
	category: 'sht/blocks',
	keywords: [
	'Footnotes'
],
	supports: {
		group: false,
		mode: false,
		html: false,
		multiple: false,
		reusable: false
	},
	edit: class extends Component {

		constructor( props ) {
			super( ...arguments );
			this.props = props;
		}

		render() {
			return [
			(
					<div className={`b-footnotes`}>
					<InnerBlocks
						allowedBlocks={ ['core/heading'], ['core/paragraph'] }
						template={ [
							[ 'core/heading', {
								'level': 2,
								'content': _x('Fussnotizen', 'Default content', 'sht'),
							} ],
							[ 'core/paragraph' ],
						] } />
				</div>
				)
		];
		}
	},
	save() {
		return (
			<div className="b-footnotes">
			<InnerBlocks.Content />
		</div>
		);
	}
} );
