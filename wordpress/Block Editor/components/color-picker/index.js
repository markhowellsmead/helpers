/**
 * This is a complete panel with two colour selectors. The functions
 * like setTextColor and the objects like textColor are provided by 
 * the withColors functionality. (withColors comes from @wordpress/block-editor.)
 * 
 * Usage: add backgroundColor and textColor as block attributes. Then,

import ColorPicker from './colorpicker';
…
<ColorPicker props={props} />

 * In order to tie this in with the edit function, you need to 
 * use the edit function as an HOC:

edit: withColors('backgroundColor', 'textColor')(props => {
    …
}),

 *
 * mark@sayhello.ch 11.3.2021
 */

import { ContrastChecker, PanelColorSettings } from '@wordpress/block-editor';
import { _x } from '@wordpress/i18n';

const ColorPicker = ({ props }) => {
	const { backgroundColor, textColor, setBackgroundColor, setTextColor } = props;

	return (
		<PanelColorSettings
			title={_x('Farbeinstellungen', 'Panel label', 'sha')}
			initialOpen={false}
			colorSettings={[
				{
					value: textColor.color,
					onChange: setTextColor,
					label: _x('Textfarbe', 'Color settings label', 'sha'),
				},
				{
					value: backgroundColor.color,
					onChange: setBackgroundColor,
					label: _x('Hintergrundfarbe', 'Color settings label', 'sha'),
				},
			]}
		>
			<ContrastChecker backgroundColor={backgroundColor.color} textColor={textColor.color} />
		</PanelColorSettings>
	);
};

export default ColorPicker;
