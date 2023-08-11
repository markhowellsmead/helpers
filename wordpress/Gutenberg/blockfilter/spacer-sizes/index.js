/**
 * Adds more custom sizes to the SHB Spacer block
 *
 * mark@sayhello.ch 18.2.2022
 */

import { addFilter } from '@wordpress/hooks';

addFilter('blocks.registerBlockType', 'sht/spacer-block-sizes', function (settings, name) {
    if (name === 'shb/spacer') {
        const { assign } = lodash;

        const more_sizes = [
            { name: 'size-custom-1', label: 'Grösse 9' },
            { name: 'size-custom-2', label: 'Grösse 10' },
            { name: 'size-custom-3', label: 'Grösse 11' },
            { name: 'size-custom-4', label: 'Grösse 12' },
        ];

        settings.styles = assign(settings.styles, settings.styles.concat(more_sizes));
    }
    return settings;
});
