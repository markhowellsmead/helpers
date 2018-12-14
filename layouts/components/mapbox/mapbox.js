(function($, mapboxgl) {

	mapboxgl.accessToken = myMapboxData.token;

	var addMarker = function(marker, map) {
		new mapboxgl.Popup({ closeOnClick: false })
			.setLngLat(marker.geometry.coordinates)
			.setHTML('<div class="mapboxgl-popup-inner"><div class="mapboxgl-popup-title">' + marker.properties.title + '</div></div>')
			.addTo(map);
	};

	var displayMap = function(container_id, latlng, markers) {

		var map = new mapboxgl.Map({
			container: container_id,
			style: myMapboxData.style,
			center: latlng,
			zoom: 8,
			interactive: false
		});

		var coords = [];

		markers.forEach(function(marker) {
			coords.push({
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: [marker.location.lng, marker.location.lat]
				},
				properties: {
					title: marker.name
				}
			});
		});

		coords.forEach(function(marker) {
			addMarker(marker, map);
		});

		var bounds = new mapboxgl.LngLatBounds();

		coords.forEach(function(marker) {
			bounds.extend(marker.geometry.coordinates);
		});

		map.fitBounds(bounds, { padding: 40 });

	};

	var initMaps = function() {
		$('[data-mapbox]').each(function() {
			var markers = $(this).data('mapbox-markers');
			displayMap($(this).attr('id'), [46.798523, 8.231797], markers);
		});
	};

	initMaps();

})(jQuery, mapboxgl);
