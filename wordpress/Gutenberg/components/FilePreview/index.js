/**
 * Image preview for Say Hello components
 * (Usually for use in the render function of <MediaUpload />)
 * mark@sayhello.ch December 2020
 *
 * Usage:

import FilePreview from '../_components/FilePreview';
…
<FilePreview onClick={open} file={file_attribute} />

*/
 
import { withSelect } from '@wordpress/data';
import { Fragment } from '@wordpress/element';
import { _x } from '@wordpress/i18n';

let FilePreview = ({ file, fileData, onClick }) => {
    if (!file || !fileData) {
        return null;
    }

    return (
        <Fragment>
            {!!fileData.media_details.sizes.medium.source_url && (
                <img
                    className='o-mediaselector__image o-mediaselector__image--file'
                    src={fileData.media_details.sizes.medium.source_url}
                    alt={fileData.alt}
                    onClick={onClick}
                />
            )}
        </Fragment>
    );
};

FilePreview = withSelect((select, ownProps) => {
    return {
        fileData: select('core').getMedia(ownProps.file),
    };
})(FilePreview);

export default FilePreview;
