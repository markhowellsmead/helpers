/**
 * Link Button for Say Hello components
 * mark@sayhello.ch 4.9.2019
 * All hail Jim Schofield! https://jschof.com/gutenberg-blocks/reusable-components-in-wordpress-gutenberg/
 *
 * Usage:
 * 1:
import LinkButton from '../vendor/LinkButton.jsx';
 *
 * 2:
<LinkButton
	className="o-button"
	attributes={attributes}
	setAttributes={setAttributes}
/>
 * 3:
 * Add attributes buttonUrl and buttonText (both strings) to the block
 * This version doesn't currently support multiple buttons in the same block
 *
 * 4:
 * In the save() function:
{
	attributes.buttonText && attributes.buttonUrl &&
	<LinkButton.View
		className="o-button"
		text={attributes.buttonText}
		url={attributes.buttonUrl}
	/>
}
 */

const { Component } = wp.element;
const { RichText, URLInputButton } = wp.blockEditor;
const { _x } = wp.i18n;

const LinkButton = (props) => {

	const { attributes, className, setAttributes } = props;
	const class_name = className || 'o-button';

	return (
		<div>
			<RichText
				className={class_name}
				value={attributes.buttonText}
				placeholder={_x('Button-Beschriftung', 'Button placeholder text', 'sht')}
				onChange={(value) => {
					setAttributes({buttonText: value.replace(/<\/?[^>]+(>|$)/g, '')});
				}}
			/>
			<URLInputButton
				url={attributes.buttonUrl}
				onChange={(value) => {
					setAttributes({buttonUrl: value.replace(/<\/?[^>]+(>|$)/g, '')});
				}}
			/>
		</div>
	);
}

LinkButton.View = (props) => {
	const class_name = props.className || 'o-button';
    return (
        <RichText.Content
            className={class_name}
            value={props.text}
            tagName="a"
            href={props.url}
        />
    )
}

export default LinkButton;
