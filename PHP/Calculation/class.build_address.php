<?php

class AddressHelpers {

	var $viewData = array();

	function build_address($data=array(),$keys=array(),$glue=''){
		/*
			Build a HTML string for displaying an address on the website
			Conditionals built-in to determine line-breaks etc.
			
			WARNING: requires functions force_attributes, valid_email_address, valid_url and encode_email to be defined!
			
			Usage: 
			
			$address_data = array(
				'street' => $veranstaltungArray['strasse'],
				'postcode' => $veranstaltungArray['plz'],
				'town' => $veranstaltungArray['ort']
			);
			
			$keys = array(
				'street' 	=> 'strasse',
				'postcode' 	=> 'plz',
				'town' 		=> 'ort'
			);
			
			$AddressHelpers = new AddressHelpers();
			
			echo '<p>'.$AddressHelpers->build_address($address_data, $keys, '<br>').'</p>';
			
			Once the function has been called, the compiled address (with e.g. empty 
			values omitted) is available from then on as $myaddress->viewData['address']
			
		*/

		$keys = $this->force_attributes(array(
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
		), $keys);
	
		$this->viewData['address'] = array();
		
		if(!empty($data[$keys['company']])){$this->viewData['address'][] = '<strong>' .$data[$keys['company']]. '</strong>';}
		if(!empty($data[$keys['person']])){$this->viewData['address'][] = $data[$keys['person']];}
	
		if(!empty($data[$keys['street']])){$this->viewData['address'][] = $data[$keys['street']];}
	
		if(!empty($data[$keys['postcode']]) && !empty($data[$keys['town']])){
			$this->viewData['address'][] = $data[$keys['postcode']] . (!empty($data[$keys['postcode']]) && !empty($data[$keys['town']]) ? ' ' : '') . $data[$keys['town']];
		}
	
		if(!empty($data[$keys['telephone']])){$this->viewData['address'][] = 'Tel.: '.$data[$keys['telephone']];}
		if(!empty($data[$keys['fax']])){$this->viewData['address'][] = 'Fax: '.$data[$keys['fax']];}
		if(!empty($data[$keys['mobile']])){$this->viewData['address'][] = 'Mobile: '.$data[$keys['mobile']];}
	
		if($this->valid_email_address($data[$keys['email']])){
			$this->encode_email($data[$keys['email']]);
			$this->viewData['address'][] = '<a href="mailto:'.$data[$keys['email']].'">'.$data[$keys['email']].'</a>';
		}
		
		if($this->valid_url($data[$keys['url']])){
			$displayURL = parse_url($data[$keys['url']]);
			$this->viewData['address'][] = '<a href="' .$data[$keys['url']]. '">' .$displayURL['host']. '</a>';
		}
		
		return implode($glue,$this->viewData['address']);
	
	}//build_address

}