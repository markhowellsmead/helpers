(function($, undefined){

	/**
	* Add click event handler to an element / multiple elements
	* which pings Google Analytics when the element is clicked.
	* Requires jQuery.
	* Google reference: https://developers.google.com/analytics/devguides/collection/analyticsjs/events
	* 
	* Mark Howells-Mead / permanenttourist.ch
	* Since 24/03/16
	*/

	$.fn.extend({
		ga_trackElementClick: function() {
			$(this).each(function(){
				$(this).on('click.GA', function(){
					try {
						ga && ga('send', {
							hitType: 'event',
							eventCategory: 'Posts recent',
							eventAction: 'clicked',
							eventLabel: $(this).text()
						});
					}catch(e){}
				});
			});
			return this;
		}
	});

	// example usage
	$('.posts-recent a').ga_trackElementClick();

})(jQuery);