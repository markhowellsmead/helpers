# WordPress Data Store

*Updated April 2024*

The code in these examples shows how to implement a custom data store in WordPress Gutenberg. The 
basic principle is to register a REST API endpoint in PHP and then to register a custom data store 
in the Gutenberg Editor to fetch data from (and send data to) that endpoint.

The data can then be requested by means of regular functions in the `@wordpress/data` construct; 
for example through a Higher Order Component or through the use of `useEffect`.

## Requirements

- WordPress 6.5+

## Authors

- mark@sayhello.ch
