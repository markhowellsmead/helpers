function sticky_relocate() {
	toplimit = $(window).scrollTop()+77;
	if (toplimit > anchor_top && !$stickytop.hasClass('stuck')){
		$stickytop.addClass('stuck');
	}
	if (toplimit < anchor_top){
		$stickytop.removeClass('stuck');
	}
}

$(function() {
	//toplimit = $('.meta').outerHeight();
	$stickytop = $('.stickytop');
	$stickytop.before($('<div id="sticky-top-anchor"/>'));
	anchor_top = $stickytop.offset().top;
	$(window).scroll(sticky_relocate).resize(function(){
		toplimit = $('.meta').outerHeight();
	});
	sticky_relocate();
});