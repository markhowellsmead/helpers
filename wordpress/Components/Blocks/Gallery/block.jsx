import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { Icon, Button } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

registerBlockType( 'namespace/gallery', {
	title: __( 'Gallery', 'text-domain' ),
	icon: <Icon icon={<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false"><path fill="none" d="M0 0h24v24H0V0z"></path><g><path d="M20 4v12H8V4h12m0-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 9.67l1.69 2.26 2.48-3.1L19 15H9zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"></path></g></svg>} />,
	category: 'common',
	attributes: {
		// array of image ids
		ids: {
			type: 'Array',
			default: false
		},
		// array of image objects
		images: {
			type: 'Array',
			default: false
		},
	},
	edit( props ) {

		const { images, ids } = props.attributes;

		function onSelectImages( selection ) {
			console.log( selection );
			let ids = [];
			let images = [];

			selection.map( image => {
				ids.push( image.id );
				images.push( image );
			} );

			props.setAttributes( { images, ids } );
		}

		function empty() {
			props.setAttributes( { images: [], ids: [] } );
			console.log( props.attributes );
		}

		return ( <section className={'b-gallery'}>
			<div className={'b-gallery__inner'}>
				<div className={'b-gallery__action'}>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={( images ) => onSelectImages( images )}
							allowedTypes={[ 'image' ]}
							multiple={true}
							gallery={true}
							addToGallery={false}
              value={!!ids.length ? ids : undefined}
							render={( { open } ) => ( <Button isDefault onClick={open}>
								{__( 'Select images', 'text-domain' )}
							</Button> )}/>
					</MediaUploadCheck>
				</div>
				<Button isDestructive onClick={empty}>Reset</Button>
				{images && <div className={'b-gallery__grid'}>
					{images.map( image => {
						console.log(image);
						return ` ${image.id} `
					})}
				</div>}
			</div>
		</section> );
	},
	save( props ) {

		const { images } = props.attributes;

		return ( <section className={`b-gallery`}>
			<div className={'b-gallery__inner'}>
				<div className={'b-gallery__grid'}>
					{/* images.map( image => {
						console.log(image);
						return ` ${image.id} `
					})} */}
				</div>
			</div>
		</section> );
	}
} );
