<?php

class YOUTUBE_APP {
	/*
		Additional functionality for YouTube interaction
		Some of the functions in this class are a work in progress!
		m@mhm.li 18.9.2013
	*/

	function __construct(){
	}//__construct

	////////////////////////////////////////////////////////////

	function getIDfromURL($url=''){
		/*
			get the ID number from a URL like http://www.youtube.com/watch?v=AHn5Q15kaIA
		*/
		$return = '';
		if(!$url || empty($url)){
			return $return;
		}
		$aPath = parse_url($url);
		$aParams = explode('&',$aPath['query']);
		foreach($aParams as $param){
			//	nach parameter 'v' suchen
			$thisPair=explode('=',$param);
			if(strtolower($thisPair[0])=="v"){
				$return=$thisPair[1];
				break;
			}
		}
		return $return;
	}//getIDfromURL

	////////////////////////////////////////////////////////////

}// class