import { _x } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

const blockName = 'sht/inner-blocks-example';

// If necessary for inner DIVs. Load getBlockDefaultClassName from @wordpress/blocks.
// const classNameBase = getBlockDefaultClassName(blockName);

registerBlockType(blockName, {
    apiVersion: 2, // Needs WordPress 5.6+
    title: _x('InnerBlocks Example', 'Block title', 'sha'),
    icon: 'list-view',
    category: 'widgets',
    keywords: [_x('Block', 'Block keyword', 'sha')],
    supports: {
        mode: false,
        html: false,
    },
    edit: () => {
        const blockProps = useBlockProps({
            className: blockName,
        });

        return (
            <div {...blockProps}>
                <InnerBlocks
                    allowedBlocks={(['core/heading'], ['core/paragraph'])}
                    templateLock={false}
                    template={[
                        [
                            'core/heading',
                            {
                                level: 2,
                                placeholder: _x(
                                    'Geben Sie einen Titel ein',
                                    'Default content',
                                    'sha'
                                ),
                            },
                        ],
                        [
                            'core/paragraph',
                            {
                                content:
                                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                            },
                        ],
                    ]}
                />
            </div>
        );
    },
    save() {
        const blockProps = useBlockProps.save({
            className: blockName,
        });

        return (
            <div {...blockProps}>
                <InnerBlocks.Content />
            </div>
        );
    },
});
