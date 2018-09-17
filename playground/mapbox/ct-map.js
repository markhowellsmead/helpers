"use strict";

(function($) {
    var $map = $('#mapbox');

    var registerControlPosition = function(map, positionName) {
        if (map._controlPositions[positionName]) {
            return;
        }
        var positionContainer = document.createElement('div');
        positionContainer.className = `mapboxgl-ctrl-${positionName}`;
        map._controlContainer.appendChild(positionContainer);
        map._controlPositions[positionName] = positionContainer;
    }

    $(document).ready(function() {
        if ($map.length) {
            var longitude = $map.data('longitude');
            var latitude = $map.data('latitude');

            if (longitude && latitude) {

                mapboxgl.accessToken = 'pk.eyJ1IjoiY3ViZXRlY2giLCJhIjoiNXNzUHdfbyJ9.tm-Kh0sz67FPbXgoKofkwQ';

                var map = new mapboxgl.Map({
                    container: 'mapbox', // DIV id
                    style: 'mapbox://styles/permanenttourist/cjhu8o09d0k4y2qmgahp7hmmp',
                    scrollZoom: false,
                    zoom: 7,
                    showZoom: true,
                    center: [longitude, latitude]
                });

                registerControlPosition(map, 'top-center');

                // Add standard zoom and orientation controls
                // https://www.mapbox.com/mapbox-gl-js/example/navigation/
                map.addControl(new mapboxgl.NavigationControl());

                // Add geolocate control to the map.
                // https://www.mapbox.com/mapbox-gl-js/example/locate-user/
                var geolocateControl = new mapboxgl.GeolocateControl({
                    positionOptions: {
                        enableHighAccuracy: true
                    },
                    trackUserLocation: true
                });
                map.addControl(geolocateControl, 'top-center');
            }

            // Add location trigger to custom button
            $('[data-find-me]', $map.closest('[data-map-app]')).on('click.findme', function(e) {
                this.blur();
                geolocateControl.trigger();
            });
        }
    });


})(jQuery);
