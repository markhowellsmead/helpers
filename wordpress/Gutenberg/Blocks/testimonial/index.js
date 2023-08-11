import { InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { getBlockDefaultClassName, registerBlockType } from '@wordpress/blocks';
import { PanelBody } from '@wordpress/components';
import { __, _x } from '@wordpress/i18n';
import { comment as icon } from '@wordpress/icons';
import { Fragment } from 'react';

import FigureWithImageFromMedia from '../_components/figure-with-image-from-media';
import ImageSelector from '../_components/image-selector';

const blockName = 'sht/testimonial',
    classNameBase = getBlockDefaultClassName(blockName);

registerBlockType(blockName, {
    apiVersion: 2,
    title: _x('Testimonial', 'Block title', 'sha'),
    icon,
    category: 'sht/blocks',
    keywords: [],
    supports: {
        align: ['wide', 'full'],
    },
    attributes: {
        author_description: {
            type: 'string',
            default: '',
        },
        author_name: {
            type: 'string',
            default: '',
        },
        text: {
            type: 'string',
            default: '',
        },
        image: {
            type: 'Object',
            default: {
                id: false,
            },
        },
    },

    edit: props => {
        const { attributes, setAttributes } = props;
        const { image, author_name, author_description, text } = attributes;
        const blockProps = useBlockProps();

        return [
            <Fragment>
                <InspectorControls>
                    <PanelBody title={_x('Optionen', 'Panel body label', 'sha')}>
                        <ImageSelector
                            label={_x('Autorenfoto', 'Field label', 'sha')}
                            attributes={attributes}
                            setAttributes={setAttributes}
                            attributeKey='image'
                            allowedTypes={['image/jpeg']}
                        />
                    </PanelBody>
                </InspectorControls>
                <div {...blockProps}>
                    <div className={`${classNameBase}__inner`}>
                        <RichText
                            tagName='blockquote'
                            placeholder={__('Geben Sie einen Text ein', 'sha')}
                            className={`${classNameBase}__text`}
                            multiline={false}
                            allowedFormats={[]}
                            value={text}
                            keepPlaceholderOnFocus={true}
                            onChange={value => {
                                setAttributes({ text: value.replace(/<\/?[^>]+(>|$)/g, '') });
                            }}
                        />

                        <div className={`${classNameBase}__author-wrap`}>
                            {!image && (
                                <div
                                    aria-hidden={true}
                                    className={`${classNameBase}__figure ${classNameBase}__figure--empty`}
                                    dangerouslySetInnerHTML={{ __html: 'No image' }}
                                />
                            )}

                            {!!image.id && (
                                <FigureWithImageFromMedia
                                    classNameBase={classNameBase}
                                    image={image}
                                    attributeKey={'image'}
                                    lazy={false}
                                />
                            )}

                            <div className={`${classNameBase}__author-text`}>
                                <RichText
                                    tagName='div'
                                    placeholder={__('Geben Sie einen Autorennamen ein', 'sha')}
                                    className={`${classNameBase}__author-name`}
                                    multiline={false}
                                    allowedFormats={[]}
                                    value={author_name}
                                    keepPlaceholderOnFocus={true}
                                    onChange={value => {
                                        setAttributes({
                                            author_name: value.replace(/<\/?[^>]+(>|$)/g, ''),
                                        });
                                    }}
                                />

                                <RichText
                                    tagName='div'
                                    placeholder={__(
                                        'Geben Sie eine Autorenbeschreibung ein',
                                        'sha'
                                    )}
                                    className={`${classNameBase}__author-description`}
                                    multiline={true}
                                    allowedFormats={[]}
                                    value={author_description}
                                    keepPlaceholderOnFocus={true}
                                    onChange={author_description => {
                                        setAttributes({ author_description });
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>,
        ];
    },
    save: props => {
        const { attributes } = props;
        const { image, author_name, author_description, text } = attributes;
        const blockProps = useBlockProps.save();

        return (
            <div {...blockProps}>
                <div className={`${classNameBase}__inner`}>
                    {!!text && (
                        <RichText.Content
                            tagName='blockquote'
                            className={`${classNameBase}__text`}
                            value={text}
                        />
                    )}
                    <div className={`${classNameBase}__author-wrap`}>
                        {!!image.id && (
                            <FigureWithImageFromMedia
                                classNameBase={classNameBase}
                                image={image}
                                attributeKey={'image'}
                                lazy={true}
                                context={'save'}
                            />
                        )}

                        <div className={`${classNameBase}__author-text`}>
                            {!!author_name && (
                                <RichText.Content
                                    tagName='div'
                                    className={`${classNameBase}__author-name`}
                                    value={author_name}
                                />
                            )}

                            {!!author_description && (
                                <RichText.Content
                                    tagName='div'
                                    className={`${classNameBase}__author-description`}
                                    value={author_description}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    },
});
