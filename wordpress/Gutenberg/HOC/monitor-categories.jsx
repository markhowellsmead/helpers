import { _x } from '@wordpress/i18n';
import { ServerSideRender } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { Component, Fragment } from '@wordpress/element';

class Edit extends Component {

	constructor( props ) {
		super( ...arguments );
		this.props = props;
	}

	render() {

		const { attributes, post_categories, setAttributes } = this.props;

		setAttributes({
			categories: post_categories
		});

		return (
			<ServerSideRender
				block="sht/story-header"
				attributes={ attributes }
			/>
		);
	}
};

export default withSelect( ( select ) => {
	return {
		post_categories: select( 'core/editor' ).getEditedPostAttribute( 'categories' )
	};
} )( Edit );
