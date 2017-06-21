<?php

namespace AUTHOR_NAMESPACE\PLUGIN_NAMESPACE;

/*
 * Class for implementation in a class-based WordPress plugin
 * Allows ACF to read data from a JSON file in the plugin (subpath Configuration/AcfJson)
 * and to write subsequent amendments back to the same file.
 *
 * mhm 17.6.2017
 *
 * Initial creation:
 * Create the field group manually in the backend. 
 * Export the configuration as a JSON file. (File name e.g. acf-export-2017-06-21.json)
 * Delete the field group from the standard ACF interface. 
 * Activate the plugin and use the ACF “synchronization” function to load the configuration from the plugin.
 * Save the ACF field group once, so that a group file (e.g. group_594a54b48db20.json) is created in the plugin folder.
 * Delete the original acf-export-2017-06-21.json file.
 *
 * Saving changes back to the group file
 * Subsequent changes to the field group in the ACF admin tool will be saved back to the correct group file automatically.
 *
 * Usage:
 * Put this file in the subfolder Classes in your plugin.
 * Replace the namespace at the top of this file with your own plugin's namespace.
 * Add the following code to the plugin's run() function.
 * Replace AUTHOR_NAMESPACE\PLUGIN_NAMESPACE in the following code with the appropriate namespace for your plugin.

@require_once __DIR__ . '/Acfconfiguration.php';
if(class_exists('AUTHOR_NAMESPACE\PLUGIN_NAMESPACE\Acfconfiguration')){
    $acfconfiguration = new Acfconfiguration();
    $acfconfiguration->run();
}

*/

class Acfconfiguration {

    private $acf_json_path = '';
    private $acf_config = array();

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
        $files = @scandir($this->acf_json_path);
        if($files){
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
