/**
 * Simple(-ish) example of how to allow editors to convert your
 * custom block to and from another block.
 *
 * Core reference https://developer.wordpress.org/block-editor/developers/block-api/block-transforms/
 *
 * Only add CORE blocks to the "to" array.
 * Add a SINGLE entry to the "from" array, otherwise the editor duplicates entires in the "convert to" control
 *
 * mark@sayhello.ch December 2020
 */

import { createBlock } from '@wordpress/blocks';

// The name of THIS block.
const blockName = 'sht/heading-with-subheading';

const transforms = {
    to: [
        {
            type: 'block',
            blocks: ['core/heading'], // Block type TO which we can convert
            transform: ({ content, level }) => {
                // What to do when converting
                return createBlock('core/heading', {
                    content,
                    level,
                });
            },
        },
    ],
    from: [
        {
            type: 'block',
            blocks: ['core/heading', 'sht/heading-with-text'], // Block types FROM which we can convert
            transform: attributes => {
                // What to do when converting
                return createBlock(blockName, attributes);
            },
        },
    ],
};

export default transforms;
