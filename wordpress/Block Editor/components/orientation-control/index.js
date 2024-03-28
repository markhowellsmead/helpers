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
