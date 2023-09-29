import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { PanelBody, FontSizePicker } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import block_json from '../../../../block.json';
const { name: block_name } = block_json;

registerBlockType(block_name, {
    edit: props => {
        const { attributes, setAttributes } = props;
        const { fontSize } = attributes;

        const fontSizes = useSelect(select => {
            const { getSettings } = select('core/block-editor');
            const { fontSizes } = getSettings();
            return fontSizes;
        });

        const selectedFontSize = fontSizes
            ? fontSizes.find(option => option.size === fontSize)
            : undefined;

        const blockProps = useBlockProps({
            style: {
                fontSize: selectedFontSize ? selectedFontSize.size : undefined,
            },
        });

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Typografie', 'sha')} initialOpen={true}>
                        <FontSizePicker
                            __nextHasNoMarginBottom
                            fontSizes={fontSizes}
                            value={fontSize}
                            onChange={fontSize => {
                                setAttributes({ fontSize });
                            }}
                        />
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <div
                        className='c-editormessage'
                        dangerouslySetInnerHTML={{
                            __html: __('Platzhalter Teammitglied-Rolle', 'sha'),
                        }}
                    />
                </div>
            </>
        );
    },
});
