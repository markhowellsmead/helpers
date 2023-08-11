import classnames from 'classnames';

import { getColorClassName, RichText } from '@wordpress/block-editor';
import { getBlockDefaultClassName, registerBlockType } from '@wordpress/blocks';
import { _x } from '@wordpress/i18n';

import { LazyImage } from '../_components/lazyimage.jsx';
import edit from './edit';

registerBlockType('sht/header-parallax', {
    title: _x('Header with Parallax image', 'Block title', 'sha'),
    description: '',
    icon: 'admin-users',
    category: 'widgets',
    supports: {
        align: ['wide', 'full'],
        html: false,
    },
    attributes: {
        align: {
            type: 'string',
            default: 'full',
        },
        image: {
            type: 'Object',
            default: {
                id: false,
            },
        },
        text: {
            type: 'string',
        },
        title: {
            type: 'string',
        },
        gradientColor: {
            type: 'string',
        },
        textColor: {
            type: 'string',
        },
    },
    edit,
    save({ attributes }) {
        const classNameBase = getBlockDefaultClassName('sht/header-parallax');
        const { align, text, title, image, gradientColor, textColor } = attributes;

        var gradientColorClass = getColorClassName('overlay-gradient', gradientColor),
            textColorClass = getColorClassName('color', textColor);

        const wrapperClassName = classnames({
            [classNameBase]: classNameBase,
            ['align' + align]: !!align,
            [gradientColorClass]: gradientColorClass,
            [textColorClass]: !!textColor,
            'has-overlay': !!gradientColor,
            'has-text-color': !!textColor,
        });

        let parallax = {
            src: false,
            width: false,
            height: false,
        };

        if (!!image && !!image.org && !!image.org[0] && !!image.org[1] && !!image.org[2]) {
            parallax = {
                src: image.org[0],
                width: image.org[1],
                height: image.org[2],
            };
        }

        return (
            <section
                className={wrapperClassName}
                data-parallax='scroll'
                data-position='center top'
                data-bleed='0'
                data-image-src={parallax.src}
                data-natural-width={parallax.width}
                data-natural-height={parallax.height}
            >
                <div className={`${classNameBase}__inner`}>
                    {!!image.id && (
                        <LazyImage
                            className={`${classNameBase}__figure`}
                            image={image}
                            background={false}
                            admin={false}
                        />
                    )}
                    {!image.id && (
                        <div
                            className={`${classNameBase}__figure ${classNameBase}__figure--empty`}
                        ></div>
                    )}
                    <div className={`${classNameBase}__content`}>
                        {!!title && (
                            <RichText.Content
                                tagName='h1'
                                className={`${classNameBase}__title`}
                                value={title}
                            />
                        )}
                        {!!text && (
                            <RichText.Content
                                tagName='div'
                                className={`${classNameBase}__text`}
                                value={text}
                            />
                        )}
                    </div>
                </div>
            </section>
        );
    },
});
