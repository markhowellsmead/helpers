import classnames from 'classnames';

import {
    RichText,
    InspectorControls,
    withColors,
    ContrastChecker,
    getColorClassName,
    PanelColorSettings,
} from '@wordpress/block-editor';
import { getBlockDefaultClassName } from '@wordpress/blocks';
import { compose } from '@wordpress/compose';
import { PanelBody } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { Component, Fragment } from '@wordpress/element';
import { __, _x } from '@wordpress/i18n';

import LazyImageSelector from '../_components/lazyimageselector.jsx';
import { LazyImage } from '../_components/lazyimage.jsx';

/**
 * This is a complete panel with two colour selectors. The functions
 * setTextColor and setGradientColor and the objects textColor
 * and gradientColor are provided by the withColors functionality.
 */
const ColorPicker = ({ props }) => {
    const { gradientColor, textColor, setGradientColor, setTextColor } = props;

    return (
        <PanelColorSettings
            title={_x('Farbeinstellungen', 'Panel label', 'sha')}
            initialOpen={false}
            disableCustomColors={true}
            colorSettings={[
                {
                    value: textColor.color,
                    onChange: setTextColor,
                    label: _x('Textfarbe', 'Color settings label', 'sha'),
                },
                {
                    value: gradientColor.color,
                    onChange: setGradientColor,
                    label: _x('Verlauffarbe', 'Color settings label', 'sha'),
                },
            ]}
        >
            <ContrastChecker
                backgroundColor={gradientColor.color}
                textColor={textColor.color}
                isLargeText={false}
            />
        </PanelColorSettings>
    );
};

class Edit extends Component {
    constructor(props) {
        super(...arguments);
        this.props = props;
    }

    render() {
        const { attributes, className, setAttributes } = this.props;
        const { align, text, title, image, gradientColor, textColor } = attributes;

        let classNameBase = getBlockDefaultClassName('sht/header-parallax');

        var gradientColorClass = getColorClassName('overlay-gradient', gradientColor),
            textColorClass = getColorClassName('color', textColor);

        console.log(textColor);

        // These aren't used for applying the colors; that happens through
        const wrapperClassName = classnames({
            [className]: classNameBase,
            ['align' + align]: !!align,
            [gradientColorClass]: gradientColorClass,
            [textColorClass]: textColorClass,
            'has-overlay': !!gradientColor,
            'has-text-color': !!textColor,
        });

        return (
            <Fragment>
                <InspectorControls>
                    <ColorPicker props={this.props} />
                    <PanelBody title={_x('Medien auswählen', 'PanelBody title', 'sha')}>
                        <LazyImageSelector
                            attributes={attributes}
                            className={`${classNameBase}__figure`}
                            image={image}
                            setAttributes={setAttributes}
                            allowedTypes={['image']}
                        />
                    </PanelBody>
                </InspectorControls>
                <section className={wrapperClassName}>
                    <div className={`${classNameBase}__inner`}>
                        {!!image.id && (
                            <LazyImage
                                className={`${className}__figure`}
                                image={image}
                                background={false}
                                admin={true}
                            />
                        )}
                        {!image.id && (
                            <div
                                className={`${className}__figure ${className}__figure--empty`}
                            ></div>
                        )}
                        <div className={`${classNameBase}__content`}>
                            <RichText
                                tagName='h1'
                                placeholder={_x(
                                    'Geben Sie einen Titel ein',
                                    'Field placeholder',
                                    'sha'
                                )}
                                className={`${classNameBase}__title`}
                                value={title}
                                allowedFormats={[]}
                                keepPlaceholderOnFocus={true}
                                multiline={false}
                                onChange={value => {
                                    setAttributes({ title: value });
                                }}
                            />
                            <RichText
                                tagName='div'
                                placeholder={_x(
                                    'Geben Sie einen Text ein',
                                    'Field placeholder',
                                    'sha'
                                )}
                                className={`${classNameBase}__text`}
                                value={text}
                                allowedFormats={['core/bold']}
                                keepPlaceholderOnFocus={true}
                                multiline={true}
                                onChange={value => {
                                    setAttributes({ text: value });
                                }}
                            />
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    }
}

/**
 * This is the HOC which is returned to the registerBlockType function.
 *
 * compose extends the linked Edit Component with other functionality.
 *
 * withColors provides the indicated properties for managing the colors.
 * The color attributes are usually hex values; this functionality converts
 * the hex colors into an object, which contain color.slug (name) and color.color (hex)
 *
 * withSelect gets the available colors via REST API, which are then
 * available for selection in the color pickers.
 *
 */
export default compose([
    withColors('gradientColor', 'textColor'),
    withSelect(select => {
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
    }),
])(Edit);
