import { _x } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType, getBlockDefaultClassName } from '@wordpress/blocks';

registerBlockType( 'mhm/vertical-menu', {
	title: _x( 'Vertical menu', 'Block title', 'sha' ),
	icon: 'list-view',
	category: 'widgets',
	keywords: [
		_x('Menu', 'Block keyword', 'sha'),
		_x('Navigation', 'Block keyword', 'sha'),
		_x('List', 'Block keyword', 'sha')
	],
	supports: {
		group: true,
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
						allowedBlocks={(['core/heading'], ['core/list'])}
						template={[
							[
								'core/heading',
								{
									level: 2,
									placeholder: _x('Geben Sie einen Titel ein', 'Default content', 'sha')
								}
							],
							['core/list', {
								className: 'is-style-none'
							}]
						]}
					/>
				</div>
			);
		}
	},
	save() {
		const className = getBlockDefaultClassName( 'mhm/vertical-menu' );
		return (
			<div className={className}>
				<InnerBlocks.Content />
			</div>
		);
	}
} );
