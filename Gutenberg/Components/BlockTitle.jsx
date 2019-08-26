const { Component } = wp.element;
const { RichText } = wp.blockEditor;
const { _x } = wp.i18n;

export class BlockTitle extends Component {

	constructor(props) {
		super(...arguments);
		this.props = props;
	}

	render() {

		const { tagName, title, setAttributes } = this.props;

		return (
			<RichText
				tagName={tagName}
				format="string" // don't render as HTML
				allowedFormats={[]} // turn off bold etc
				placeholder={_x('Geben Sie ein Titel ein', 'Field placeholder', 'sha')}
				className="c-block__title"
				multiline={false}
				value={title}
				keepPlaceholderOnFocus={true}
				onChange={(value) => {
					setAttributes({title: value});
				}}
			/>
		);
	}
}
