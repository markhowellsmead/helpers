(function($, undefined) {
    $('img[usemap]').rwdImageMaps();
})(jQuery);


(function($, undefined) {

    var zonesSelected = [];

    // $('svg').on('click', 'polygon, circle, polyline', function(e) {
    //     e.preventDefault();

    //     var zone = $(this).attr('id');

    //     if(zone){
    //         this.classList.toggle('act'); // addClass etc doesn't work on SVG
    //         if (this.classList.contains('act')) {
    //             zonesSelected['zone'+zone] = zone;
    //         } else {
    //             delete zonesSelected['zone'+zone];
    //         }
    //         if (Object.keys(zonesSelected).length > 0) {
    //             $('.svg-holder').addClass('act');
    //         } else {
    //             $('.svg-holder').removeClass('act');
    //         }
    //     }
    // });

    $('.zoomies').on('click', '.button', function(){
    	if($(this).hasClass('button-in')){
			$('.svg-holder').addClass('zoomedin');
    	}else if($(this).hasClass('button-out')){
            $('.svg-holder').removeClass('zoomedin');
    	}
    });

    $(document).ready(function() {

        var $svg = $('#zonenplan-svg'),
            $container = $('.tx-frpzonemaplibero');

        $svg.panzoom({
            $zoomIn: $container.find(".zoom-in"),
            $zoomOut: $container.find(".zoom-out"),
            $zoomRange: $container.find(".zoom-range"),
            startTransform: 'scale(1.5)',
            increment: 0.1,
            minScale: 1,
            contain: 'invert'
        });

    });

})(jQuery);
