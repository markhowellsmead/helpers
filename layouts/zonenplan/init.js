(function($, undefined) {
    $('img[usemap]').rwdImageMaps();
})(jQuery);


(function($, undefined) {

    var zonesSelected = [];
    var zoomStep = 0;

    $('svg').on('click', 'polygon, circle, polyline', function(e) {
        e.preventDefault();

        var zone = $(this).attr('id');

        if(zone){
            this.classList.toggle('act'); // addClass etc doesn't work on SVG
            if (this.classList.contains('act')) {
                zonesSelected['zone'+zone] = zone;
            } else {
                delete zonesSelected['zone'+zone];
            }
            if (Object.keys(zonesSelected).length > 0) {
                $('.svg-holder').addClass('act');
            } else {
                $('.svg-holder').removeClass('act');
            }
        }
    });

    $('.zoomies').on('click', '.button', function(){
    	if($(this).hasClass('button-in')){
			$('.svg-holder').addClass('zoomedin');
    	}else if($(this).hasClass('button-out')){
            $('.svg-holder').removeClass('zoomedin');
    	}
    });

})(jQuery);
