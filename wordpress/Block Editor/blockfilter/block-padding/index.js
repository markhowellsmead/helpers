/**
 * Add custom padding control to specified blocks
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
addFilter('blocks.registerBlockType', 'sha/group-sha_padding-attributes', settings => {
    if (typeof settings.attributes !== 'undefined' && allowedBlocks.includes(settings.name)) {
        settings.attributes = Object.assign(settings.attributes, {
            sha_padding: {
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
    'sha/group-sha_padding-control',
    createHigherOrderComponent(BlockEdit => {
        return props => {
            const { name, attributes, setAttributes, isSelected } = props;

            const { sha_padding } = attributes;

            return (
                <Fragment>
                    <BlockEdit {...props} />
                    {isSelected && allowedBlocks.includes(name) && (
                        <InspectorControls>
                            <PanelBody title={__('Innenabstand', 'sha')} initialOpen={true}>
                                <ToggleGroupControl
                                    value={sha_padding}
                                    onChange={sha_padding => setAttributes({ sha_padding })}
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
 * Adds a custom class name to the block in the editor.
 * Sets the className attribute and then also passes it
 * to the BlockListBlock component explicitly.
 * This ensures that all classnames from all block
 * filters are respected: therefore ensure that all block
 * filters work in the same way!
 */
addFilter(
    'editor.BlockListBlock',
    'sha/group-sha_padding-edit-class-name',
    createHigherOrderComponent(BlockListBlock => {
        return props => {
            const { attributes, name } = props,
                { className, sha_padding } = attributes;

            if (allowedBlocks.includes(name)) {
                props.attributes = Object.assign({}, props.attributes, {
                    className: classnames(className, {
                        [`with-sha_padding--${sha_padding}`]:
                            !!sha_padding && sha_padding !== 'standard',
                    }),
                });
            }

            return <BlockListBlock {...props} className={props.attributes.className} />;
        };
    })
);

/**
 * Adds custom class name to the block in the saved element
 */
addFilter(
    'blocks.getSaveContent.extraProps',
    'sha/group-sha_padding-save-class-name',
    (extraProps, blockType, attributes) => {
        const { sha_padding } = attributes;

        if (
            typeof sha_padding !== 'undefined' &&
            sha_padding !== 'standard' &&
            allowedBlocks.includes(blockType.name)
        ) {
            extraProps.className = classnames(
                extraProps.className,
                `with-sha_padding--${sha_padding}`
            );
        }

        return extraProps;
    }
);
