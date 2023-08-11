# Spacer block

The regular core spacer block uses an unconstrained slider for a pixel value. The Say Hello 
version uses a scaling factor logic and CSS Custom Properties (which can be overridden by 
the Theme), which allows for a better adjustment across breakpoints.

* [Spacer block](https://github.com/SayHelloGmbH/shb-spacer)

## Add more spacer sizes

Use `wp.hooks.addFilter` and `lodash.assign` to extend `settings.styles` on the block.

* [Extend spacer sizes](https://github.com/SayHelloGmbH/Gutenberg/blob/master/blockfilter/spacer-sizes/index.js)
