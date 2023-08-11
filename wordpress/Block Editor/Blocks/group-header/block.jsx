import { _x } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType, getBlockDefaultClassName } from '@wordpress/blocks';

registerBlockType( 'sht/group-header', {
	title: _x( 'Gruppe-Header', 'Gutenberg block name', 'sht' ),
	icon: 'slides',
	category: 'widgets',
	keywords: [
		_x('Gruppe', 'Gutenberg block keyword', 'sha'),
		_x('Header', 'Gutenberg block keyword', 'sha'),
	],
	supports: {
		mode: false,
		html: false,
		multiple: true,
		reusable: true
	},
	edit: class extends Component {
		constructor( props ) {
			super( ...arguments );
			this.props = props;
		}

		render() {

			const { className } = this.props;

			return (
				<div className={className}>
					<InnerBlocks
						allowedBlocks={(['core/heading'], ['core/paragraph'])}
						templateLock={true}
						template={[
							[
								'core/heading',
								{
									level: 2,
									placeholder: _x('Geben Sie einen Titel ein', 'Default content', 'sha')
								}
							],
							[
								'core/paragraph',
								{
									placeholder: _x('Geben Sie einen Text ein', 'Default content', 'sha')
								}
							]
						]}
					/>
				</div>
			);
		}
	},
	save() {
		const className = getBlockDefaultClassName( 'sht/group-header' );
		return (
			<div className={className}>
				<InnerBlocks.Content />
			</div>
		);
	}
} );
