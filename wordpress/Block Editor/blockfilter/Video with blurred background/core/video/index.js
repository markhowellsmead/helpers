import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { Fragment } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

/**
 * Restrict to specific blocks
 */
const allowedBlocks = ['core/video'];

/**
 * Add custom attributes for vertical video with blurred duplicate background.
 */
addFilter('blocks.registerBlockType', 'sht/custom-video-controls', settings => {
    if (!allowedBlocks.includes(settings.name)) {
        return settings;
    }

    return lodash.assign({}, settings, {
        attributes: lodash.assign({}, settings.attributes, {
            withBlurBackground: {
                type: 'boolean',
                default: false,
            },
        }),
    });
});

/**
 * Add visibility controls as block panel.
 */
addFilter(
    'editor.BlockEdit',
    'sht/custom-video-controls',
    createHigherOrderComponent(BlockEdit => {
        return props => {
            const { name, attributes, setAttributes, isSelected } = props;
            const { withBlurBackground } = attributes;

            if (!isSelected || !allowedBlocks.includes(name)) {
                return <BlockEdit {...props} />;
            }

            return (
                <Fragment>
                    <BlockEdit {...props} />
                    <InspectorControls>
                        <PanelBody title={__('Darstellung', 'sht')} initialOpen={true}>
                            <ToggleControl
                                label={__(
                                    'Vertikales Video mit weichgezeichnetem Hintergrund',
                                    'sha'
                                )}
                                checked={!!withBlurBackground}
                                onChange={() =>
                                    setAttributes({ withBlurBackground: !withBlurBackground })
                                }
                                help={
                                    !!withBlurBackground
                                        ? __(
                                              'Das Hintergrundvideo wird nur auf der Website angezeigt, nicht im Editor.',
                                              'sha'
                                          )
                                        : ''
                                }
                            />
                        </PanelBody>
                    </InspectorControls>
                </Fragment>
            );
        };
    })
);

// add class in the editor if the block has the attribute withBlurBackground
addFilter(
    'editor.BlockListBlock',
    'sht/custom-video-controls',
    createHigherOrderComponent(BlockListBlock => {
        return props => {
            const { name, attributes } = props;
            const { withBlurBackground } = attributes;

            if (!allowedBlocks.includes(name) || !withBlurBackground) {
                return <BlockListBlock {...props} />;
            }

            return (
                <Fragment>
                    <BlockListBlock {...props} className='is--vertical' />
                </Fragment>
            );
        };
    })
);
