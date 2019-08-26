const { Component } = wp.element;
const { RichText } = wp.blockEditor;
const { _x } = wp.i18n;

export class CatchLine extends Component {

	constructor(props) {
		super(...arguments);
		this.props = props;
	}

	render() {

		const { catchline, setAttributes } = this.props;

		return (
			<RichText
				tagName="p"
				format="string" // don't render as HTML
				allowedFormats={[]} // turn off bold etc
				placeholder={_x('Geben Sie eine Spitzmarke ein', 'Field placeholder', 'sha')}
				className="c-block__catchline"
				multiline={false}
				value={catchline}
				keepPlaceholderOnFocus={true}
				onChange={(newValue) => {
					setAttributes({catchline: newValue});
				}}
			/>
		);
	}
}
