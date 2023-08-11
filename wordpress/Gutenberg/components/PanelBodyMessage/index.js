/**
 * Message element for use inside a PanelBody in
 * the Editor.
 *
 * Usage:
 *
 import PanelBodyMessage from '../_components/PanelBodyMessage';

 <PanelBodyMessage message={_x('Hello World', 'PanelBody message', 'sha')} />
 */

const PanelBodyMessage = ({ message }) => {
    return (
        <div className='o-panelbodymessage'>
            <p className='o-panelbodymessage__message'>{message}</p>
        </div>
    );
};

export default PanelBodyMessage;
