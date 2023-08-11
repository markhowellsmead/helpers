/**
 * Add custom margin control to specified blocks
 *
 * Updated 10.3.2022 mark@sayhello.ch
 */

import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { Fragment } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';
import {
    PanelBody,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import classnames from 'classnames';

/**
 * Restrict to specific blocks
 */
const allowedBlocks = ['core/group'];

const controlOptions = [
    {
        label: __('0', 'sha'),
        value: 'none',
    },
    {
        label: __('S', 'sha'),
        value: 'small',
    },
    {
        label: __('M', 'sha'),
        value: 'standard',
    },
    {
        label: __('L', 'sha'),
        value: 'large',
    },
    {
        label: __('XL', 'sha'),
        value: 'xlarge',
    },
    {
        label: __('XXL', 'sha'),
        value: 'xxlarge',
    },
];

/**
 * Add custom attribute to the block.
 */
addFilter('blocks.registerBlockType', 'sha/group-sha_margin-attributes', settings => {
    if (typeof settings.attributes !== 'undefined' && allowedBlocks.includes(settings.name)) {
        settings.attributes = Object.assign(settings.attributes, {
            sha_margin: {
                type: 'string',
                default: 'standard',
            },
        });
    }

    return settings;
});

/**
 * Add Controls
 */
addFilter(
    'editor.BlockEdit',
    'sha/group-sha_margin-control',
    createHigherOrderComponent(BlockEdit => {
        return props => {
            const { name, attributes, setAttributes, isSelected } = props;

            const { sha_margin } = attributes;

            return (
                <Fragment>
                    <BlockEdit {...props} />
                    {isSelected && allowedBlocks.includes(name) && (
                        <InspectorControls>
                            <PanelBody title={__('Innenabstand', 'sha')} initialOpen={true}>
                                <ToggleGroupControl
                                    value={sha_margin}
                                    onChange={sha_margin => setAttributes({ sha_margin })}
                                    label={__(
                                        'Wählen Sie einen alternativen Innenabstand aus. (M ist die Standardgrösse.)'
                                    )}
                                    isBlock
                                >
                                    {Object.keys(controlOptions).map(key => {
                                        return (
                                            <ToggleGroupControlOption
                                                value={controlOptions[key].value}
                                                label={controlOptions[key].label}
                                            />
                                        );
                                    })}
                                </ToggleGroupControl>
                            </PanelBody>
                        </InspectorControls>
                    )}
                </Fragment>
            );
        };
    })
);

/**
 * Adds custom class name to the block in the saved element
 * if the toggled option is true
 */
addFilter(
    'blocks.getSaveContent.extraProps',
    'sha/group-sha_margin-save-class-name',
    (extraProps, blockType, attributes) => {
        const { sha_margin } = attributes;

        if (typeof sha_margin !== 'undefined' && allowedBlocks.includes(blockType.name)) {
            extraProps.className = classnames(
                extraProps.className,
                `with-sha_margin--${sha_margin}`
            );
        }

        return extraProps;
    }
);

/**
 * Adds custom class name to the block in the editor
 * if the toggled option is true
 */
addFilter(
    'editor.BlockListBlock',
    'sha/group-sha_margin-edit-class-name',
    createHigherOrderComponent(BlockListBlock => {
        return props => {
            const { attributes, name } = props,
                { className, sha_margin } = attributes;

            if (allowedBlocks.includes(name) && !!sha_margin) {
                props = Object.assign({}, props, {
                    className: classnames(className, {
                        [`with-sha_margin--${sha_margin}`]:
                            !!sha_margin && sha_margin !== 'standard',
                    }),
                });
            }

            return <BlockListBlock {...props} />;
        };
    })
);
