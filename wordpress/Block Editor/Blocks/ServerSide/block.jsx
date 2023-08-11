const {ServerSideRender} = wp.components;
const {__} = wp.i18n;

wp.blocks.registerBlockType('sht/contact-banner', {
	title: 'Contact Banner',
	icon: 'email',
	category: 'sht/blocks',

	edit(props) {
		return (
			<ServerSideRender
				block="sht/contact-banner" // https://site.hello/wp-json/wp/v2/block-renderer/sht/contact-banner?context=edit&lang=de&_locale=user
				attributes={props.attributes}
			/>
		);
	},
	save() {
		return null;
	},
});
