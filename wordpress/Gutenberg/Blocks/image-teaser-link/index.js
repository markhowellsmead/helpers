import { RichText, useBlockProps } from '@wordpress/block-editor';
import { _x } from '@wordpress/i18n';
import { getBlockDefaultClassName, registerBlockType } from '@wordpress/blocks';
import classnames from 'classnames';
import { image as icon } from '@wordpress/icons';

import { LazyImage } from '../_components/LazyImage';
import edit from './edit';
import Link from './link';

const blockName = 'sht/image-teaser';
const classNameBase = getBlockDefaultClassName(blockName);

registerBlockType(blockName, {
    apiVersion: 2,
    title: _x('Teaser mit Bild und Titel', 'Block title', 'sha'),
    description: _x(
        'Falls Sie einen Link setzen möchten, wählen Sie den gesamten Titel aus und nutzen Sie die Link-Kontrolle.',
        'Block title',
        'sha'
    ),
    icon,
    category: 'sht/blocks',
    supports: {
        align: false,
        html: false,
    },
    attributes: {
        image: {
            type: 'Object',
            default: {
                id: false,
            },
        },
        aspect_ratio: {
            type: 'string',
            default: '3x2',
        },
        textColor: {
            type: 'string',
            default: '',
        },
        title: {
            type: 'string',
            default: '',
        },
        linkTarget: {
            type: 'string',
            default: '',
        },
        rel: {
            type: 'string',
            default: '',
        },
        url: {
            type: 'string',
            default: '',
        },
        textOpacity: {
            type: 'Number',
            default: 100,
        },
        gradient: {
            type: 'boolean',
        },
        text_shadow: {
            type: 'boolean',
        },
        block_shadow: {
            type: 'boolean',
        },
    },
    edit,
    save({ attributes }) {
        const {
            aspect_ratio,
            gradient,
            image,
            linkTarget,
            rel,
            block_shadow,
            text_shadow,
            textColor,
            textOpacity,
            title,
            url,
        } = attributes;

        const blockProps = useBlockProps.save({
            className: classnames({
                [`with--gradient`]: gradient,
                [`with--aspect_ratio--${aspect_ratio}`]: true,
                [`with--blockshadow`]: block_shadow,
            }),
        });

        const classNameFigure = classnames({
            [`${classNameBase}__title`]: true,
            [`${classNameBase}__title--textshadow`]: text_shadow,
        });

        if (!!image.id && parseInt(image.attributes.width) < parseInt(image.attributes.height)) {
            className += ` ${className}--tall`;
        }

        let textStyle = {
            opacity: !!textOpacity ? textOpacity / 100 : 0,
        };

        if (!!textColor) {
            textStyle.color = textColor;
        }

        return (
            <div {...blockProps}>
                <div className={`${classNameBase}__inner`}>
                    {!!image.id && (
                        <LazyImage className={`${classNameBase}__figure`} image={image} />
                    )}
                    {!image.id && (
                        <div
                            className={`${classNameBase}__figure ${classNameBase}__figure--empty`}
                        />
                    )}
                    {!!title && (
                        <RichText.Content
                            style={textStyle}
                            tagName='div'
                            className={classNameFigure}
                            value={title}
                        />
                    )}
                    <Link
                        rel={rel}
                        linkTarget={linkTarget}
                        label={title}
                        url={url}
                        className={`${classNameBase}__cardlink`}
                    />
                </div>
            </div>
        );
    },
});
