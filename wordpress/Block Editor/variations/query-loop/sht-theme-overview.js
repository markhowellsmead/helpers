/**
 * Adds a custom block variation for the core/query-loop block
 *
 * mark@sayhello.ch 17.2.2022
 */

import { registerBlockVariation } from '@wordpress/blocks';
import { _x } from '@wordpress/i18n';

registerBlockVariation('core/query', {
    name: 'sht-theme-overview',
    title: _x('Themenübersicht', '', 'sha'),
    icon: 'list-view',
    attributes: {
        className: 'wp-block-query--sht-theme-overview',
        align: 'wide',
        displayLayout: { type: 'flex', columns: 3 },
        query: {
            offset: 0,
            perPage: 12,
            postType: 'post',
            inherit: false,
        },
    },
    innerBlocks: [
        [
            'core/post-template',
            { className: 'wp-block-query__entries', align: 'wide' },
            [
                ['sht/post-featured-image', { className: 'wp-block-query__figure', link: true }],
                ['sht/post-strapline'],
                [
                    'core/group',
                    { className: 'wp-block-query__textcontent' },
                    [
                        [
                            'core/post-title',
                            {
                                fontSize: 'medium',
                                className: 'wp-block-query__title',
                                isLink: true,
                            },
                        ],
                    ],
                ],
            ],
        ],
        [
            'core/query-pagination',
            { paginationArrow: 'arrow', layout: { type: 'flex', justifyContent: 'center' } },
        ],
    ],
    scope: ['block'],
});
