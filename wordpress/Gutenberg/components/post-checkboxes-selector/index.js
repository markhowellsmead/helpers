/*
 * Since 11.8.2023
 * See https://github.com/SayHelloGmbH/Toolbox/blob/master/Gutenberg/components/post-selector-hierarchical-checkboxes/index.js
 * for a hierarchical version.
 */

import { withSelect } from '@wordpress/data';
import { CheckboxControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

const PostCheckboxesSelector = ({ onChange, values = [], posts = [], filter = (posts) => posts }) => {
	const [activePostIds, setActivePostIds] = useState(values);

	useEffect(() => {
		onChange(activePostIds);
	}, [activePostIds]);

	const removeElement = (element) => activePostIds.filter((e) => e !== element);

	const filteredPosts = filter(posts);

	return <div>{filteredPosts && filteredPosts.map((post) => <CheckboxControl label={post.title.rendered} checked={activePostIds.indexOf(post.id) !== -1} onChange={(checked) => setActivePostIds(checked ? [...removeElement(post.id), post.id] : removeElement(post.id))} />)}</div>;
};

export default withSelect((select, props) => {
	const { getEntityRecords } = select('core');
	const { postQueryParams = {} } = props;

	return {
		posts: getEntityRecords('postType', props.postType, {
			post_status: 'publish',
			order: 'asc',
			orderby: 'menu_order',
			per_page: -1,
			...postQueryParams,
		}),
	};
})(PostCheckboxesSelector);
