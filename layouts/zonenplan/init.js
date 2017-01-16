(function($, undefined) {
    $('img[usemap]').rwdImageMaps();
})(jQuery);


(function($, undefined) {

    var zonesSelected = [];

    $('area').on('click', function(e) {
        e.preventDefault();

        var zone = $(this).data('number');
        if ($('#zone' + zone).length) {
            $('#zone' + zone)[0].classList.toggle('act'); // addClass etc doesn't work on SVG
            if ($('#zone' + zone)[0].classList.contains('act')) {
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

})(jQuery);
