/*
 * Usage:
	import cssLoaded from './modules/cssLoaded.js';
	$(document).on(cssLoaded.event, function () {
		// console.log('css loaded');
	});
 */

(function ($, theme) {
	$(function () {

		var elementId = 'cssLoaded';
		var eventKey = 'cssLoaded';
		exports.event = eventKey;

		$('body').append('<div id="' + elementId + '" style="display: none;"></div>');
		var $e = $('#' + elementId);

		var cssLoadedInterval = window.setInterval(function () {
			if ($e.is(":visible")) {
				$(document).trigger(eventKey);
				$e.remove();
				clearInterval(cssLoadedInterval);
			}
		}, 100);
	});
})(jQuery, ThemeJSVars);
