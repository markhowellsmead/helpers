import { getBlockDefaultClassName, registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
import { _x, __ } from '@wordpress/i18n';
import { sayhello as icon } from '../../icons';

const blockName = 'sht/guest-authors',
    classNameBase = getBlockDefaultClassName(blockName),
    ALLOWED_BLOCKS = ['core/paragraph', 'core/buttons'],
    TEMPLATE = [
        [
            'core/paragraph',
            {
                placeholder: __('Text eingeben', 'sha'),
            },
        ],
        [
            'core/buttons',
            {},
            [
                [
                    'core/button',
                    {
                        text: 'Button Text',
                    },
                ],
            ],
        ],
    ];

registerBlockType(blockName, {
    apiVersion: 2,
    title: _x('Gastautoren', 'Block title', 'sha'),
    icon,
    category: 'sht/blocks',
    keywords: ['team', 'author', 'autor'],
    supports: {
        align: false,
        html: false,
    },
    edit: ({attributes, setAttributes}) => {
        const blockProps = useBlockProps();

        const {title} = attributes;

        return (
            <div {...blockProps}>
                <div className={`${classNameBase}__cell ${classNameBase}__header`}>
                    <RichText
                        tagName='h2'
                        placeholder={_x(
                            'Geben Sie den Überschrift ein',
                            'Field placeholder',
                            'sha'
                        )}
                        className={`${classNameBase}__title`}
                        value={title}
                        allowedFormats={[]}
                        keepPlaceholderOnFocus={true}
                        multiline={false}
                        onChange={title => setAttributes({ title })}
                    />
                    <InnerBlocks
                        allowedBlocks={ALLOWED_BLOCKS}
                        template={TEMPLATE}
                        templateLock={true}
                    />
                </div>
                <ServerSideRender block={blockName} />
            </div>
        );
    },
    save() {

        /**
         * Save method combines ServerSideRender, InnerBlocks and React rendering.
         */
        const blockProps = useBlockProps.save();

        return (
            <div {...blockProps}>
                <div className={`${classNameBase}__cell ${classNameBase}__header`}>
                    <RichText.Content
                        tagName='h2'
                        className={`${classNameBase}__title`}
                        value={subtitle}
                    />
                    <InnerBlocks.Content />
                </div>
                <ServerSideRender block={blockName} />
            </div>
        );
    },
});
