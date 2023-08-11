import { _x } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType, getBlockDefaultClassName } from '@wordpress/blocks';

// Menu block which is only used as a child element
// and which cannot be inserted into the editor directly
registerBlockType( 'sht/footer-with-four-menus-menu', {
	title: _x( 'Vertical menu', 'Block title', 'sha' ),
	icon: 'list-view',
	category: 'widgets',
	keywords: [
		_x('Menu', 'Block keyword', 'sha'),
		_x('Navigation', 'Block keyword', 'sha'),
		_x('List', 'Block keyword', 'sha')
	],
	supports: {
		inserter: false,
		group: false,
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
						templateLock={true}
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
		const className = getBlockDefaultClassName( 'sht/footer-with-four-menus-menu' );
		return (
			<div className={className}>
				<InnerBlocks.Content />
			</div>
		);
	}
} );

// Footer block containing a fixed collection of child blocks
registerBlockType( 'sht/footer-with-four-menus', {
	title: _x( 'Footer with four menus', 'Block title', 'sha' ),
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
		multiple: false,
		reusable: false
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
						allowedBlocks={(['core/heading'], ['sht/footer-with-four-menus-menu'])}
						templateLock={true}
						template={[
							['sht/footer-with-four-menus-menu'],
							['sht/footer-with-four-menus-menu'],
							['sht/footer-with-four-menus-menu'],
							['sht/footer-with-four-menus-menu'],
						]}
					/>
				</div>
			);
		}
	},
	save() {
		const className = getBlockDefaultClassName( 'sht/footer-with-four-menus' );
		return (
			<div className={className}>
				<InnerBlocks.Content />
			</div>
		);
	}
} );
