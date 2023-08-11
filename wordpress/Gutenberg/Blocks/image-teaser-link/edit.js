import classnames from 'classnames';
import { InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { getBlockDefaultClassName } from '@wordpress/blocks';
import {
    BaseControl,
    PanelBody,
    ColorPalette,
    RangeControl,
    ToggleControl,
    SelectControl,
} from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { __, _x } from '@wordpress/i18n';

import ImageSelectorWithPlaceholder from '../_components/ImageSelectorWithPlaceholder';
import { LazyImage } from '../_components/LazyImage';
import LinkPopover from '../_components/LinkPopover';

const classNameBase = getBlockDefaultClassName('sht/image-teaser');

const Edit = props => {
    const { attributes, colors, setAttributes, isSelected } = props;

    const {
        className,
        linkTarget,
        url,
        rel,
        gradient,
        title,
        image,
        textOpacity,
        textColor,
        block_shadow,
        text_shadow,
        aspect_ratio,
    } = attributes;

    const blockProps = useBlockProps({
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

    let textStyle = {
        opacity: !!textOpacity ? textOpacity / 100 : 0,
    };

    if (!!textColor) {
        textStyle.color = textColor;
    }

    return (
        <>
            <InspectorControls>
                {!image.id && (
                    <PanelBody
                        title={_x(
                            'Darstellungsoptionen',
                            'Domain Gutenberg Block Panel Title',
                            'sha'
                        )}
                        initialOpen={true}
                    >
                        Bitte wählen Sie ein Bild aus, um die Optionen für diesen Block zu sehen.
                    </PanelBody>
                )}
                {!!image.id && (
                    <PanelBody
                        title={_x(
                            'Darstellungsoptionen',
                            'Domain Gutenberg Block Panel Title',
                            'sha'
                        )}
                        initialOpen={true}
                    >
                        <SelectControl
                            label={_x('Bildverhältnis auswählen', 'SelectControl label', 'sha')}
                            value={aspect_ratio}
                            options={[
                                {
                                    label: _x('3:2', 'SelectControl option', 'sha'),
                                    value: '3x2',
                                },
                                {
                                    label: _x('4:3', 'SelectControl option', 'sha'),
                                    value: '4x3',
                                },
                            ]}
                            onChange={aspect_ratio => {
                                setAttributes({ aspect_ratio });
                            }}
                        />
                        <BaseControl
                            label={_x('Farben', 'Domain Gutenberg Block Panel Title', 'sha')}
                        >
                            <ColorPalette
                                disableCustomColors
                                colors={colors}
                                value={textColor}
                                onChange={textColor => setAttributes({ textColor })}
                            />

                            {(!className || className === 'is-style-default') && (
                                <>
                                    <RangeControl
                                        label={_x('Transparenz Text', 'Range control label', 'sha')}
                                        value={textOpacity}
                                        onChange={textOpacity => setAttributes({ textOpacity })}
                                        min={0}
                                        max={100}
                                    />
                                    <ToggleControl
                                        label={_x('Text-Schatten', 'ToggleControl label', 'sha')}
                                        help={
                                            text_shadow
                                                ? _x('Text-Schatten angefügt.', 'Help text', 'sha')
                                                : _x(
                                                      'Fügt einen Schatten an für bessere Lesbarkeit.',
                                                      'Help text',
                                                      'sha'
                                                  )
                                        }
                                        checked={text_shadow}
                                        onChange={text_shadow => setAttributes({ text_shadow })}
                                    />
                                    <ToggleControl
                                        label={_x('Farbverlauf', 'ToggleControl label', 'sha')}
                                        help={
                                            gradient
                                                ? _x(
                                                      'Farbverlauf angefügt. (Nur mit Standard-Layout ersichtlich.)',
                                                      'Help text',
                                                      'sha'
                                                  )
                                                : _x(
                                                      'Fügt einen Farbverlauf über das Bild für bessere Lesbarkeit an.',
                                                      'Help text',
                                                      'sha'
                                                  )
                                        }
                                        checked={gradient}
                                        onChange={gradient => setAttributes({ gradient })}
                                    />
                                </>
                            )}

                            <ToggleControl
                                label={_x('Block-Schatten', 'ToggleControl label', 'sha')}
                                help={
                                    block_shadow
                                        ? _x('Block-Schatten angefügt.', 'Help text', 'sha')
                                        : _x(
                                              'Fügt einen Schatten den gesamten Block an.',
                                              'Help text',
                                              'sha'
                                          )
                                }
                                checked={block_shadow}
                                onChange={block_shadow => setAttributes({ block_shadow })}
                            />
                        </BaseControl>
                    </PanelBody>
                )}
            </InspectorControls>
            <div {...blockProps}>
                <LinkPopover
                    attributes={{
                        linkTarget,
                        url,
                        rel,
                    }}
                    setAttributes={setAttributes}
                    isSelected={isSelected}
                />

                <ImageSelectorWithPlaceholder
                    attributes={attributes}
                    setAttributes={setAttributes}
                    allowedTypes={['image']}
                    accept={'image'}
                    allowURL={false}
                />

                {!!image.id && (
                    <div className={`${classNameBase}__inner`}>
                        {!image.id && (
                            <div
                                className={`${classNameBase}__figure ${classNameBase}__figure--empty`}
                            />
                        )}
                        {!!image.id && (
                            <LazyImage
                                className={`${classNameBase}__figure`}
                                image={image}
                                background={false}
                                admin={true}
                            />
                        )}
                        <RichText
                            style={textStyle}
                            tagName='div'
                            className={classNameFigure}
                            allowedFormats={[]}
                            formattingControls={[]}
                            placeholder={_x('Geben Sie einen Titel an', 'Placeholder text', 'sha')}
                            multiline={false}
                            value={title}
                            keepPlaceholderOnFocus={true}
                            onChange={title => {
                                setAttributes({ title });
                            }}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default withSelect(select => {
    let colors = [],
        colorSettings = select('core/editor').getEditorSettings().colors;

    if (colorSettings) {
        colorSettings.map(color => {
            colors.push({ color: color.color, name: color.name });
        });
    }

    return {
        colors: colors,
    };
})(Edit);
