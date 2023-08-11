# Gutenberg Block: Header with Parallax

Provides a header element (similar to the Cover Block) with a true parallax-effect on the image. 
(The “parallax” effect on the Cover Block is only a fixed background image, not a true parallax effect.)

## Demo

* Source: https://pixelcog.github.io/parallax.js/
* As a WordPress Block: https://posthuis.ch/

![Preview](./header-parallax.jpg)

## Usage

### Gutenberg

Add the _index.js_ and _edit.js_ files to the regular Gutenberg JavaScript structure (inside a subfolder _header-parallax_).

The Block currently doesn't support custom colours. All the pre-defined colours from the assets/settings.json file will be 
made available for selection as a gradient colour and as a text colour.

### JavaScript

- Install [jquery.parallax](https://github.com/pixelcog/parallax.js/) from npm: `npm i --save jquery-parallax.js`
- Add [the parallax.js file](./scripts/parallax.js) to the regular scripts folder as _.build/assets/scripts/parallax/index.js_. Webpack will generate a compiled version as _/assets/scripts/parallax.min.js_.
- Add the snippet from [this example code](./scripts/index.js) to _scripts/ui/index.js_. This will only load the generated parallax script in the front-end if there is a parallax element on the page.

### SCSS

- Add [the CSS file](./_sht-header-parallax.scss) to the regular SCSS structure.

## Author

mark@sayhello.ch November 2020
