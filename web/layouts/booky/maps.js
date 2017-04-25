(function($) {

    var style_desaturated = [{
        "elementType": "geometry.fill",
        "stylers": [{
            "saturation": -85
        }]
    }, {
        "elementType": "geometry.stroke",
        "stylers": [{
            "saturation": -85
        }]
    }, {
        "elementType": "labels",
        "stylers": [{
            "visibility": "simplified"
        }]
    }, {
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "poi.business",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "poi.park",
        "elementType": "labels.text",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [{
            "visibility": "off"
        }]
    }];

    $(document).ready(function() {

        $('[data-map="detail"]').each(function() {

            var marker_lat = $(this).data('lat');
            var marker_lon = $(this).data('lon');

            if (marker_lat !== false && marker_lon !== false) {

                var position = new google.maps.LatLng(marker_lat, marker_lon);

                var map = new google.maps.Map(document.getElementById($(this).attr('id')), {
                    zoom: 10,
                    center: position,
                    disableDefaultUI: true,
                    scrollwheel: false,
                    navigationControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    draggable: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    styles: style_desaturated
                });

                var marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
      					scale: 14,
      					strokeColor: '#444',
      					strokeWeight: 2,
      					fillColor: 'rgb(124, 150, 0)',
      					fillOpacity: .4
                    }
                });

                // Set a data attribute, not a data object, so that CSS can see it
                $('.overlay', $(this).parent()).addClass('tooltip').attr('data-overlaytext', $(this).data('overlaytext')).attr('title', null);
            }
        });
    });

})(jQuery);