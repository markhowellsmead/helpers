<?php
/*
Plugin Name: My Great Plugin
Plugin URI: https://github.com/mhmli/helpers/tree/master/WordPress/Plugins
Description: Example code for a WordPress plugin using PHP namespaces.
Author: Mark Howells-Mead
Version: 1.0
Author URI: https://www.permanenttourist.ch/
Text Domain: MyGreatPlugin
Domain Path: /Resources/Private/Language
*/

namespace MHM\MyGreatPlugin;

class MyGreatPlugin
{
    public $key = '';

    public function dump($var, $mode = 0)
    {
        if ((bool) $this->logging) {
            if ($mode === 0 || $mode === 1) {
                echo '<pre>'.print_r($var, 1).'</pre>';
            }
            if ($mode === 1) {
                die();
            } elseif ($mode === 2) {
                file_put_contents('/var/tmp/'.$this->key.'.log', $var.chr(10), FILE_APPEND);
            }
        }
    }

    public function __construct()
    {

        // Set some class variable values
        $this->key = basename(__DIR__);

        // Register hooks for when the plugin is activated or deactivated
        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));

        // Load options page if we're in wp-admin
        if (is_admin()) {
            require_once 'OptionsPage.php';
            new OptionsPage();
        }
    }

    public function activate()
    {
    }

    public function deactivate()
    {
    }
}

new MyGreatPlugin();
