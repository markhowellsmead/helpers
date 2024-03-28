/*
 * Usual usage is to pass in a block attribute "orientation"
 * with a setAttributes call as the onChange property.
 *
 * mark@sayhello.ch since 29.3.2024
 */

import {
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { arrowDown, arrowRight } from '@wordpress/icons';

export const OrientationControl = props => {
    const { label, value, onChange } = props;

    return (
        <ToggleGroupControl label={label} value={value} isBlock={false} onChange={onChange}>
            <ToggleGroupControlOptionIcon
                icon={arrowDown}
                value={'vertical'}
                label={__('Vertical')}
            />
            <ToggleGroupControlOptionIcon
                icon={arrowRight}
                value={'horizontal'}
                label={__('Horizontal')}
            />
        </ToggleGroupControl>
    );
};
