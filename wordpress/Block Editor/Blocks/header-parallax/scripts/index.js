// Add the following to the base scripts/ui/index.js file
// sht_theme_data.directory_uri is passed in from PHP using wp_localize_script in the Assets Package

if (document.querySelectorAll('[data-parallax]').length) {
    const parallax_script = document.createElement('script');
    parallax_script.setAttribute(
        'src',
        sht_theme_data.directory_uri + '/assets/scripts/parallax.min.js'
    );
    document.head.appendChild(parallax_script);
}
