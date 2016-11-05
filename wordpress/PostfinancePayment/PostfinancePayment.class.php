<?php

class PostfinancePayment {
	/*
		helper functions for postfinance pay solution
		specifically for use as part of a wordpress plugin
		mhm 26.9.2012
		
		n.b. that the PDF provided by PostFinance contains inaccurate config information
		and that the technical solution here has been tested and approved within multiple !frappant projects

		translations currently to be added to the .po and .mo files in the theme, not in the plugin.
		
		### return parameters from postfinance ###
		the following parameters are returned from postfinance when the payment is approved.
		(sample values only)

		• orderID		= 2091727584
		• currency		= CHF
		• amount		= 15
		• PM			= PAYPAL
		• ACCEPTANCE	= test123
		• STATUS		= 9
		• CARDNO		= testpa-XXXXXXXX-om
		• ED			= 
		• CN			= Smith++John
		• TRXDATE		= 09%2F26%2F12
		• PAYID			= 16671934
		• NCERROR		= 0
		• BRAND			= PAYPAL
		• IPCTY			= CH
		• CCCTY			= 99
		• ECI			= 7
		• CVCCheck		= NO
		• AAVCheck		= NO
		• VC			= 
		• AAVZIP		= NO
		• AAVADDRESS	= NO
		• IP			= 212.103.68.210
		• SHASIGN		= 52BB42F5CDF57D384BFF855DB1295B6A091E5977
		
		### example of implementation ###
		require_once 'PostfinancePayment/PostfinancePayment.class.php';
		$shop = new PostfinancePayment('test');

		$orderData = array(
			'orderID' 			=> '1234',
			'amount' 			=> '15.00',
			'currency' 			=> 'CHF',
			'language' 			=> 'de_DE',
			'TITLE' 			=> 'Voice24', // Voice24
			'address_first_name'=> 'Mark',
			'address_last_name'	=> 'Mustermann',
			'address_email' 	=> 'sos@frappant.ch',
			'address_address' 	=> 'Birkenweg 61',
			'address_postcode' 	=> '3014',
			'address_town' 		=> 'Bern',
		);
		$shop_link = '<a href="'.$shop->paymentURL($orderData).'">[SHOP]</a>';

	*/

	function __construct($shop_mode='test'){
		// @param $shop_mode 'test' or 'prod'

		//	set values via wordpress plugin options page in wordpress backend
		$this->sha_string 	= get_option('sha_key');	
		$this->shop_name 	= get_option('shop_name');

		$this->shop_mode	= $shop_mode;
		$this->shop_url		= 'http://' .$_SERVER['HTTP_HOST']. '/';

	}//__construct
	
	
	function buildParameters($orderData){
		$parameters = array(
			'PSPID'		=> urlencode($this->shop_name),
			'ORDERID' 	=> $orderData['orderID'],		// 12345
			'AMOUNT' 	=> $orderData['amount']*100,	// price x 100 so that . is removed
			'CURRENCY' 	=> $orderData['currency'], 		// CHF
			'LANGUAGE' 	=> $orderData['language'],		// 'de_DE'
			'TITLE' 	=> $orderData['projectName'], 	// Voice24
			'CN' 		=> $orderData['address_first_name'].' '.$orderData['address_last_name'],
			'EMAIL' 	=> urlencode($orderData['address_email']),
		);
		
		ksort($parameters); // sort array alphabetically by key

		$thestring=$parameters['ORDERID'].$parameters['AMOUNT'].$parameters['CURRENCY'].$parameters['PSPID'].$this->sha_string;
		$parameters['SHASIGN'] = strtoupper(sha1($thestring));
		return $parameters;
	}//buildParameters


	function paymentURL($orderData){
		// for e.g. redirect or a visible hyperlink
		$parameters = $this->buildParameters($orderData);
		return 'https://e-payment.postfinance.ch/ncol/'.$this->shop_mode.'/orderstandard.asp?' . http_build_query($parameters,'','&amp;');
	}//paymentURL
	
	
	function paymentForm($orderData){
		// 	for a visible form to be posted manually
		//	all fields except the submit button are hidden!
		$parameters = $this->buildParameters($orderData);
		$action = 'https://e-payment.postfinance.ch/ncol/'.$this->shop_mode.'/orderstandard.asp';
		$form = '<form method="post" action="'.$action.'">';
		foreach($parameters as $key=>$value){
			$form .= '<input type="hidden" name="'.$key.'" value="'.$value.'">';	
		}
		$form .= '<input type="submit" value="'.__('Proceed to PostFinance Payment System',THEME).'"></form>';
		return $form;
	}//paymentForm

}