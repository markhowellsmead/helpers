<?php

class EmailEncode {

	/*
		Encode an email address for HTML output
		
		Usage
		
		$email = 'my@email.ch';
		$encoder = new EmailEncode();
		echo $encoder->encode($email); // shows &#109;&#121;&#64;&#101;&#109;&#97;&#105;&#108;&#46;&#99;&#104;
		
	*/
	
	private function encode(&$email){
		$output='';
		for($i=0;$i<strlen($email);$i++){$output.='&#'.ord($email[$i]).';';}
		return $output;
	}//encode
	
}//Emailencoder

