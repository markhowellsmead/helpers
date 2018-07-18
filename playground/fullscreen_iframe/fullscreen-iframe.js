/**
 * jQuery plugin, adds a click handler to a link with a 
 * data attribute 'fullscreeniframe'. The attribute should 
 * be a CSS identifier of the target element within the link's parent
 * which will be opened full-screen when the link is clicked.
 *
 * $('[data-fullscreeniframe]').fullScreenIframe();
 *
 * <div class="iframe-parent-with-no-own-function">
 * <a data-fullscreeniframe=".myiframe">Click</a>
 * <iframe class="myiframe" src="…" ></iframe>
 * </div>
 */
(function($) {
    $.extend($.fn, {
        fullScreenIframe: function() {

        	var currentElement;

        	var FShandler = function(){
        		if (currentElement && currentElement.parent() && !(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)){
					currentElement.parent().removeClass('is-fullscreen');
        		}
        	};

        	document.addEventListener("fullscreenchange", FShandler);
			document.addEventListener("webkitfullscreenchange", FShandler);
			document.addEventListener("mozfullscreenchange", FShandler);
			document.addEventListener("MSFullscreenChange", FShandler);

            $(this).on('click.gofullscreen', function(e) {
                e.preventDefault();
                var target = $(this).data('fullscreeniframe');
                if (target && $(this).parent().find($(target)).length === 1) {
                    e.preventDefault();
                    currentElement = $(this).parent().find($(target));
                    var launchIntoFullscreen = function(element) {
                        if (element.requestFullscreen) {
                            element.requestFullscreen();
                        } else if (element.mozRequestFullScreen) {
                            element.mozRequestFullScreen();
                        } else if (element.webkitRequestFullscreen) {
                            element.webkitRequestFullscreen();
                        } else if (element.msRequestFullscreen) {
                            element.msRequestFullscreen();
                        }
                    };
                    launchIntoFullscreen(currentElement.get(0));
                    currentElement.parent().addClass('is-fullscreen');
                }
            });
        }
    });
})(jQuery);
