import { __ } from '@wordpress/i18n';
import { ColorPalette } from '@wordpress/components';
import { withSelect, withDispatch, useSelect } from '@wordpress/data';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { registerPlugin } from '@wordpress/plugins';

let PostColorSelector = (props) => {
	return (
		<ColorPalette
			colors={props.colors}
			value={props.color_metafield}
			label={__('Post colour', 'sht')}
			onChange={(color) => props.onMetaFieldChange(color)}
		/>
	);
};

PostColorSelector = withSelect((select) => {

	let colors = [],
		colorSettings = select( "core/editor" ).getEditorSettings().colors;

	if ( colorSettings ) {
		colorSettings.map( color => {
			colors.push( { color: color.color, name: color.name } );
		} );
	}

	return {
		colors: colors,
		color_metafield: select('core/editor').getEditedPostAttribute('meta')['_sht_post_color']
	}
})(PostColorSelector);

PostColorSelector = withDispatch((dispatch) => {
	return {
		onMetaFieldChange: (value) => {
			dispatch('core/editor').editPost({meta: {_sht_post_color: value}})
		}
	}
})(PostColorSelector);

const PostColorSelectorPanel = () => {
	const postType = useSelect( select => select( 'core/editor' ).getCurrentPostType() );

	if ( 'post' !== postType ) {
		return null;
	}

	return(
		<PluginDocumentSettingPanel
			name='sht-post-color'
			title={__('Post colour', 'sht')}
			icon='admin-appearance'
		>
			<PostColorSelector/>
		</PluginDocumentSettingPanel>
	);
}
registerPlugin( 'sht-post-color-panel', { render: PostColorSelectorPanel } );
