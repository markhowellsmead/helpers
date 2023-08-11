import { useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { _x } from '@wordpress/i18n';
import ServerSideRender from '@wordpress/server-side-render';
import { calendar as icon } from '@wordpress/icons';

const blockName = 'sht/sbb-timetable-form';

registerBlockType(blockName, {
    apiVersion: 2,
    title: _x('SBB Fahrplan-Formular', 'Block title', 'sha'),
    description: _x('Ein von SBB definiertes Abfrageformular.', 'Block title', 'sha'),
    icon,
    category: 'sht/blocks',
    supports: {
        align: false,
        html: false,
    },
    edit: () => {
        const blockProps = useBlockProps();
        return (
            <div {...blockProps}>
                <ServerSideRender block={blockName} />
            </div>
        );
    },
});
