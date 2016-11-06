<?php
class Frp_xliff {

	var $filepath='',
		$rootfolder = '',
		$key = '',
		$csv=array(),
		$array_merged_columns=array(),
		$extension_key = '',
		$message = '',
		$status = 200;

	public function __construct($key=''){
		$this->key = $key;
		$this->rootfolder = dirname(__FILE__).'/';
		$this->filepath = $this->rootfolder.$this->key;
		$this->generated = $this->rootfolder.'__generated/';
	}//__construct

	/////////////////////////////////////////////
	
	function dump($var,$die=false){
		echo '<pre>' .print_r($var,1). '</pre>';
		if($die){die();}
	}//dump

	/////////////////////////////////////////////
	
	public function getXliffData($fileRef) {
		$translationArray = array();
		if (file_exists($fileRef)) {
			$fileData = file_get_contents($fileRef);
			$simpleXml = new SimpleXMLElement($fileData);

			// get children
			$translationUnits = $simpleXml->file->body->children();

			$translationArray = array();

			if ($translationUnits) {
				foreach ($translationUnits as $transUnit) { /** @var $transUnit SimpleXMLElement  */
					$key =  $transUnit->attributes()->id;

					$sourceValue = $transUnit->source;
					$translationArray[(string)$key]['source'] = (string)$sourceValue;

					$targetValue = (string)$transUnit->target;
					if ($targetValue == "") {
						$targetValue = $sourceValue;
					}
					$translationArray[(string)$key]['target'] = (string)$targetValue;
				}
			}
		}
		return $translationArray;
	}

	/////////////////////////////////////////////
	
	public function mergeFiles(){
		
		$this->extension_key = $_GET['key'];
		
		$this->array_merged_columns = array('key', 'source');

		$this->mergeSpecificFiles('locallang.xlf');
		$this->mergeSpecificFiles('locallang_fields.xlf');
		$this->mergeSpecificFiles('locallang_be.xlf');
		$this->mergeSpecificFiles('locallang_mod1.xlf');
		
		$this->sendResponse();

	}//mergeFiles
	
	
	/////////////////////////////////////////////
	
	private function mergeSpecificFiles($sourcefilename){

		if(!file_exists($this->filepath.'/'.$sourcefilename)){
			$this->message.='<p>Datei ' .$sourcefilename. ' nicht gefunden.</p>';
		}else{

			if( strtoupper(mb_detect_encoding(file_get_contents($this->filepath.'/'.$sourcefilename)))!=='UTF-8' ){

				$this->message .= '<p><em>Die Datei ' .$sourcefilename. ' existiert. Sie ist aber nicht UTF8-kodiert.</em></p>';

			}else{
	
		
				// get default translation file
				$array_default = $this->getXliffData($this->filepath.'/'.$sourcefilename);
				$array_merged = $array_default;
				
				// pull in german translations if available
					$array_de = $this->getXliffData($this->filepath.'/de.'.$sourcefilename);
					if(!empty($array_de)){
						$this->array_merged_columns[] = 'de';
						foreach($array_default as $key => $data){
							if(array_key_exists($key, $array_de)){
								$array_merged[$key]['de'] = $array_de[$key]['target'];
							}else{
								$array_merged[$key]['de'] = $array_default[$key]['source'];
							}
						}
					}
		
				// pull in french translations if available
					$array_fr = $this->getXliffData($this->filepath.'/fr.'.$sourcefilename);
					if(!empty($array_fr)){
						$this->array_merged_columns[] = 'fr';
						foreach($array_merged as $key => $data){
							if(array_key_exists($key, $array_fr)){
								$array_merged[$key]['fr'] = $array_fr[$key]['target'];
							}else{
								$array_merged[$key]['fr'] = $array_default[$key]['source'];
							}
						}
					}
		
				// pull in french translations if available
					$array_it = $this->getXliffData($this->filepath.'/it.'.$sourcefilename);
					if(!empty($array_it)){
						$this->array_merged_columns[] = 'it';
						foreach($array_merged as $key => $data){
							if(array_key_exists($key, $array_it)){
								$array_merged[$key]['it'] = $array_it[$key]['target'];
							}else{
								$array_merged[$key]['it'] = $array_default[$key]['source'];
							}
						}
					}
		
				foreach($array_merged as $key => $data){
					$rowArray = array();
					foreach($data as $colKey => $col){
						if($colKey!=='target'){
							$rowArray[] = $col;
						}
					};
					$this->csv[] = $key.chr(9).implode(chr(9), $rowArray);
					unset($rowArray);
				}
				array_unshift($this->csv, implode(chr(9), $this->array_merged_columns));
		
				$this->saveCSV($sourcefilename);
			}
		}
	}

