/**
 * Add custom style to core/group block
 * based on the state of a ToggleControl.
 * 
 * 4.3.2022 mark@sayhello.ch
 */

import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { Fragment } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import classnames from 'classnames';

/**
 * Restrict to specific blocks
 */
const allowedBlocks = ['core/group'];

/**
 * Add custom attribute to the block.
 */
addFilter('blocks.registerBlockType', 'sht/group-unround-attributes', settings => {
    if (typeof settings.attributes !== 'undefined' && allowedBlocks.includes(settings.name)) {
        settings.attributes = Object.assign(settings.attributes, {
            unRound: {
                type: 'boolean',
                default: false,
            },
        });
    }

    return settings;
});

/**
 * Add Toggle Control
 */
addFilter(
    'editor.BlockEdit',
    'sht/group-unround-control',
    createHigherOrderComponent(BlockEdit => {
        return props => {
            const { name, attributes, setAttributes, isSelected } = props;

            const { unRound } = attributes;

            return (
                <Fragment>
                    <BlockEdit {...props} />
                    {isSelected && allowedBlocks.includes(name) && (
                        <InspectorControls>
                            <PanelBody title={__('Theme-Optionen', 'sht')} initialOpen={true}>
                                <ToggleControl
                                    label={__('Ohne runde Ecken', 'sha')}
                                    checked={!!unRound}
                                    onChange={() => setAttributes({ unRound: !unRound })}
                                />
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
    'sht/group-unround-extra-class',
    (extraProps, blockType, attributes) => {
        const { unRound } = attributes;

        if (typeof unRound !== 'undefined' && allowedBlocks.includes(blockType.name) && !!unRound) {
            extraProps.className = classnames(extraProps.className, 'is--unround');
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
    'sht/group-block-unround-class-name',
    createHigherOrderComponent(BlockListBlock => {
        return props => {
            const { attributes } = props,
                { unRound } = attributes;

            if (!allowedBlocks.includes(props.name) || !unRound) {
                return <BlockListBlock {...props} />;
            }

            return <BlockListBlock {...props} className={'is--unround'} />;
        };
    })
);
