import { _x } from '@wordpress/i18n';
import { AlignmentToolbar, BlockControls } from '@wordpress/block-editor';
import { ServerSideRender } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { Component, Fragment } from '@wordpress/element';

class Edit extends Component {
	render() {
		const { attributes, post_excerpt, post_title, setAttributes } = this.props;
		const { alignment } = attributes;

		const onChangeAlignment = ( newAlignment ) => {
			setAttributes({ alignment: newAlignment === undefined ? 'none' : newAlignment });
		};

		return (
			<Fragment>
				<BlockControls>
					<AlignmentToolbar
						value={ alignment }
						onChange={ onChangeAlignment }
					/>
				</BlockControls>
				<ServerSideRender
					block='sht/post-header'
					attributes={{
						alignment: attributes.alignment,
						post_title: post_title,
						post_excerpt: post_excerpt
					}}
					/>
			</Fragment>
		);
	}
}

export default withSelect(function(select) {
	return {
		post_title: select('core/editor').getEditedPostAttribute('title'),
		post_excerpt: select('core/editor').getEditedPostAttribute('excerpt'),
	};
})(Edit);
