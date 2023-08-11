import { InnerBlocks, RichText } from '@wordpress/block-editor';
import { getBlockDefaultClassName, registerBlockType } from '@wordpress/blocks';
import { Component } from '@wordpress/element';
import { _x } from '@wordpress/i18n';
import { chevronDown as icon } from '@wordpress/icons';
import classnames from 'classnames';

const blockName = 'sht/accordion';
const classNameBase = getBlockDefaultClassName(blockName);

registerBlockType(blockName, {
    title: _x('Akkordeon', 'Block title', 'sha'),
    description: _x(
        'Eine Gruppe an Unterelemente, die der Seitenbesucher auf- und zuklappen kann.',
        'Block title',
        'sha'
    ),
    icon,
    category: 'common',
    supports: {
        align: false,
        html: false,
    },
    attributes: {
        blockID: {
            type: 'string',
        },
        title: {
            type: 'string',
            default: _x('Akkordeon-Titel', 'Block title attribute default value', 'sha'),
        },
    },
    edit: class extends Component {
        constructor(props) {
            super(...arguments);
            this.props = props;
        }

        render() {
            const { attributes, className, setAttributes } = this.props;

            const { title } = attributes;

            setAttributes({ blockID: this.props.clientId });

            return (
                <div className={className}>
                    <RichText
                        tagName='h2'
                        placeholder={_x(
                            'Geben Sie einen Titel für diesen Akkordeon-Block ein',
                            'Field placeholder',
                            'sha'
                        )}
                        className={`${classNameBase}__title`}
                        value={title}
                        allowedFormats={[]}
                        multiline={false}
                        keepPlaceholderOnFocus={true}
                        onChange={value => {
                            setAttributes({ title: value });
                        }}
                    />
                    <InnerBlocks allowedBlocks={['core/paragraph', 'core/heading', 'core/image']} />
                </div>
            );
        }
    },
    save({ attributes, className }) {
        const wrapperClassName = classnames({
            [className]: true,
            [`c-accordion`]: true,
        });

        const { blockID, title } = attributes;

        const the_title =
            title ??
            _x(
                '[ Akkordeon-Titel nicht gesetzt ]',
                'Block title attribute default value (save)',
                'sha'
            );

        return (
            <div className={wrapperClassName} data-accordion>
                <div className={`${classNameBase}__header c-accordion__header`}>
                    <RichText.Content
                        className={`${classNameBase}__title c-accordion__header`}
                        value={the_title}
                        tagName='h2'
                    />
                    <button
                        data-accordion-toggler
                        className={`${classNameBase}__trigger c-accordion__trigger`}
                        aria-controls={`accordion-${blockID}`}
                    >
                        <span className='screen-reader-text'>
                            {_x('Diesen Bereich zu-/aufklappen', 'Accordion button text', 'sht')}
                        </span>
                        <span
                            className={`${classNameBase}__triggericon c-accordion__triggericon`}
                        ></span>
                    </button>
                </div>

                <div
                    data-accordion-content
                    className={`${classNameBase}__inner c-accordion__inner`}
                    id={`accordion-${blockID}`}
                >
                    <InnerBlocks.Content />
                </div>
            </div>
        );
    },
});
