<?php

if (empty($args['data']['locations'] ?? [])) {
	if ($args['is_context_edit']) {
		?>
		<section class="wp-block-sht-location-map c-card c-editormessage c-editormessage--error">
			<?php
			if (!empty($args['data']['sht_title'] ?? '')) {?>
				<h2 class="wp-block-sht-location-map__title c-card__title"><?php echo $args['data']['sht_title'];?></h2>
				<?php
			}
			?>
			<p><?php _ex('Mit der aktuellen Konfiguration dieses Blocks sind keine Standorte für die Ausgabe vorhanden.', 'Editor message', 'sha');?></p>
		</section>
		<?php
	}
	return;
}

$align = '';

if (!empty($args['align'] ?? '')) {
	$align = ' align'.$args['align'];
}

$map_locations = [];

foreach ($args['data']['locations'] as $location) {
	if (!empty($location['location']) && !empty($location['location']['lat'] ?? '') && !empty($location['location']['lng'] ?? '')) {
		$map_locations[] = [
			'ID' => $location->ID,
			'title' => $location->post_title,
			'link' => !empty($location->meta['website']) ? $location->meta['website'] : '',
			'location' => ['lat' => $location['location']['lat'], 'lng' => $location['location']['lng']],
			'icon' => $location['icon']
		];
	}
}


?>

<section class="wp-block-sht-location-map<?php echo $align;?>" data-map-block>
	<div class="wp-block-sht-location-map__mapwrapper">
		<?php if (!empty($map_locations)) {?>
			<div class="wp-block-sht-location-map__map" data-map data-map-data="<?php echo htmlspecialchars(json_encode($map_locations), ENT_QUOTES, 'UTF-8');?>"></div>
		<?php } ?>
	</div>
</section>
<script>
(function(){
	var e = document.createEvent('HTMLEvents');
	e.initEvent('initMaps', false, true);
	window.dispatchEvent(e);
})();
</script>
