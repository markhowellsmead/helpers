<?php
/*
PHP class to parse GPS data. The goal of this functionality is to convert
EXIF GPS location data to decimal format, so that we can use the values to
produce, for example, a Google Map.

Mark Howells-Mead | permanenttourist.ch | Since August 2016
*/
	
namespace MHowellsMead\EXIF;

class ParseGPS {
	
	public function __construct($data){
		
		/*
			$data structure:

			Array(	
				[latitude_ref] => N
				[latitude] => Array
				(
					[0] => 57/1
					[1] => 31/1
					[2] => 21334/521
				)
	
				[longitude_ref] => W
				[longitude] => Array
				(
					[0] => 4/1
					[1] => 16/1
					[2] => 27387/1352
				)
			)
		*/
		
		$this->data = $data;
		$this->mapsApiKey = '';
		$this->mapsize = '500x500';
		$this->parse();
	}
	
	public function parse(){

		if(isset($this->data['latitude']) && isset($this->data['longitude'])){

			$GPS = array('lat', 'lon');

			$GPS['lat']['deg'] = explode('/', $this->data['latitude'][0]);
			$GPS['lat']['deg'] = $GPS['lat']['deg'][0] / $GPS['lat']['deg'][1];
			$GPS['lat']['min'] = explode('/', $this->data['latitude'][1]);
			$GPS['lat']['min'] = $GPS['lat']['min'][0] / $GPS['lat']['min'][1];
			$GPS['lat']['sec'] = explode('/', $this->data['latitude'][2]);
			$GPS['lat']['sec'] = floatval($GPS['lat']['sec'][0]) / floatval($GPS['lat']['sec'][1]);
			
			$this->data['latitude_decimal'] = self::DMStoDEC($GPS['lat']['deg'], $GPS['lat']['min'], $GPS['lat']['sec']);

			if($this->data['latitude_ref'] == 'S'){
				$this->data['latitude_decimal'] = 0 - $this->data['latitude_decimal'];
			}

			$GPS['lon']['deg'] = explode('/', $this->data['longitude'][0]);
			$GPS['lon']['deg'] = $GPS['lon']['deg'][0] / $GPS['lon']['deg'][1];
			$GPS['lon']['min'] = explode('/', $this->data['longitude'][1]);
			$GPS['lon']['min'] = $GPS['lon']['min'][0] / $GPS['lon']['min'][1];
			$GPS['lon']['sec'] = explode('/', $this->data['longitude'][2]);
			$GPS['lon']['sec'] = floatval($GPS['lon']['sec'][0]) / floatval($GPS['lon']['sec'][1]);

			$this->data['longitude_decimal'] = self::DMStoDEC($GPS['lon']['deg'],$GPS['lon']['min'],$GPS['lon']['sec']);
			if($this->data['longitude_ref'] == 'W'):
				$this->data['longitude_decimal'] = 0 - $this->data['longitude_decimal'];
			endif;

			$this->data['googlemaps_decimal'] = $this->data['latitude_decimal'].','.$this->data['longitude_decimal'];
			$this->data['googlemaps_image'] = '<img src="//maps.googleapis.com/maps/api/staticmap?center='.$this->data['calculated_decimal'].'&zoom=12&amp;size=' .$this->mapsize. '&amp;maptype=hybrid&amp;markers=color:red|'.$this->data['calculated_decimal'].'&amp;sensor=false&amp;key=' .$this->mapsApiKey. '" alt="Google Map" />';
		}
	}
	
	public function getData(){
		return $this->data;
	}
	
	public function setKey($key){
		$this->mapsApiKey = (string)$key;
	}

	public function setMapSize($size){
		$this->mapsize = (string)$size;
	}

	private static function DMStoDEC($deg,$min,$sec){
		/**
		* Converts DMS (degrees/minutes/seconds)
		* to decimal format longitude/latitude
		*/

		return $deg+((($min*60)+($sec))/3600);
	}
	
	private static function DECtoDMS($dec){
		
		/**
		 * Converts decimal longitude / latitude to DMS
		 * ( Degrees / minutes / seconds )
		 * This is the piece of code which may appear to
		 * be inefficient, but to avoid issues with floating
		 * point math we extract the integer part and the float
		 * part by using a string function.
		 */

		$vars = explode('.', $dec);
		$deg = $vars[0];
		$tempma = '0.'.$vars[1];
	
		$tempma = $tempma * 3600;
		$min = floor($tempma / 60);
		$sec = $tempma - ($min*60);
	
		return array(
			'deg' => $deg,
			'min' => $min,
			'sec' => $sec
		);
	}
	
}