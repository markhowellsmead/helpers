(function($){
	$.extend($.fn, {
		anchorAnimate: function(settings) {
			return this.each(function(){
				$(this).bind('click', function(e){
					var destination = $( $(this).attr('href') );
					if(destination.length){
						e.preventDefault();
						var destination = destination.offset().top - $('nav').outerHeight()+2;
						$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination}, 300);
					}
				});
			});
		}
	})

	//////////////////////////////////////////////////

	var debounce = function(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};

	//////////////////////////////////////////////////

	var checkCurrentMenuItem = function() {

	    var currentItem = null,
	    	scrollPosition = $(window).scrollTop() + $('nav').outerHeight();

	    $('.row').each(function(){
		    if(scrollPosition >= $(this).offset().top){
	        	currentItem = $(this).attr('id');
			}
		});

	    $('nav a').removeClass('act');
	    $('nav a[href="#' + currentItem+'"]').addClass('act');

	}

	//////////////////////////////////////////////////

	var scrollHandler = debounce(function() {
		checkCurrentMenuItem();
	}, 50).bind(this);

	$(window).bind('scroll', scrollHandler);

	//////////////////////////////////////////////////

	$('nav a').anchorAnimate();

})(jQuery);
