<?php

/**
 * Handle file uploads via XMLHttpRequest
 */
class qqUploadedFileXhr {
    /**
     * Save the file to the specified path
     * @return boolean TRUE on success
     */
    function save($path) {    
        $input = fopen("php://input", "r");
        $temp = tmpfile();
        $realSize = stream_copy_to_stream($input, $temp);
        fclose($input);
        
        if ($realSize != $this->getSize()){            
            return false;
        }
        
        $target = fopen($path, "w");        
        fseek($temp, 0, SEEK_SET);
        stream_copy_to_stream($temp, $target);
        fclose($target);
        
        return true;
    }
    function getName() {
        return $_GET['qqfile'];
    }
    function getSize() {
        if (isset($_SERVER["CONTENT_LENGTH"])){
            return (int)$_SERVER["CONTENT_LENGTH"];            
        } else {
            throw new Exception('Getting content length is not supported.');
        }      
    }   
}

/**
 * Handle file uploads via regular form post (uses the $_FILES array)
 */
class qqUploadedFileForm {  
    /**
     * Save the file to the specified path
     * @return boolean TRUE on success
     */
    function save($path) {
        if(!move_uploaded_file($_FILES['qqfile']['tmp_name'], $path)){
            return false;
        }
        return true;
    }
    function getName() {
        return $_FILES['qqfile']['name'];
    }
    function getSize() {
        return $_FILES['qqfile']['size'];
    }
}

class qqFileUploader {
    private $allowedExtensions = array();
    private $sizeLimit = 10485760;
    private $file;

    function __construct(array $allowedExtensions = array(), $sizeLimit = 10485760){        
        $allowedExtensions = array_map("strtolower", $allowedExtensions);
            
        $this->allowedExtensions = $allowedExtensions;        
        $this->sizeLimit = $sizeLimit;
        
        $this->checkServerSettings();       

        if (isset($_GET['qqfile'])) {
            $this->file = new qqUploadedFileXhr();
        } elseif (isset($_FILES['qqfile'])) {
            $this->file = new qqUploadedFileForm();
        } else {
            $this->file = false; 
        }
    }
    
    private function checkServerSettings(){        
        $postSize = $this->toBytes(ini_get('post_max_size'));
        $uploadSize = $this->toBytes(ini_get('upload_max_filesize'));        
        
        if ($postSize < $this->sizeLimit || $uploadSize < $this->sizeLimit){
            $size = max(1, $this->sizeLimit / 1024 / 1024) . 'M';             
            die("{'status'=>'error','result'=>'increase post_max_size and upload_max_filesize to $size'}");
        }        
    }
    
    private function toBytes($str){
        $val = trim($str);
        $last = strtolower($str[strlen($str)-1]);
        switch($last) {
            case 'g': $val *= 1024;
            case 'm': $val *= 1024;
            case 'k': $val *= 1024;        
        }
        return $val;
    }


