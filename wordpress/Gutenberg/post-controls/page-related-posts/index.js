/*
 * Adds a Panel to the main Block Editor sidebar
 * and uses the custom component PostSelectorHierarchicalCheckboxes
 * to provide a hierarchical list of hierarchical page checkboxes.
 *
 * In order to save / load the post meta “sht_related_post_ids”,
 * it must be registered in PHP using “register_post_meta”.
 *
 * Since August 2023
 * mark[at]sayhello.ch
 *
 */

import { PostSelectorHierarchicalCheckboxes } from '../../_components/post-selector-hierarchical-checkboxes';

import { _x } from '@wordpress/i18n';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { compose } from '@wordpress/compose';
import { withDispatch, withSelect } from '@wordpress/data';
import { registerPlugin } from '@wordpress/plugins';

const validPostTypes = ['page'];

const isValidPostType = function (name) {
	return validPostTypes.includes(name);
};

let RelatedPostsPanel = ({ sht_related_post_ids, post_type, onUpdate }) => {
	if (!isValidPostType(post_type)) {
		return null;
	}

	return (
		<PluginDocumentSettingPanel title={_x('Verwandte Seiten', 'Editor sidebar panel title', 'sha')} initialOpen={true} icon={'invalid-name-no-icon'}>
			<PostSelectorHierarchicalCheckboxes postType={post_type} onChange={(postIds) => onUpdate(postIds)} values={sht_related_post_ids} />
		</PluginDocumentSettingPanel>
	);
};

const RelatedPostsPanelWithCompose = compose([
	withSelect((select) => {
		return {
			post_type: select('core/editor').getCurrentPostType(),
			sht_related_post_ids: select('core/editor').getEditedPostAttribute('meta')['sht_related_post_ids'],
		};
	}),
	withDispatch((dispatch) => {
		return {
			onUpdate: (metaValue) => {
				dispatch('core/editor').editPost({ meta: { sht_related_post_ids: metaValue } });
			},
		};
	}),
])(RelatedPostsPanel);

registerPlugin('sht-related-posts-panel', { render: RelatedPostsPanelWithCompose });
