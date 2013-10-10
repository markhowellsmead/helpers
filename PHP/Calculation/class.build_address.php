<?php

class AddressHelpers {

	var $viewData = array();

	function build_address($data=array(),$field_keys=array(),$glue=''){
		/*
			Build a HTML string for displaying an address on the website
			Conditionals built-in to determine line-breaks etc.
			
			WARNING: requires function force_attributes to be defined!
			
			Usage: 
			
			$address_data = array(
				'street' => $veranstaltungArray['strasse'],
				'postcode' => $veranstaltungArray['plz'],
				'town' => $veranstaltungArray['ort']
			);
			
			$field_keys = array(
				'street' 	=> 'strasse',
				'postcode' 	=> 'plz',
				'town' 		=> 'ort'
			);
			
			$AddressHelpers = new AddressHelpers();
			
			echo '<p>'.$AddressHelpers->build_address($address_data, $field_keys, '<br>').'</p>';
			
			Once the function has been called, the compiled address (with e.g. empty 
			values omitted) is available from then on as $myaddress->viewData['address']
			
		*/

		$field_keys = $this->force_attributes(array(
			'company' 	=> 'veranstalter',
			'person' 	=> 'person',
			'street' 	=> 'street',
			'postcode' 	=> 'postcode',
			'town' 		=> 'town',
			'email' 	=> 'email',
			'url' 		=> 'url',
			'telephone' => 'telephone',
			'fax' 		=> 'fax',
			'mobile' 	=> 'mobile'
		), $field_keys);
	
		$this->viewData['address'] = array();
		
		if(!empty($data[$field_keys['company']])){$this->viewData['address'][] = '<strong>' .$data[$field_keys['company']]. '</strong>';}
		if(!empty($data[$field_keys['person']])){$this->viewData['address'][] = $data[$field_keys['person']];}
	
		if(!empty($data[$field_keys['street']])){$this->viewData['address'][] = $data[$field_keys['street']];}
	
		if(!empty($data[$field_keys['postcode']]) && !empty($data[$field_keys['town']])){
			$this->viewData['address'][] = $data[$field_keys['postcode']] . (!empty($data[$field_keys['postcode']]) && !empty($data[$field_keys['town']]) ? ' ' : '') . $data[$field_keys['town']];
		}
	
		if(!empty($data[$field_keys['telephone']])){$this->viewData['address'][] = $this->pi_getLL('tx_frpveranstaltungen_veranstaltung.telefon').': '.$data[$field_keys['telephone']];}
		if(!empty($data[$field_keys['fax']])){$this->viewData['address'][] = $this->pi_getLL('tx_frpveranstaltungen_veranstaltung.fax').': '.$data[$field_keys['fax']];}
		if(!empty($data[$field_keys['mobile']])){$this->viewData['address'][] = $this->pi_getLL('tx_frpveranstaltungen_veranstaltung.mobile').': '.$data[$field_keys['mobile']];}
	
		if($this->valid_email_address($data[$field_keys['email']])){
			$mailArray = $this->cObj->getMailTo($data[$field_keys['email']],$data[$field_keys['email']]);
			$this->viewData['address'][] = '<a href="'.$mailArray[0].'">'.$mailArray[1].'</a>';
		}
		
		if($this->valid_url($data[$field_keys['url']])){
			$displayURL = parse_url($data[$field_keys['url']]);
			$this->viewData['address'][] = '<a href="' .$data[$field_keys['url']]. '">' .$displayURL['host']. '</a>';
		}
		
		return implode($glue,$this->viewData['address']);
	
	}//build_address

}