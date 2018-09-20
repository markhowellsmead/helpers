# Carousel

## Preferred

* http://idangero.us/swiper/

## Others

* http://foundation.zurb.com/sites/docs/orbit.html
* http://kenwheeler.github.io/slick/
* https://github.com/mattbryson/TouchSwipe-Jquery-Plugin

````
/**
 * Implementation script which adds swipe functionality to an existing slider
 * Only use this if the carousel JavaScript doesn't already offer touch support
 * Required library: jquery-touchswipe
 *
 * Since 2010
 *
 * npm install jquery-touchswipe --save-dev
 * or
 * https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
 *
 * Info
 * https://www.awwwards.com/touchswipe-a-jquery-plugin-for-touch-and-gesture-based-interaction.html
 */

(function($, undefined) {
    $(document).on('ready.touchswipe', function() {
        if ($.fn.swipe) {
            $('#element').swipe({
                //Generic swipe handler for all directions
                swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
                    if (direction === 'left') {
                        slide('prev'); // USE THE CORRECT FUNCTION FROM THE SLIDER
                    } else if (direction === 'right') {
                        slide('next'); // USE THE CORRECT FUNCTION FROM THE SLIDER
                    }
                }
            });
        }
    });
})(jQuery);
````
