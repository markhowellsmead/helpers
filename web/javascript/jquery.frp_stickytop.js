(function($){
	
	$.fn.extend({
		frp_stickytop : function(){
			var s = $(this);
			var pos = s.position();
			$(window).scroll(function() {
				var windowpos = $(window).scrollTop();
				if (windowpos >= pos.top) {
					s.addClass('stuck');
					$(this).trigger('frp-sticky-stuck');
				} else {
					s.removeClass('stuck'); 
					$(this).trigger('frp-sticky-unstuck');
				}
			});
			return this;
		}
	});

})(jQuery);