	/////////////////////////////////////////////
	
	public function splitFiles(){
		// take the CSV file in the target folder
		// and split it out into the individual translation files
		// the CSV file must be UTF8-encoded with Unix line-endings
		// and columns must be separated by tabs
		
		$this->extension_key = $_GET['key'];

		$this->makeSingleXMLFiles('locallang.csv');
		$this->makeSingleXMLFiles('locallang_db.csv');
		$this->makeSingleXMLFiles('locallang_be.csv');

		$this->sendResponse();

	}//splitFiles

	//////////////////////////////////////////////////

	private function makeSingleXMLFiles($sourcefilename){
		if(file_exists($this->filepath.'/'.$sourcefilename)){
			if($translations = file_get_contents($this->filepath.'/'.$sourcefilename)){
				
				if( strtoupper(mb_detect_encoding($translations))!=='UTF-8' ){

					$this->message .= '<p><em>Die Datei ' .$sourcefilename. ' existiert. Sie ist aber nicht UTF8-kodiert.</em></p>';

				}else{
					
					$translation_array = explode(chr(10),trim($translations).chr(10)); // make sure the end of the file has one last line break!
		
					// store the array keys for reference
					$language_keys = explode(chr(9), $translation_array[0]);
					
					// remove "key" and "source"
					array_shift($language_keys);array_shift($language_keys);
						
					if(!count($language_keys)){
						$this->message = '<p>Es gibt keine Übersetzungen in dieser CSV-Datei.</p>';
						$this->sendResponse();
					}
					
					// make array multidimensional
					foreach($translation_array as &$row){
						$row = explode(chr(9),$row);
					}
	
					// generate the new source translation file
					$this->makeSourceXLIFF($translation_array, $sourcefilename);
		
					$number_of_translation_files = count($language_keys);
	
					for ($i = 0; $i < $number_of_translation_files; $i++) {
						$this->makeTranslationXLIFF($translation_array, $i, $language_keys[$i], $sourcefilename);
					}
				}
			}
		}else{
			$this->message .= '<p>Datei ' .$sourcefilename. ' nicht gefunden.</p>';
		}
	}

	//////////////////////////////////////////////////

	private function makeTranslationXLIFF($array, $colnr, $language, $sourcefilename){
		
		// remove header row
		array_shift($array);

		$translations_alt = array();
		foreach($array as $row){
			$translations_alt[] = array($row[0], $row[1], $row[2+$colnr]);
		}

		$this->make_xml($translations_alt, $language, $sourcefilename);
	}

	//////////////////////////////////////////////////

	private function makeSourceXLIFF($translations, $sourcefilename){

		// remove header row
		array_shift($translations);

		// remove all columns except 'key' and 'source'
		$nr_columns = count($translations[0])-2;
		foreach($translations as &$row){
			for ($i = 0; $i < $nr_columns; $i++) {
				array_pop($row);
			}
			unset($i);
		}
		
		// generate and store source xliff file
		$this->make_xml($translations, '', $sourcefilename);

	}

	/////////////////////////////////////////////

