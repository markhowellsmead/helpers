/**
 * Disable specific blocks within the Gutenberg Editor
 * Runs a check against all currently registered blocks
 * to ensure that a JavaScript error isn't provoked by
 * trying to unregister a block which isn't registered.
 * 
 * Usage: import './disable-blocks/index.js';
 *
 * mark@sayhello.ch 17.4.2020
 */

import domReady from '@wordpress/dom-ready';
import { getBlockTypes, unregisterBlockType } from '@wordpress/blocks';

domReady( () => {

	let activeBlocks = [];

	getBlockTypes().forEach( function ( blockType ) {
		activeBlocks.push( blockType.name );
	} );

	[ 'core/file', 'core/html' ].forEach( block => {
		if ( activeBlocks.includes( block ) ) {
			unregisterBlockType( block );
		}
	} );
} );
