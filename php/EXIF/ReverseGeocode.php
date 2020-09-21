<?php

if (has_post_thumbnail()) {
	$thumbnail_meta = wp_get_attachment_metadata(get_post_thumbnail_id());
	$thumbnail_gps = sht_theme()->Package->Media->gpsFromMeta($thumbnail_meta['image_meta'] ?? null);

	if (!empty($thumbnail_gps['GPSCalculatedDecimal'] ?? false)) {
		$base_url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' .$thumbnail_gps['GPSCalculatedDecimal']. '&key=' . get_field('sht-maps-api-key', 'options');
		$json = json_decode(file_get_contents($base_url)) or die("URL not loading");
		dump($json);
	}
}
