/**
 * Block Title for Say Hello components
 * mark@sayhello.ch 26.8.2019
 *
 * Usage:
	<BlockTitle
		title={attributes.title}
		setAttributes={setAttributes}
		/>
 * OR:
	<BlockTitle
		tagName="h1"
		title={attributes.title}
		setAttributes={setAttributes}
		/>
 */

import { Component } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';
import { _x } from '@wordpress/i18n';

export class BlockTitle extends Component {
	constructor(props) {
		super(...arguments);
		this.props = props;
	}

	render() {
		const { tagName, title, setAttributes } = this.props;

		let tag_name = tagName;
		if (!tag_name) {
			tag_name = 'h2';
		}

		return (
			<RichText
				tagName={tag_name}
				format="string" // don't render as HTML
				allowedFormats={[]} // turn off bold etc
				placeholder={_x(
					'Geben Sie ein Titel ein',
					'Field placeholder',
					'sha'
				)}
				className="c-block__title"
				multiline={false}
				value={title}
				keepPlaceholderOnFocus={true}
				onChange={value => {
					setAttributes({ title: value });
				}}
			/>
		);
	}
}
