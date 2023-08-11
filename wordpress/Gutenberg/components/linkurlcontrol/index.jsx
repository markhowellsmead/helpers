/**
 * Link URL for Say Hello components
 * mark@sayhello.ch 25.6.2020
 *
 * Usage:
 * 1:
import LinkUrlControl from '../_components/linkurlcontrol.jsx';
 *
 * 2:
<LinkUrlControl
	className="o-link"
	attributes={attributes}
	setAttributes={setAttributes}
	label={ _x( 'Link definieren (optional)', 'Component label', 'sha' ) }
/>
 * 3:
 * Add attribute linkUrl (string) to the block
 *
 * 4:
 * In the save() function:
{
	!!attributes.text && !!attributes.linkUrl &&
	<LinkUrlControl.View
		className="o-link"
		attributes={attributes}
	/>
}
 * 5:
 * Add the following to the admin.scss file:
 .o-linkurlcontrol {
	.block-editor-url-input__input {
		max-width: 100%;
		border: 1px solid #757575 !important; // should be in core, but isn't
	}
}
 */

import { URLInput, RichText } from '@wordpress/block-editor';
import { BaseControl } from '@wordpress/components';
import { Component } from '@wordpress/element';
import { _x } from '@wordpress/i18n';

const LinkUrlControl = ( props ) => {

	const { attributes, className, setAttributes, label, help } = props;
	const class_name = className || 'o-link';

	return (
		<BaseControl
			label={label}
			help={help}
			>
			<URLInput
				className='o-linkurlcontrol'
				value={attributes.linkUrl}
				onChange={(value) => {
					setAttributes({linkUrl: value.replace(/<\/?[^>]+(>|$)/g, '')});
				}}
			/>
		</BaseControl>
	);
}

LinkUrlControl.View = ( props ) => {
	const class_name = props.className || 'o-link';
	const { attributes } = props;
	return (
		<RichText.Content
			className={class_name}
			value={attributes.text}
			tagName="a"
			href={attributes.linkUrl}
		/>
	)
}

export default LinkUrlControl;
