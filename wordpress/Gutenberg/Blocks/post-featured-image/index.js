import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import { _x } from '@wordpress/i18n';
import { archiveTitle as icon } from '@wordpress/icons';

const blockName = 'sht/post-featured-image';

registerBlockType(blockName, {
    apiVersion: 2,
    title: _x('Beitragsbild (Alternativ)', 'Block title', 'sha'),
    icon,
    category: 'sht/blocks',
    attributes: {
        align: {
            type: 'string',
            default: '',
        },
        image_size: {
            type: 'string',
            default: 'post-thumbnail',
        },
    },
    supports: {
        align: ['wide', 'full'],
        html: false,
    },
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();

        const { image_size } = attributes;

        return (
            <>
                <InspectorControls>
                    <PanelBody>
                        <SelectControl
                            label={_x('Bildgrösse', 'Select field label', 'sha')}
                            value={image_size}
                            options={[
                                {
                                    label: _x('Kleinbild', 'Selector label', 'sha'),
                                    value: 'thumbnail',
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
                            onChange={image_size => setAttributes({ image_size })}
                        />
                    </PanelBody>
                </InspectorControls>
                <div {...blockProps}>
                    <ServerSideRender block={blockName} attributes={attributes} />
                </div>
            </>
        );
    },
    save() {
        return null;
    },
});
