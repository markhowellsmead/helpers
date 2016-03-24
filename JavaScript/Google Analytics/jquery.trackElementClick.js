(function($, undefined){

    /**
	* Add click event handler to an element / multiple elements
	* which pings Google Analytics when the element is clicked.
	* Requires jQuery.
	* 
	* Mark Howells-Mead / permanenttourist.ch
	* @since 	24/03/16
	*/

    $.fn.extend({
		trackTabClicks: function() {
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
	jQuery(document).ready(function($) {
		$('.posts-recent a').trackTabClicks();
	});

})(jQuery);