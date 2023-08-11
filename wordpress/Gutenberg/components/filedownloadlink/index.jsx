/**
 * Creates a download link for a file.
 * Pass file (the file ID) and classNameBase (a string)
 * in as component properties.
 *
 * If the file is coming from Media entries, then you'll
 * need to render the link in the save function using
 * an as-yet unprogrammed server-side solution. Otherwise, 
 * if the Media entry is changed (e.g. new title or new 
 * file), then a hard-coded URL in the Block won't be 
 * updated automatically.
 * 
 * This only works in the Editor. The use of withSelect
 * in the save funtion throws a hook error in React.
 *
 * The data source_url and title.rendered are pulled
 * in from the REST API using data select. Intended
 * for use in the Gutenberg Editor.
 *
 * Usage:
 
import { getBlockDefaultClassName } from '@wordpress/blocks';
let classNameBase = getBlockDefaultClassName( 'sht/my-block-name' );

…

<FileDownloadLink file={attributes.file_id} classNameBase={ classNameBase } />
 
 *
 * Since 3.12.2020 mark@sayhello.ch
 *
 */

import { withSelect } from '@wordpress/data';
import { Fragment } from '@wordpress/element';
import { sprintf, _x } from '@wordpress/i18n';

let FileDownloadLink = ( { classNameBase, file, fileData } ) => {

	if(!file || !fileData){
		return null;
	}

	let linktext = fileData.title.rendered ?? 'Download';

	return (
		<Fragment>
			{
				!!fileData.source_url &&
				<a href={fileData.source_url}
					download={true}
					className={`${classNameBase}__imagelink`}
					>{ linktext }</a>
			}
		</Fragment>
	);
};

export default withSelect( ( select, props ) => {
	return {
		fileData: select( 'core' ).getMedia( props.file );
	};
})( FileDownloadLink );
