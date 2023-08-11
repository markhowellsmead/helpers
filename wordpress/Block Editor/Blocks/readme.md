# Common Custom Blocks for the WordPress Block Editor

The code in these examples can be implemented 1:1 in a site which 
is running a Theme built using our boilerplate [Hello Roots](https://github.com/SayHelloGmbH/hello-roots/). 

Many of the blocks - especially the client-side rendered ones - can be 
used in pretty much any WordPress 5.x+ installation, as they adhere 
to the standards set out by WordPress Core developers.

## Build process

The build process - using Gulp and Webpack - is part of [Hello Roots](https://github.com/SayHelloGmbH/hello-roots/) 
and is therefore not documented here. The process requires the 
use of the [@wordpress/dependency-extraction-webpack-plugin](https://github.com/WordPress/gutenberg/tree/master/packages/dependency-extraction-webpack-plugin), 
which allows the use of the `import { _x } from '@wordpress/i18n';` syntax.

## Requirements

- WordPress 5.4
- WordPress Theme built using [Hello Roots](https://github.com/SayHelloGmbH/hello-roots/)

## Authors

- mark@sayhello.ch April 2020
