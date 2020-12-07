import { styles } from './styles';
import { pins } from './pins';

(function () {

	if(!sht_map_data || !'google_api_key' in sht_map_data || !sht_map_data.google_api_key || !sht_translations) {
		return;
	}

	// The master function
	const initMaps = function () {
		document.querySelectorAll('[data-map]').forEach(function (mapContainer) {
			mapContainer.markers = [];
			const bounds = new google.maps.LatLngBounds();

			// Add the map to the block
			const map_data = JSON.parse(mapContainer.getAttribute('data-map-data')),
				map = new google.maps.Map(mapContainer, {
					center: { lat: 46.7985286, lng: 8.2296061 },
					zoom: 8,
					disableDefaultUI: true,
					gestureHandling: 'none',
					styles: styles
				});

			// Add the markers to the map
			map_data.forEach(pin => {
				var markerLocation = new google.maps.LatLng(pin.location.lat, pin.location.lng),
					marker = new google.maps.Marker({
						position: markerLocation,
						map: map,
						visible: true,
						clickable: false,
						icon: pins[pin.icon]
					});
				bounds.extend(markerLocation);
			});

			map.fitBounds(bounds);

		});
	};

	// Load the Google Maps script and call the init function once it's loaded
	const maps_script = document.createElement('script');
	maps_script.addEventListener('load', initMaps);
	maps_script.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=' + sht_map_data['google_api_key'] + '&map_ids=' + 'a9792680e6c1f732');
	document.head.appendChild(maps_script);

	// Add a custom event so that the map can be initialized in the Gutenberg editor
	window.addEventListener('initMaps', initMaps);

})();
