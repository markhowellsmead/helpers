/**
 * Custom React component used to render a hierarchical list
 * of posts in the WordPress Block Editor. It's a bit slow if
 * there are a lot of posts and it can only cope with as many
 * posts as the REST API can return in one request. (100.)
 *
 * Since August 2023.
 * mark[at]sayhello.ch
 *
 */

import { withSelect } from '@wordpress/data';
import { CheckboxControl, Spinner } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

import './index.scss';

function buildHierarchy(posts, parentId = 0) {
	const hierarchy = [];

	for (const post of Object.values(posts)) {
		if (post.parent === parentId) {
			const children = buildHierarchy(posts, post.id);
			const postItem = {
				value: post.id,
				label: post.title.rendered,
			};

			if (children.length > 0) {
				postItem.children = children;
			}

			hierarchy.push(postItem);
		}
	}
	return hierarchy;
}

function NestedList({ posts, activePostIds, setActivePostIds, removeElement = (element) => element }) {
	if (posts?.length === 0) {
		return <div className="c-editormessage">Keine Seiten gefunden.</div>;
	}

	posts.forEach((post) => {
		post.label = post.label.replace(/&#(\d+);/g, function (match, dec) {
			return String.fromCharCode(dec);
		});
	});

	return (
		<ul className="sht-post-selector-list__entries">
			{posts.map((post) => {
				return (
					<li key={post.value}>
						<CheckboxControl label={post.label} checked={activePostIds.indexOf(post.value) !== -1} onChange={(checked) => setActivePostIds(checked ? [...removeElement(post.value), post.value] : removeElement(post.value))} />
						{post.children && <NestedList removeElement={removeElement} posts={post.children} activePostIds={activePostIds} setActivePostIds={setActivePostIds} />}
					</li>
				);
			})}
		</ul>
	);
}

const PostSelectorHierarchicalCheckboxesBase = ({ onChange, values = [], posts = [], filter = (posts) => posts }) => {
	const [activePostIds, setActivePostIds] = useState(values);

	useEffect(() => {
		onChange(activePostIds);
	}, [activePostIds]);

	const removeElement = (element) => activePostIds.filter((e) => e !== element);

	const filteredPosts = filter(posts);

	if (!filteredPosts) {
		return <Spinner />;
	}

	const hierarchicalArray = buildHierarchy(filteredPosts);
	return <NestedList removeElement={removeElement} activePostIds={activePostIds} setActivePostIds={setActivePostIds} posts={hierarchicalArray} />;
};

const PostSelectorHierarchicalCheckboxes = withSelect((select, props) => {
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
})(PostSelectorHierarchicalCheckboxesBase);

export { PostSelectorHierarchicalCheckboxes };
