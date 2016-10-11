var google, marker, RichMarker, googleMapsLoaded;

(function($){

	function initializeGoogleMaps(){
    	$('.mod.googlemap .map-holder').each(function(){

			var address = $(this).data('address');

			if(address){
    			
    			var $div = $(this)[0];

                var geocoder = new google.maps.Geocoder();
                if (geocoder) {
                    geocoder.geocode({
                        'address': address
                    }, function(results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            if (status !== google.maps.GeocoderStatus.ZERO_RESULTS) {
                                
                                var centrePoint = results[0].geometry.location;

                    			var map = new google.maps.Map($div, {
                    				zoom: 15,
                    				disableDefaultUI: true,
                    				disableDoubleClickZoom: true,
                    				scrollwheel: false,
                    				draggable: false
                                });
                                
                                $(this).data('map', map);

                                map.setCenter(centrePoint);

                    			if($(this).data('markercontent') && $(this).data('markercontent').length){
                        			$(this).addClass('with-markercontent');
                        			var content = '<div class="map-marker">' + $(this).data('markercontent') + '</div>';
                        			marker = new RichMarker({
                                        map: map,
                                        position: centrePoint,
                                        draggable: false,
                                        flat: true,
                                        content: content
                        			});
                                }else{
                                    marker = new google.maps.Marker({
                                        position: centrePoint,
                                        map: map,
                                        title: address,
                                        clickable: false,
                                        draggable: false
                                    });
                                }

                            }

                        }else{
                            if(window.console && window.console.error){
                                window.console.error('Geocode unsuccessful: ' + status);
                            }
                        }

                    });

                }else{
                    if(window.console && window.console.error){
                        window.console.error('Geocoder unavailable: ' + status);
                    }
                }

            }
		});

        $(window).on('resize orientationchange', function() {
            $('.mod.googlemap .map-holder').each(function(){
                if( $(this).data('map') ){
                    var center = $(this).data('map').getCenter();
                    google.maps.event.trigger($(this).data('map'), "resize");
                    $(this).data('map').setCenter(center);
                }
            });
        });

	}

	googleMapsLoaded = function(){
		$.getScript('https://google-maps-utility-library-v3.googlecode.com/svn/trunk/richmarker/src/richmarker-compiled.js').done(initializeGoogleMaps); 
	};

	$(window).on('load.googlemaps', function(){
		$.getScript('https://maps.googleapis.com/maps/api/js?callback=googleMapsLoaded&sensor=false&language=de');
	});

})(jQuery);