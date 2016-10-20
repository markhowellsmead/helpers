<?php
/*
Plugin Name: Handle file requests
Plugin URI: https://permanenttourist.ch/2016/10/handling-file-requests-with-the-wordpress-rewrite-api/
Description: Example plugin code which uses the WordPress Rewrite API to handle file requests. This excample grabs any requests which start with “download” and end in “.jpg”.
Text Domain: mhm_handle_filerequest
Author: Makr Howells-Mead
Version: 0.0.1
Author URI: https://permanenttourist.ch/
*/

namespace MHM\HandleFilerequest;

class Plugin
{
    /**
     * This function is run when instantiating the plugin.
     */
    public function __construct()
    {
        register_deactivation_hook(array($this, 'flushRewriteRules'));
        register_activation_hook(array($this, 'flushRewriteRules'));
        add_action('after_switch_theme', array($this, 'flushRewriteRules'));

        add_action('init', array($this, 'rewriteRules'));
        add_filter('query_vars', array($this, 'customQueryVariables'));
        add_action('parse_request', array($this, 'handleDownload'), 10, 1);
    }

    public function flushRewriteRules()
    {
        global $wp_rewrite;
        $wp_rewrite->flush_rules();
    }

    /**
     * Add the rewrite rule. Syntax is the same as it would be in .htaccess.
     * The target must be index.php so that WordPress sees it as a WordPress
     * rule, and not a custom rule, which is applied later in the parsing process.
     */
    public function rewriteRules()
    {
        add_rewrite_rule('^(download|view)/((.*?).(jpe?g|gif|png|rar|zip|pdf|tar|gz))', 'index.php?mhm_handle_filerequest[mode]=$matches[1]&mhm_handle_filerequest[file]=$matches[2]', 'top');
    }

    /**
     * Allows the query parameters applied in this plugin to be accessed by WordPress.
     *
     * @param array $query_variables Original query variables array
     *
     * @return array Potentially modified query variables array
     */
    public function customQueryVariables($query_variables)
    {
        $query_variables[] = 'mhm_handle_filerequest';

        return $query_variables;
    }

    /**
     * Your function to do whatever you need to with the request.
     *
     * @param object $query WordPress query object
     */
    public function handleDownload($query)
    {
        var_dump($query->query_vars['mhm_handle_filerequest']);
        exit;
    }
}

new Plugin();
