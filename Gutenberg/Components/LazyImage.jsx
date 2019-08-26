const {Component} = wp.element;

export const getLazySrcs = async function (imageId, size='full') {
	return new Promise((resolve, reject) => {
		wp.apiFetch({path: `/hello-roots/v1/lazy-image/${imageId}/?size=${size}`})
			.then(resp => {
				resolve(resp);
			})
			.catch(resp => {
				console.log('reject', resp);
				reject(resp);
			})
	});
};

export class LazyImage extends Component {

	constructor(props) {
		super(...arguments);
		this.props = props;
	}

	render() {
		if (this.props.image === undefined) {
			return <p>Kein Bild gefunden</p>;
		}

		const image = this.props.image;

		let srcset = [];
		Object.keys(image.srcset).forEach(size => {
			srcset.push(`${image.srcset[size]} ${size}w`);
		});
		srcset = srcset.reverse().join(', ');

		let className = 'o-lazyimage';
		if (this.props.background === true) {
			className += ' o-lazyimage--background'
		}
		if (image.svg) {
			className += ' o-lazyimage--svg'
		}
		if (this.props.className) {
			className += ' ' + this.props.className;
		}
		if (this.props.background === true) {
			if (this.props.admin) {
				return (
					<figure className={className}>
						<div {...image.attributes} className="o-lazyimage__image o-lazyimage__image--lazyloaded" style={{backgroundImage: `url('${image.org[0]}')`}}/>
					</figure>
				);
			}
			return (
				<figure className={className}>
					{
						!image.svg &&
						<div className="o-lazyimage__preview" style={{backgroundImage: `url('${image.pre}')`}}/>
					}
					<div {...image.attributes} className="o-lazyimage__image o-lazyimage__image--lazyload" style={{backgroundImage: `url('${image.pre}')`}} data-bgset={srcset}/>
					<noscript>
						<div {...image.attributes} className="o-lazyimage__image" style={{backgroundImage: `url('${image.org[0]}')`}}/>
					</noscript>
				</figure>
			);
		}
		if (this.props.admin) {
			return (
				<figure className={className}>
					<img {...image.attributes} className="o-lazyimage__image o-lazyimage__image--lazyloaded" src={image.org[0]} srcset={srcset}/>
				</figure>
			);
		}
		return (
			<figure className={className}>
				{
					!image.svg &&
					<img className='o-lazyimage__preview' src={image.pre}/>
				}
				<img {...image.attributes} className="o-lazyimage__image o-lazyimage__image--lazyload" data-sizes="auto" src={image.pre} data-srcset={srcset}/>
				<noscript><img {...image.attributes} className="o-lazyimage__image" src={image.org[0]} srcset={srcset}/></noscript>
			</figure>
		);
	}
}
