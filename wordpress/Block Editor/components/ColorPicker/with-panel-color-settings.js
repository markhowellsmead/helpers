/**
 * This is a complete panel with configurable, multiple colour selectors. 
 * The functions like setTextColor and the objects like textColor are provided by 
 * the withColors functionality. (withColors comes from @wordpress/block-editor.)
 * This version doesn't include a ContrastChecker.
 * 
 * Usage: add titleColor and textColor as block attributes. Then,

import ColorPicker from './colorpicker';
…
<ColorPicker
    props={props}
    label={__('Farbeinstellungen', 'sha')}
    settings={[
        {
            key: 'titleColor',
            label: __('Überschrift', 'sha'),
            onChange: setTitleColor,
        },
        {
            key: 'subtitleColor',
            label: __('Untertitel', 'sha'),
            onChange: setSubtitleColor,
        },
    ]}
/>

 * In order to tie this in with the edit function, you need to 
 * use the edit function as an HOC:
edit: withColors('titleColor', 'textColor')(props => {
    …
}),
 *
 * mark@sayhello.ch 10.2.2022
 */

import { PanelColorSettings } from '@wordpress/block-editor';
import { _x } from '@wordpress/i18n';

const ColorPicker = ownProps => {
    const { props, label, settings } = ownProps;
    const { attributes } = props;

    const panel_settings = [];

    Object.keys(settings).map(setting => {
        let { key, label, onChange } = settings[setting];
        panel_settings.push({
            value: attributes[key].color,
            onChange,
            label,
        });
    });

    return (
        <PanelColorSettings
            title={label}
            initialOpen={true}
            colorSettings={panel_settings}
        ></PanelColorSettings>
    );
};

export default ColorPicker;
