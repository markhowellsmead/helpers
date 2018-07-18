(function($){
	$(window).load(function(){
		$('.row.teasers').masonry({
			columnWidth:	250,
			itemSelector: 	'.fce'
		});
	});
})(jQuery);