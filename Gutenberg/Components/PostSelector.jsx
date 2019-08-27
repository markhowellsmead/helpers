/**
 * Post selector for Say Hello components
 * mark@sayhello.ch 27.8.2019
 *
 * Usage:
	<PostSelector
		post_type="post"
		attributes={attributes}
		setAttributes={setAttributes}
		label={_x( 'Blogpost auswählen', 'Select field label', 'sha' )}
	/>
 */

const { SelectControl } = wp.components;
const { select, withSelect } = wp.data;
const { Component } = wp.element;
const { _x } = wp.i18n;

class PostSelector extends Component {

	constructor(props) {
		super(...arguments);
		this.props = props;
	}

	setPost( post ) {
		const { setAttributes } = this.props;
		setAttributes( { post } );
	}

	/**
	 * Must return a single DOM node, hence the anonymous wrapper
	 */
	render() {

		const { attributes, name, selectOptions, label } = this.props;
		const { post } = attributes;

		return (
			<SelectControl
				label={label}
				value={post}
				options={selectOptions}
				onChange={this.setPost.bind( this )}
			/>
		);
	}
}

export default withSelect( ( select, props ) => {

	const { getEntityRecords } = select( 'core' );

	let posts = getEntityRecords( 'postType', props.post_type, {
		per_page: -1,
		orderby: 'title',
		order: 'asc'
	} );

	if ( !posts ) {
		return posts;
	}

	let selectOptions = [{
		label: _x( 'Auswählen', 'Default selector label', 'sha' ),
		value: ''
	}];

	posts.map( post => {
		selectOptions.push( { value: post.id, label: post.title.raw } );
	} );

	return {
		selectOptions: selectOptions
	};

} )( PostSelector );