	public function make_xml($array, $target_language='', $sourcefilename=''){

		$filename_pre = str_replace('.csv', '.xlf', $sourcefilename);
		
		$filename = $target_language=='' || $target_language=='source' ? $filename_pre : $target_language .'.'. $filename_pre;

		if($filename!==''){
	
			// creating object of SimpleXMLElement
			$this->xml = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><xliff version="1.0"/>');
			
			$filenode = $this->xml->addChild('file');
			$filenode->addAttribute('source-language','en');
			if($target_language!==''){
				$filenode->addAttribute('target-language',$target_language);
			}
			$filenode->addAttribute('datatype','plaintext');
			$filenode->addAttribute('original','messages');
			$filenode->addAttribute('date',date('Y-m-d\TH:i:s\Z'));
			$filenode->addAttribute('product-name',$this->key);
	
			$header = $filenode->addChild('header');
			$header->addChild('generator', 'frp_xliff');

			$body = $filenode->addChild('body');
	
			// function call to convert array to xml
			$this->array_to_xml($array, $body);
			
			$foldername = $this->generated.$this->key. '/';
			if(!is_dir($foldername)){
				mkdir($foldername, 0755, true);
			}

			$dom = new DOMDocument('1.0');
			$dom->preserveWhiteSpace = false;
			$dom->formatOutput = true;
			$dom->loadXML(trim($this->xml->asXML()));

			$dom->save($foldername.$filename);

			$this->message.='<p>Datei ' .str_replace($_SERVER['DOCUMENT_ROOT'], '', $foldername).$filename. ' erfolgreich gespeichert.</p>';
	
			//saving generated xml file
			//$this->xml->asPrettyXML($foldername.'/'.$filename);
		}			
		
	}//make_xml

	/////////////////////////////////////////////
	
	function array_to_xml($array, &$parentNode){

	    foreach($array as $entry) {
	    
	    	if($entry[0] && $entry[0]!==''){
	
				$subnode = $parentNode->addChild('trans-unit');
				$subnode->addAttribute('id',$entry[0]);
	
				$sourceNode = $subnode->addChild('source', $entry[1]);
	
				/*if ($sourceNode !== NULL) {
					$node = dom_import_simplexml($sourceNode);
					$no   = $node->ownerDocument;
					$node->appendChild($no->createCDATASection($entry[1]));
				}*/
	
				if(count($entry)==3){
					// the translation is available. add a child node for it.
					$subnode->addAttribute('approved','yes');
					$targetNode = $subnode->addChild('target', $entry[2]);
					/*if ($targetNode !== NULL) {
						$node = dom_import_simplexml($targetNode);
						$no   = $node->ownerDocument;
						$node->appendChild($no->createCDATASection($entry[2]));
					}*/
				}
			}
	    }
	}//array_to_xml

	/////////////////////////////////////////////

	public function saveCSV($sourcefilename){
		
		$foldername = $this->generated;
		$filename = $sourcefilename.'.'.$this->key.'.'.date('Ymd').'.' .date('His'). '.csv';

		if(!is_dir($foldername)){
			mkdir($foldername, 0755, true);
		}
		
		$filecontents = chr(255).chr(254).mb_convert_encoding(implode(chr(10),$this->csv), 'UTF-16LE', 'UTF-8');

		file_put_contents($foldername.$filename,$filecontents);

		unset($this->csv);
		
		$this->message.='<p>Datei ' .str_replace($_SERVER['DOCUMENT_ROOT'], '', $foldername).$filename. ' erfolgreich gespeichert.</p>';

	}//saveCSV

	/////////////////////////////////////////////
	
	public function showFolderList(){
	
		$folders = glob(dirname(__FILE__).'/*' , GLOB_ONLYDIR);
		
		$out = array();
		
		foreach($folders as $folder){
			$folder = str_replace($this->rootfolder,'',$folder);
			if(strpos($folder, '__')!==0){
				$out[] = '<tr><td>' .$folder. '</td><td><a href="?key=' .$folder. '&amp;mode=merge">CSV generieren</a></td><td><a href="?key=' .$folder. '&amp;mode=split">XLIFFs generieren</a></td><!--td><a href="?key=' .$folder. '&amp;mode=makesingle">Generate single XLIFF file</a></td--></tr>';
			}
		}

		echo('<h2>Verfügbare Extensions</h2>');
		
		if(count($out)){
			echo ('<table class="keys">' .implode('',$out). '</table>');
		}else{
			echo ('<p>Es gibt keine Extension-Verzeichnisse unter <code>/xliff</code>!</p>');
		}
		
		$this->appendJavaScript();
		
	}//showFolderList

	/////////////////////////////////////////////

	private function appendJavaScript(){
		
		echo '<script src="xliff.min.js"></script>';
		
		
	}//appendJavaScript

	/////////////////////////////////////////////
	
	private function sendResponse(){
		header('Content-Type: application/json');
		die(json_encode(array(
			'status' => $this->status,
			'message' => $this->message,
			'extension_key' => $this->extension_key
		)));
	}
	
}