(function($){
	$.extend($.fn, {
		anchorAnimate: function(settings) {
			return this.each(function(){
				$(this).bind('click', function(e){
					var destination = $( $(this).attr('href') );
					if(destination.length){
						e.preventDefault();
						var destination = destination.offset().top;
						$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination}, 300);
					}
				});
			});
		}
	})
})(jQuery);