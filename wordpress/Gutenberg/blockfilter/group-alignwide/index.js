/**
 * Additional option if block is set to "wide"
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
import { assign, merge } from 'lodash';

import classnames from 'classnames';

/**
 * Restrict to specific blocks
 */
const allowedBlocks = ['core/group'];

const wideWidthOptions = [
    {
        label: __('M', 'sha'),
        value: '',
    },
    {
        label: __('L', 'sha'),
        value: 'l',
    },
];

/**
 * Add custom attributes to the block.
 */
addFilter('blocks.registerBlockType', 'sha/group-extra-attributes', settings => {
    if (allowedBlocks.includes(settings.name)) {
        if (!settings.attributes) {
            settings.attributes = {};
        }

        settings = assign({}, settings, {
            attributes: merge(settings.attributes, {
                wideWidth: {
                    type: 'string',
                    default: '',
                },
            }),
        });
    }

    return settings;
});

/**
 * Add Controls to the Editor
 */
addFilter(
    'editor.BlockEdit',
    'sha/group-extra-control',
    createHigherOrderComponent(BlockEdit => {
        return props => {
            const { name, attributes, setAttributes, isSelected } = props;
            const { align, wideWidth } = attributes;

            if (!allowedBlocks.includes(name) || align !== 'wide') {
                return <BlockEdit {...props} />;
            }

            return (
                <Fragment>
                    <BlockEdit {...props} />
                    {isSelected && allowedBlocks.includes(name) && (
                        <InspectorControls>
                            <PanelBody title={__('Darstellungsoptionen', 'sha')} initialOpen={true}>
                                <ToggleGroupControl
                                    value={wideWidth}
                                    onChange={wideWidth => setAttributes({ wideWidth })}
                                    label={
                                        <p>
                                            {__(
                                                'Wählen Sie eine alternative Weite-Breite aus. (M ist die Standardbreite.)'
                                            )}
                                        </p>
                                    }
                                    isBlock
                                >
                                    {Object.keys(wideWidthOptions).map(key => {
                                        return (
                                            <ToggleGroupControlOption
                                                value={wideWidthOptions[key].value}
                                                label={wideWidthOptions[key].label}
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
    'sha/group-extra-edit-class-name',
    createHigherOrderComponent(BlockListBlock => {
        return props => {
            const { attributes, name } = props,
                { align, className, wideWidth } = attributes;

            if (!allowedBlocks.includes(name) || align !== 'wide') {
                return <BlockListBlock {...props} />;
            }

            props.attributes = Object.assign({}, props.attributes, {
                className: classnames(className, {
                    [`alignwide--${wideWidth}`]: align == 'wide' && !!wideWidth && wideWidth !== '',
                }),
            });

            return <BlockListBlock {...props} className={props.attributes.className} />;
        };
    })
);

/**
 * Adds custom class names to the block in the saved element
 */
addFilter(
    'blocks.getSaveContent.extraProps',
    'sha/group-extra-save-class-name',
    (extraProps, blockType, attributes) => {
        const { align, wideWidth } = attributes;

        if (!allowedBlocks.includes(blockType.name) || align !== 'wide') {
            return extraProps;
        }

        extraProps.className = classnames(extraProps.className, {
            [`alignwide--${wideWidth}`]: align == 'wide' && !!wideWidth && wideWidth !== '',
        });

        return extraProps;
    }
);
