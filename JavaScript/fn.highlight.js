/*
*	make element's background colour flash quickly to new colour and back again
*	NB: if element has no background colour already, it will fade to white after being highlighted
*
*	e.g. $('div.confirmation').warningFlash();
*	e.g. $('div.confirmation').warningFlash('#f00');
*
*	requires jQuery
*	mhm 28.11.2012
*/

(function($){
	$.extend($.fn, {
		warningFlash: function(flashColour){
			var flashColor = flashColour || '#ffffcc';
			var startingColor = $(this).css('backgroundColor');
			$(this).animate({'backgroundColor': flashColor},'fast').animate({'backgroundColor': startingColor},'fast');
			return this;
		};
	});
})(jQuery);