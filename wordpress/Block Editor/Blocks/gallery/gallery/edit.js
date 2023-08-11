import { getBlockDefaultClassName } from '@wordpress/blocks';
import { InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, PanelBody } from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';
import ServerSideRender from '@wordpress/server-side-render';
import { _x } from '@wordpress/i18n';

const blockName = 'sht/gallery';
const classNameBase = getBlockDefaultClassName(blockName);

export default class Edit extends Component {
    constructor(props) {
        super(...arguments);
        this.props = props;
    }

    render() {
        const { attributes, setAttributes } = this.props;
        const { className, images, updated } = attributes;

        setAttributes({ className: classNameBase });

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={_x('Bilder', 'PanelBody title', 'sha')}>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={selection => {
                                    let images = [];
                                    selection.map(image => {
                                        images.push(image.id);
                                    });

                                    // Force the server-side render to update
                                    // so that e.g. new captions are correctly
                                    // displayed
                                    setAttributes({ images, updated: Date.now() });
                                }}
                                allowedTypes={['image']}
                                value={images ? images : undefined}
                                multiple={true}
                                gallery={true}
                                addToGallery={false}
                                render={({ open }) => (
                                    <Button isPrimary onClick={open}>
                                        {!!images
                                            ? _x(
                                                  'Bildauswahl anpassen',
                                                  'Media control button text',
                                                  'sha'
                                              )
                                            : _x(
                                                  'Bilder auswählen',
                                                  'Media control button text',
                                                  'sha'
                                              )}
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                    </PanelBody>
                </InspectorControls>
                {images && (
                    <ServerSideRender
                        block={blockName}
                        attributes={{ className: className, images: images, updated: updated }}
                    />
                )}
                {!images && (
                    <div className='c-editormessage c-editormessage--error'>
                        Keine Bilder ausgewählt.
                    </div>
                )}
            </Fragment>
        );
    }
}
