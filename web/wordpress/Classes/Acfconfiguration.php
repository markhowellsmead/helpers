<?php

/*
 * Class for implementation in a class-based WordPress plugin
 * Allows ACF to read data from a JSON file in the plugin (subpath Configuration/AcfJson)
 * and to write subsequent amendments back to the same file.
 *
 * mhm 17.6.2017
 *
 * Initial creation:
 * First create the field group in the backend. Then export the configuration as a JSON file.
 * Once the JSON file is created and saved in the correct folder, delete the field group from 
 * the standard ACF interface. Then activate the plugin and use the “synchronization” function
 * to load the configuration from the plugin. From then on, any changes made to the field group 
 * will be saved back to the JSON file in the plugin.
*/

class Acfconfiguration {

    private $acf_json_path = '';

    public function __construct(){

        add_action( 'plugins_loaded', array( $this, 'init' ) );

        // Add custom ACF JSON paths
        add_filter('acf/settings/load_json', array($this, 'loadAcfJson'), 10, 1);
        add_filter('acf/settings/save_json', array($this, 'saveAcfJson'), 10, 1);
    }

    public function init()
    {
        $this->acf_json_path = plugin_dir_path( __FILE__ ) . 'Configuration/AcfJson';
    }

    /**
     * Load all ACF JSON file contents from the specified folder.
     */
    private function getAcfConfig(){
        $files = scandir($this->acf_json_path);
        foreach($files as $file){
            if(is_file(trailingslashit($this->acf_json_path) . $file)){
                $json_contents = @json_decode(file_get_contents(trailingslashit($this->acf_json_path) . $file));
                if( $json_contents && isset( $json_contents->key ) ){
                    $this->acf_config[ $json_contents->key ] = $json_contents;
                    $this->acf_config[ $json_contents->key ]->json_file_path = trailingslashit($this->acf_json_path) . $file;
                }
            }
        }
    }

    /**
     * If the JSON config file belongs to this plugin, save the file to the appropriate folder.
     * @param  string $path Pre-registered acf-json folder path
     * @return string       Potentially amended acf-json folder path
     */
    public function saveAcfJson( $path ) {
        if(is_admin() && isset($_POST['post_name'])){
            $this->getAcfConfig();
            foreach( $this->acf_config as $key => $values){
                if($key === esc_attr($_POST['post_name'])){
                    return dirname($values->json_file_path);
                }
            }
        }
        return $path;
    }

    /**
     * Load JSON files from the plugin subfolder Configuration/AcfJson
     * @param  array $paths The pre-existing array of usable file paths
     * @return array        The amended array of usable file paths
     */
    public function loadAcfJson($paths){
        $paths[] = $this->acf_json_path;
        return $paths;
    }

}
