import { InnerBlocks } from '@wordpress/block-editor';
import { getBlockDefaultClassName, registerBlockType } from '@wordpress/blocks';
import { Component, Fragment } from '@wordpress/element';
import { _x } from '@wordpress/i18n';

registerBlockType( 'sht/test-card-using-innerblocks', {
	title: _x( 'Card with InnerBlocks', 'Block title', 'sha' ),
	description: _x( 'Card with InnerBlocks', 'Block description', 'sha' ),
	icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 5C11 4.44772 11.4477 4 12 4C12.5523 4 13 4.44772 13 5V12.1578L16.2428 8.91501L17.657 10.3292L12.0001 15.9861L6.34326 10.3292L7.75748 8.91501L11 12.1575V5Z" fill="currentColor" /><path d="M4 14H6V18H18V14H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V14Z" fill="currentColor" /></svg>,
	category: 'sht/blocks',
	keywords: [
		'download',
		'card',
	],
	supports: {
		align: false,
		html: false
	},
	edit: class extends Component {
		constructor( props ) {
			super( ...arguments );
			this.props = props;
		}

		render() {

			let classNameBase = getBlockDefaultClassName( 'sht/card-file-download' );

			return (
				<Fragment>
					<section className={`${classNameBase}`}>
						<InnerBlocks
							allowedBlocks={['core/image', 'sht/test-card-using-innerblocks-inner']}
							template={[
								['core/image', {
									url: 'https://sayhello.ch/gutenberg-demo-image-do-not-delete.jpg'
								}],
								['sht/test-card-using-innerblocks-inner']
							]}
							templateLock={true}
						/>
					</section>
				</Fragment>
			);
		}
	},
	save({ attributes }) {
		return (
			<section className={`c-card`}>
				<InnerBlocks.Content />
			</section>
		);
	}
} );


registerBlockType( 'sht/test-card-using-innerblocks-inner', {
	title: _x( 'Card with InnerBlocks - Inner', 'Block title', 'sha' ),
	description: _x( 'Card with InnerBlocks - Inner', 'Block description', 'sha' ),
	icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 5C11 4.44772 11.4477 4 12 4C12.5523 4 13 4.44772 13 5V12.1578L16.2428 8.91501L17.657 10.3292L12.0001 15.9861L6.34326 10.3292L7.75748 8.91501L11 12.1575V5Z" fill="currentColor" /><path d="M4 14H6V18H18V14H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V14Z" fill="currentColor" /></svg>,
	category: 'sht/blocks',
	supports: {
		align: false,
		html: false,
		inserter: false,
		reusable: false
	},
	edit: class extends Component {
		constructor( props ) {
			super( ...arguments );
			this.props = props;
		}

		render() {

			let classNameBase = getBlockDefaultClassName( 'sht/card-file-download' );

			return (
				<Fragment>
					<div className={`${classNameBase}__inner c-card__inner`}>
						<InnerBlocks
							allowedBlocks={['sht/card-title', 'core/paragraph', 'sht/file-download']}
							template={[
								['sht/card-title', {
									title: 'Lorem ipsum dolor sit amet'
								}],
								['core/paragraph', {
									content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
								}],
								['sht/file-download'],
							]}
							templateLock={true}
						/>
					</div>
				</Fragment>
			);
		}
	},
	save({ attributes }) {
		return (
			<div className={`c-card__inner`}>
				<InnerBlocks.Content />
			</div>
		);
	}
} );