    function handleUpload($uploadDirectory='', $replaceOldFile = FALSE){
    
	    $uploadFolders = wp_upload_dir();

    	$this->targetPath 	= $uploadFolders['basedir'].trailingslashit($uploadDirectory);					// FOLDER IN FILESYSTEM
    	$this->targetURL 	= str_replace($_SERVER['DOCUMENT_ROOT'],'',$this->targetPath);	// BROWSER URL

    	if(!is_dir($this->targetPath)){
	    	@mkdir($this->targetPath,0755);
    	}
    	
        if (!is_writable($this->targetPath)){

            return array(
            	'status' => 'error',
            	'result' => __("Server error. Upload directory isn't writable.",THEME)
            );
        }
        
        if (!$this->file){
            return array(
            	'status' => 'error',
            	'result' => "No files were uploaded."
            );
        }
        
        $size = $this->file->getSize();
        
        if ($size == 0) {
            return array(
            	'status' => 'error',
            	'result' => "File is empty"
            );
        }
        
        if ($size > $this->sizeLimit) {
            return array(
            	'status' => 'error',
            	'result' => "File is too large"
            );
        }
        
        $pathinfo = pathinfo($this->file->getName());
        //$filename = $pathinfo['filename'];
        $filename = md5(uniqid());
        $ext = $pathinfo['extension'];
        
        $this->dataFile = $filename.'.'.$ext;

        if($this->allowedExtensions && !in_array(strtolower($ext), $this->allowedExtensions)){
            $these = implode(', ', $this->allowedExtensions);
            return array(
            	'status' => 'error',
            	'result' => 'File has an invalid extension, it should be one of '. $these . '.'
            );
        }
        
        if(!$replaceOldFile){
            /// don't overwrite previous files that were uploaded
            while (file_exists($this->targetPath . $this->dataFile)) {
                $filename .= rand(10, 99);
            }
        }
        
        if ($this->file->save($this->targetPath . $this->dataFile)){
            return $this->showTableView();

        } else {
            return array(
            	'status' => 'error',
            	'result' => 'Could not save uploaded file. The upload was cancelled, or a server error was encountered.'
            );
        }
        
    }
    
    
    function normalize($s) {
    
		define('CR', "\r");          // carriage return; Mac
		define('LF', "\n");          // line feed; Unix
		define('CRLF', "\r\n");      // carriage return and line feed; Windows
		define('BR', '<br />' . LF); // HTML Break
    
	    // Normalize line endings using Global
	    // Convert all line-endings to UNIX format
	    $s = str_replace(CRLF, LF, $s);
	    $s = str_replace(CR, LF, $s);
	    // Don't allow out-of-control blank lines
	    $s = preg_replace("/\n{2,}/", LF . LF, $s);
	    return $s;
    }


    function showTableView(){
    
    	$error=false;
    
    	if(!file_exists($this->targetPath.$this->dataFile)){$error=true;}
    	if(!$this->file->getSize()){$error=true;}	    

	    if($error){
	    	return array(
	    		'status' => 'error',
	    		'result' => 'Could not read uploaded file.'
	    	);
	    }
	    
	    $addressData = file_get_contents($this->targetPath.$this->dataFile);
//	    $addressData = utf8_encode($this->normalize($addressData));	//	 convert to utf8 and set unix line breaks
	    $addressData = $this->normalize($addressData);	//	 convert to utf8 and set unix line breaks

	    $entries=explode(chr(10),$addressData);
	    
	    foreach($entries as &$row){
		    $row=explode(';',$row);
	    }
	    unset($row);
	    
	    $GLOBALS['CMS']->saveAsJson($entries,$this->targetPath.str_replace('.csv','.json',$this->dataFile));
	    
	    unlink($this->targetPath.$this->dataFile);
	    
	    $html=array();
	    
	    $i=0;
	    
	    foreach($entries as &$row){
	    	if($i==0){
	    		foreach($row as &$cell){
		    		$cell = __('column.'.$cell,THEME);// replace with translation from .mo file
	    		}
	    		unset($cell);
			    $html[]='<tr class="head"><th>'.implode('</th><th>',$row).'</th></tr>';
	    	}else{
			    $html[]='<tr class="'.($i%2?'even':'odd').'"><td>'.implode('</td><td>',$row).'</td></tr>';
			}
		    $i++;
	    }
	    unset($row);
	    
	    $html = '<table class="data">'.implode('',$html).'</table>';
	    
	    $html.= '<div id="showTableView">
	    	<p>'.__('The information in this table will be imported to the database at the next stage. If there is no email address specified for a recipient, this individual recipient will not be added.',THEME).'</p>
	    	<p>'.__('If the information in the table displayed here is incorrect, please click &quot;cancel&quot;, amend your list, and begin the upload procedure again.',THEME).'</p>
	    	<p>'.sprintf(__('Would you like to %1s or %2s?',THEME),
	    	'<a href="#" onclick="FRP_MAILING.saveAddresses(\''.str_replace('.csv','',$this->dataFile).'\')">'.__('continue',THEME).'</a>',
	    	'<a href="'.site_url().'">'.__('cancel',THEME).'</a>').'</p>
    	</div>';

	    return array('success'=>true, 'content' => $html);

    }

}
