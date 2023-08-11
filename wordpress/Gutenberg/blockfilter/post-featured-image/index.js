/**
 * Add a custom controls selector to the block
 *
 * mark@sayhello.ch 11.3.2022
 */

import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { _x, __ } from '@wordpress/i18n';

/**
 * Restrict to specific blocks
 */
const allowedBlocks = ['core/post-featured-image'];

/**
 * Add custom attributes to the block.
 */
addFilter('blocks.registerBlockType', 'sht/post-featured-image-attributes', settings => {
    if (typeof settings.attributes !== 'undefined' && allowedBlocks.includes(settings.name)) {
        settings.attributes = Object.assign(settings.attributes, {
            sizeSlug: {
                type: 'string',
                default: 'thumbnail',
            },
            linkToPost: {
                type: 'boolean',
            },
            useNewsFallbackImage: {
                type: 'boolean',
            },
        });
    }

    return settings;
});

/**
 * Add control to the InspectorControls in the editor
 */

addFilter(
    'editor.BlockEdit',
    'sht/post-featured-image-advanced-control',
    createHigherOrderComponent(BlockEdit => {
        return props => {
            const { attributes, setAttributes } = props;

            const { sizeSlug, linkToPost, useNewsFallbackImage } = attributes;

            if (props.name !== 'core/post-featured-image') {
                return <BlockEdit {...props} />;
            }

            return (
                <Fragment>
                    <BlockEdit {...props} />
                    <InspectorControls>
                        <PanelBody title={_x('Bildgrösse', 'Select field label', 'sha')}>
                            <SelectControl
                                label={_x(
                                    'Vordefinierte Bildgrösse auswählen',
                                    'Select field label',
                                    'sha'
                                )}
                                value={sizeSlug}
                                options={[
                                    {
                                        label: _x('Kleinbild', 'Selector label', 'sha'),
                                        value: 'thumbnail',
                                    },
                                    {
                                        label: _x('Mittel', 'Selector label', 'sha'),
                                        value: 'medium',
                                    },
                                    {
                                        label: _x('Gross', 'Selector label', 'sha'),
                                        value: 'large',
                                    },
                                    {
                                        label: _x('Vollständige Grösse', 'Selector label', 'sha'),
                                        value: 'full',
                                    },
                                ]}
                                onChange={sizeSlug => setAttributes({ sizeSlug })}
                            />
                        </PanelBody>
                        <PanelBody title={_x('Steuerungsoptionen', 'Panelbody title', 'sha')}>
                            <ToggleControl
                                label={__('Link to post')}
                                checked={!!linkToPost}
                                onChange={() => setAttributes({ linkToPost: !linkToPost })}
                            />
                            <ToggleControl
                                label={__('Use news image as fallback')}
                                checked={!!useNewsFallbackImage}
                                onChange={() =>
                                    setAttributes({ useNewsFallbackImage: !useNewsFallbackImage })
                                }
                            />
                        </PanelBody>
                    </InspectorControls>
                </Fragment>
            );
        };
    })
);

// Remove alignwide support to the block
addFilter(
    'blocks.registerBlockType',
    'sht/post-featured-image/alignwide',
    function (settings, name) {
        if (name === 'core/post-featured-image') {
            return lodash.assign({}, settings, {
                supports: lodash.assign({}, settings.supports, {
                    align: false,
                }),
            });
        }
        return settings;
    }
);
