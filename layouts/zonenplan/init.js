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
    		if(zoomStep < 5){
    			$('.svg-holder').removeClass('step0 step1 step2 step3 step4 step5');
    			$('.svg-holder').addClass('step' + (++zoomStep));
    		}
    	}else if($(this).hasClass('button-out')){
    		if(zoomStep >0 ){
    			$('.svg-holder').removeClass('step0 step1 step2 step3 step4 step5');
    			$('.svg-holder').addClass('step' + (--zoomStep));
    		}
    	}
    });

})(jQuery);
