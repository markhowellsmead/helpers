# WordPress.module.toggle-expose
Module code for a WordPress gallery, built with the Advanced Custom Fields plugin, jQuery, and Sass.

## Usage
The code was developed for use with the [Advanced Custom Fields Gallery field](https://www.advancedcustomfields.com/resources/gallery/). The PHP can be implemented as a [template part](https://developer.wordpress.org/reference/functions/get_template_part/). It loops through the images selected in the ACF field and outputs them as a series of `figure` elements with background images.

Using the Sass in this repo, the first two images will be shown side by side, followed by a button. Clicking on the button hides it and swaps out the `data-style` attributes on the remaining `figure` elements for a proper `style` attribute, which will then load the referenced images.

Elements would be hidden by use of the state class `is-hidden`, which isn't part of the Sass for this module.

## Author
Mark Howells-Mead, permanenttourist.ch, August 2016
