import { registerBlockType, getBlockDefaultClassName } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps, RichText } from '@wordpress/block-editor';
import { __, _x } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { closeSmall, chevronLeft, chevronRight } from '@wordpress/icons';

// Say Hello
import ImageSelectorWithPlaceholder from '../_components/ImageSelectorWithPlaceholder';
import { LazyImage } from '../_components/LazyImage';

const blockName = 'sht/logo-gallery';
const classNameBase = getBlockDefaultClassName( blockName );

registerBlockType( blockName, {
    title: _x( 'Logo Gallery', 'Block title', 'sha' ),
    description: _x( 'Auflistung von Logos in einem Rasterlayout. Die Reihenfolge kann frei bestimmt werden.', 'Block description', 'sha' ),
    icon: 'columns',
    category: 'design',
    supports: {
        align: false,
        html: false,
    },
    attributes: {
        clients: {
            type: 'Array',
            default: []
        },
        image: {
            type: 'Object',
            default: {
                id: false,
            },
        },
    },
    edit: ( props ) => {
        const { attributes, setAttributes } = props;
        const { image, clients } = attributes;
        const blockProps = useBlockProps();

        if ( !!image.id ) {
            image.index = clients.length;
            setAttributes( {
                clients: [
            ...clients,
            image
          ],
                image: {
                    type: 'Object',
                    default: {
                        id: false
                    },
                }
            } );
        }

        return (
            <div { ...blockProps }>
          <div className={`${classNameBase}__list`}>
            {clients.map(image => {
              return (
                <div className={`${classNameBase}__list-item`}>
                  <div className={'components-button-group is-left'}>
                    <Button
                      icon={ chevronLeft }
                      label={ __( 'Move image backward' ) }
                      disabled={!clients.indexOf(image)}
                      onClick={e => {
                        const index = clients.indexOf(image);
                        const targetIndex = clients.indexOf(image) - 1;

                        let update = [];
                        clients.map(client => {
                          const currentIndex = clients.indexOf(client);
                          if (image.index !== client.index) {
                            if (currentIndex == targetIndex) {
                              update.push(image);
                              update.push(client);
                            } else {
                              update.push(client);
                            }
                          }
                        })
                        setAttributes({clients: update})
                      }}
                    >
                    </Button>
                    <Button
                      icon={ chevronRight }
                      label={ __( 'Move image forward' ) }
                      disabled={clients.indexOf(image) == (clients.length - 1)}
                      onClick={e => {
                        const index = clients.indexOf(image);
                        const targetIndex = clients.indexOf(image) + 1;

                        let update = [];
                        clients.map(client => {
                          const currentIndex = clients.indexOf(client);
                          if (image.index !== client.index) {
                            if (currentIndex == targetIndex) {
                              update.push(client);
                              update.push(image);
                            } else {
                              update.push(client);
                            }
                          }
                        })
                        setAttributes({clients: update})
                      }}
                    >
                    </Button>
                    </div>
                    <div className={'components-button-group is-right'}>
                    <Button
                      icon={ closeSmall }
                      label={ __( 'Remove image' ) }
                      onClick={e => {
                        const index = clients.indexOf(image);
                        // let update = [];
                        // clients.splice(index, 1);
                        // update = clients;
                        // console.log(update);
                        let update = [];
                        clients.map(client => {
                          if (image.index !== client.index) {
                            update.push(client);
                          }
                        })
                        setAttributes({clients: update})
                      }}
                    >
                    </Button>
                  </div>
                  <LazyImage
                      className={`${classNameBase}__figure`}
                      image={image}
                      background={false}
                      admin={true}
                  />
                </div>
              )
            })}
            <div className={`${classNameBase}__list-item ${classNameBase}__list-item--add`}>
              <ImageSelectorWithPlaceholder
                  attributes={attributes}
                  setAttributes={setAttributes}
                  allowedTypes={['image/jpeg', 'image/png', 'image/svg']}
                  accept={'image/jpeg'}
                  allowURL={false}
                  labels={{
                      title: _x('Bild auswÃ¤hlen', 'MediaPlaceholder title', 'sha'),
                      instructions: _x(
                          'Bitte wÃ¤hlen Sie ein Bild aus. (JPG.)',
                          'MediaPlaceholder instructions',
                          'sha'
                      ),
                  }}
              />
            </div>
          </div>
        </div>
        );
    },
    save: ( props ) => {
        const { attributes } = props;
        const { image, clients } = attributes;
        const blockProps = useBlockProps.save();

        return (
            <div { ...blockProps }>
          <div className={`${classNameBase}__list`}>
            {clients.map(image => {
              return (
                <div className={`${classNameBase}__list-item`}>
                  <LazyImage
                      className={`${classNameBase}__figure`}
                      image={image}
                      background={false}
                      admin={false}
                  />
                </div>
              )
            })}
          </div>
        </div>
        );
    },
} );
