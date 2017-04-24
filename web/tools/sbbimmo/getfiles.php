<?php
    
class frp_show_files {
    
    public function __construct(){
        $depth = 2;
        $files = $this->getFiles(new RecursiveDirectoryIterator('./files'), $depth);
        
        $this->dump($files);
    }
    
    public function dump($var,$die=false){
    	echo '<pre>' .print_r($var,1). '</pre>';
    	if($die){die();}
    }
    
    public function getFiles(RecursiveDirectoryIterator $it, $depth=0){

        if (!is_object($it)){
            return;
        }
        
        $return = array();
    
        for ($it->rewind();$it->valid();$it->next()){
    
            if ($it->isDot() || strpos($it, '.') ===0 ){
                continue;
            }
    
            if ($it->isDir() || $it->isFile()) {

                $return[] = $it->current();
    
                if ($it->hasChildren()){
                    $return[] = $this->getFiles($it->getChildren(), 1+$depth);
                }
            }
        }
        
        return $return;
    }
}

new frp_show_files();