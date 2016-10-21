<?php
/*
Plugin Name: Don't allow this plugin to be activated network-wide
Plugin URI: https://github.com/mhmli/helpers/blob/master/WordPress/Disallow%20plugin%20network%20activation/Plugin.php
Description: This code is not intended as a fully-formed plugin!!! This is sample code which shows how to stop this plugin from being activated at network level in a WordPress Multisite installation. This could be relevant, for example, where you need to flush rewrite rules at blog level when the plugin is activated. (That doesn't work reliably in Multisite environments.)
Author: Mark Howells-Mead
Version: 1.0
Author URI: https://permanenttourist.ch/
Text Domain: mhm_disallow_network_activation
Domain Path: /Resources/Private/Language
*/

namespace MHM\DisallowNetworkActivation;

class Plugin
{
    public function __construct()
    {
        register_activation_hook(__FILE__, array($this, 'activate'));
    }

    /**
     * Function which runs when the plugin is activated.
     */
    public function activate($networkwide)
    {
        if (is_multisite() && $networkwide) {
            $plugin_data = get_plugin_data(__FILE__);
            wp_die(sprintf(
                __('The plugin “%1$s” cannot be activated at network level. Please switch to the individual site and activate it there. %2$s', 'mhm_disallow_network_activation'),
                $plugin_data['Name'],
                '<a href="#" onclick="history.back()">'.__('Back', 'mhm_disallow_network_activation')
            ));
        }

        // Otherwise, proceed with whatever you need to do on plugin activation…
    }
}

new Plugin();
