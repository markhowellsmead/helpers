# Google Maps integrations for Hello Roots

The code examples here are intended for use as part of a WordPress Theme built with [Hello Roots](https://github.com/SayHelloGmbH/hello-roots).

## Passing data to JavaScript

Add this code to the Assets Package, ensuring that JavaScript file has the data it needs from WordPress.

```php
wp_localize_script(sht_theme()->prefix . '-script', 'sht_theme_data', [
	'directory_uri' => get_template_directory_uri(),
]);

if (function_exists('acf_get_setting')) {
	wp_localize_script(sht_theme()->prefix . '-script', 'sht_map_data', [
		'google_api_key' => acf_get_setting('google_api_key'),
	]);
	wp_localize_script(sht_theme()->prefix . '-script', 'sht_translations', [
		'reset' => _x('Zurücksetzen', 'Interactive control button text', 'sht'),
	]);
}
```

## Conditional loading of the maps initialisation script

Add to the base _ui/index.js_ file. This ensures that none of the dependent scripts are loaded 
if there are no maps on the current page.

```javascript
(function () {
	if(document.querySelectorAll('[data-map]').length) {
		let load_script = false;
		document.querySelectorAll('[data-map]').forEach(map => {
			if(getComputedStyle(map).display !== 'none') {
				load_script = true;
			}
		});
		if(load_script) {
			const maps_script = document.createElement('script');
			maps_script.setAttribute('src', sht_theme_data.directory_uri + '/assets/scripts/maps.min.js');
			document.head.appendChild(maps_script);
		}
	}
})();
```

## Own JavaScript

Add the three JavaScript files from this repo to the _assets/scripts/map_ folder within the .build structure. 
The Webpack compiler will create the minified file which contains all the functionality.

## Author

mark@sayhello.ch December 2020
