/**
 * This code adds a new inspectorcontrols panelbody containing a
 * togglecontrol, which allows the user to add a CSS class name
 * onclick which will convert the content of the element to
 * UPPERCASE. The CSS itself is not part of the code; you will
 * need to add that yourself.
 *
 * mark@sayhello.ch 30.9.2021
 */

import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import { Fragment } from '@wordpress/element';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import classnames from 'classnames';

//restrict to specific blocks
const allowedBlocks = ['core/paragraph', 'core/heading'];

const addUppercaseAttribute = settings => {
    if (typeof settings.attributes !== 'undefined' && allowedBlocks.includes(settings.name)) {
        settings.attributes = Object.assign(settings.attributes, {
            shtUppercase: {
                type: 'boolean',
            },
        });
    }
    return settings;
};

addFilter('blocks.registerBlockType', 'sht/allow-block-uppercase-attribute', addUppercaseAttribute);

const addControl = createHigherOrderComponent(BlockEdit => {
    return props => {
        const { attributes, setAttributes, isSelected, name } = props;
        return (
            <Fragment>
                <BlockEdit {...props} />
                {isSelected && allowedBlocks.includes(name) && (
                    <InspectorControls>
                        <PanelBody title={__('Darstellungsoptionen', 'sha')}>
                            <ToggleControl
                                label={__('Mit Grossbuchstaben', 'sha')}
                                checked={!!attributes.shtUppercase}
                                onChange={() =>
                                    setAttributes({ shtUppercase: !attributes.shtUppercase })
                                }
                            />
                        </PanelBody>
                    </InspectorControls>
                )}
            </Fragment>
        );
    };
}, 'addControl');

addFilter('editor.BlockEdit', 'sht/allow-block-uppercase-control', addControl);

/**
 * Add size class to the block in the editor
 */
const addEditorClass = createHigherOrderComponent(BlockListBlock => {
    return props => {
        const { attributes, className, name } = props;
        const { shtUppercase } = attributes;

        if (!allowedBlocks.includes(name)) {
            return <BlockListBlock {...props} />;
        }

        return (
            <BlockListBlock
                {...props}
                className={classnames(className, !!shtUppercase ? 'is--uppercase' : '')}
            />
        );
    };
}, 'withClientIdClassName');

addFilter('editor.BlockListBlock', 'sht/allow-block-uppercase-editor-class', addEditorClass);

const applyClass = (extraProps, blockType, attributes) => {
    const { shtUppercase } = attributes;

    if (
        typeof shtUppercase !== 'undefined' &&
        !!shtUppercase &&
        allowedBlocks.includes(blockType.name)
    ) {
        extraProps.className = classnames(extraProps.className, 'is--uppercase');
    }

    return extraProps;
};

addFilter('blocks.getSaveContent.extraProps', 'sht/allow-block-uppercase-class', applyClass);
