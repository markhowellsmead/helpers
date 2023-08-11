import { registerBlockType } from '@wordpress/blocks';
import { _x } from '@wordpress/i18n';
import { gallery as icon } from '@wordpress/icons';

import edit from './edit';

const blockName = 'sht/gallery';

registerBlockType(blockName, {
    title: _x('Bildergalerie', 'Block title', 'sha'),
    description: _x('Stellt eine Auswahl an Bilder dar.', 'Block description', 'sha'),
    icon,
    category: 'media',
    keywords: [
        _x('Bilder', 'Block keyword', 'sha'),
        'image',
        'gallery'
    ],
    supports: {
        align: false,
        html: false,
    },
    attributes: {
        className: {
            type: 'string',
        },
        images: {
            type: 'Array',
            default: false,
        },
        updated: {
            type: 'integer',
        },
    },
    edit,
    save() {
        return null;
    },
});
