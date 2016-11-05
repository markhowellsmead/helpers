<?php

class Winter {

	/////////////////////////////////////////////
	
	function __construct(&$object){
		$object->seasonMessage = '<p>Be careful, the roads might be slippery because it\'s winter.</p>';
	}

	/////////////////////////////////////////////
	
	function fitSnowChains(&$object){
		$this->object = $object;
		$this->object->canrace = false;
		if($this->object->canFitChains){
			echo '<p>Snow chains (' .$this->object->chainWeight. ') fitted to ' .$this->object->wheels. ' wheels of your '.$this->object->make.'.</p>';
		}else{
			echo '<p>You cannot fit snow chains to your '.$this->object->make.'!</p>';
		}
	}	
	
	/////////////////////////////////////////////
	
	function fitLightChains(&$object){
		$this->object = $object;
		$this->object->chainWeight = 'light';
		$this->object->fitSnowChains();
	}	
	
	/////////////////////////////////////////////
	
	function fitHeavyChains(&$object){
		$this->object = $object;
		$this->object->chainWeight = 'heavy';
		$this->object->fitSnowChains();
	}	
	
	/////////////////////////////////////////////
	
}