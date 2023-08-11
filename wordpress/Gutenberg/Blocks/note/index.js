import { RichText, useBlockProps } from '@wordpress/block-editor';
import { getBlockDefaultClassName, registerBlockType } from '@wordpress/blocks';
import { _x } from '@wordpress/i18n';
import { info as icon } from '@wordpress/icons';

let blockName = 'sht/note';
let classNameBase = getBlockDefaultClassName(blockName);

registerBlockType(blockName, {
    apiVersion: 2,
    title: _x('Notiz', 'Block title', 'sha'),
    icon,
    category: 'widgets',
    keywords: [],
    supports: {
        align: false,
        html: false,
    },
    attributes: {
        text: {
            type: 'string',
            default: '',
        },
    },
    edit: ({ attributes, setAttributes }) => {
        const { text } = attributes;

        const blockProps = useBlockProps();

        return (
            <div {...blockProps}>
                <RichText
                    tagName='div'
                    className={`${classNameBase}__text`}
                    format='string'
                    allowedFormats={['core/link']}
                    formattingControls={[]}
                    placeholder={_x('Geben Sie einen Text ein', 'Placeholder text', 'sha')}
                    multiline={true}
                    value={text}
                    keepPlaceholderOnFocus={true}
                    onChange={text => {
                        setAttributes({ text });
                    }}
                />
            </div>
        );
    },
    save({ attributes }) {
        const { text } = attributes;

        const blockProps = useBlockProps.save();

        return (
            <div {...blockProps}>
                {!!text && (
                    <RichText.Content
                        tagName='div'
                        className={`${classNameBase}__text`}
                        value={text}
                    />
                )}
            </div>
        );
    },
});
