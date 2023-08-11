# Gutenberg Block: native Gallery

Adds a gallery Block to the editor, which uses the `MediaUpload` component from
WordPress Core and a server-side rendered output.

## Usage

- Add the JavaScript files in their folder to the normal structure in the Theme.
- Add the Package file in the usual location.
- Add the template partial in the indicated location.

## Notes

- This Block example contains no CSS, as each project can be comparatively unique.
- The `updated` attribute only serves to force the server-side render to update. Without this, if the array of image IDs isn't changed when the media uploader closes (even if a caption is changed), then the editor won't re-load the view.

## Requirements

* WordPress 5.6

## Author

- mark@sayhello.ch December 2020
- Initial version: joel@sayhello.ch March 2020
