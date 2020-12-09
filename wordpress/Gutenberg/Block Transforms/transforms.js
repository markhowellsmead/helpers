import { createBlock } from '@wordpress/blocks';

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
        {
            type: 'block',
            blocks: ['core/paragraph'], // Block type TO which we can convert
            transform: ({ content }) => {
                // What to do when converting
                return createBlock('core/paragraph', {
                    content,
                });
            },
        },
    ],
    from: [
        {
            type: 'block',
            blocks: ['core/heading'], // Block type FROM which we can convert
            transform: attributes => {
                // What to do when converting
                return createBlock('sht/heading-with-subheading', attributes);
            },
        },
    ],
};

export default transforms;
