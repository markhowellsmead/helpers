/**
 * Adds H1 to H6 shortcut variations for the core/heading block
 *
 * mark@sayhello.ch 17.2.2022
 */

import { registerBlockVariation } from '@wordpress/blocks';

registerBlockVariation('core/heading', {
    name: 'sht/h1',
    title: 'H1',
    attributes: { level: 1 },
});

registerBlockVariation('core/heading', {
    name: 'sht/h2',
    title: 'H2',
    attributes: { level: 2 },
});

registerBlockVariation('core/heading', {
    name: 'sht/h3',
    title: 'H3',
    attributes: { level: 3 },
});

registerBlockVariation('core/heading', {
    name: 'sht/h4',
    title: 'H4',
    attributes: { level: 4 },
});

registerBlockVariation('core/heading', {
    name: 'sht/h5',
    title: 'H5',
    attributes: { level: 5 },
});

registerBlockVariation('core/heading', {
    name: 'sht/h6',
    title: 'H6',
    attributes: { level: 6 },
});
