<?php

$random = rand(1, 1000000);

$markers = [];

foreach ($component['entries'] as $entry) {
	$markers[] = [
		'name' => $entry['name'],
		'location' => [
			'lat' => $entry['location']['lat'],
			'lng' => $entry['location']['lng']
		]
	];
}

$markers = htmlentities(json_encode($markers));

?>

<div class="mc__section mc--<?=$component['acf_fc_layout']?>">
	<div id="mapbox<?=$random?>" style="height: 400px; background: silver" data-mapbox data-mapbox-markers="<?=$markers?>"></div>
</div>
