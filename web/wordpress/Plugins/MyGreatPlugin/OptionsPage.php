<?php
/**
 * Add a plugin options page to the WordPress backend.
 * Uses PHP namespaces, so compatible with PHP 5.3+ only!
 *
 * Use this file in your plugin and include it using the following code,
 * placed in the __construct function of the main class. Make sure that
 * the PHP namespace in this file is the same as the PHP namespace in the
 * main class file!
 *
 * if (is_admin()) {
 *   require_once 'OptionsPage.php';
 *   new OptionsPage();
 * }
 *
 * Author: Mark Howells-Mead, permanenttourist.ch, August 2016
 * License: https://creativecommons.org/licenses/by/4.0/
 */

namespace MHM\MyGreatPlugin;

class OptionsPage
{
    public $key = '';

    public function __construct()
    {
        $this->key = basename(__DIR__);
        add_action('admin_menu', array($this, 'createAdminMenu'));
    }

    public function createAdminMenu()
    {
        // Top-level menu. Uses the dashicons font to generate the icon “dashicons-images-alt”
        // add_menu_page('Custom Menu Page Title', 'Custom Menu Page', 'manage_options', __FILE__, array($this, 'settingsPage'), 'dashicons-images-alt', 90);

        // Secondary-level menu; a sub-page of Settings in this example.
        add_submenu_page('options-general.php', _x('Custom menu page', 'Label for page title', $this->key), _x('Custom menu page', 'Label for menu entry', $this->key), 'manage_options', 'custommenupage', array($this, 'settingsPage'));

        //call register settings function
        add_action('admin_init', array($this, 'registerPluginSettings'));
    }

    public function registerPluginSettings()
    {
        //register our settings
        register_setting($this->key, $this->key);
    }

    public function settingsPage()
    {
        echo '<div class="wrap">
            <h1>'._x('Custom menu page', 'Label for page title', $this->key).'</h1>
            <form method="post" action="options.php">
            ';

        settings_fields($this->key);
        $options = get_option($this->key);

        echo '<table class="form-table">
        <tr>
        <th scope="row">
            <tr valign="top">
                <th scope="row">'.__('Email address for contact requests', $this->key).'</th>
                <td>
                    <input id="contact_email" type="email" name="'.$this->key.'[contact_email]" value="'.esc_attr($options['contact_email']).'" class="regular-text ltr" />
                    <p class="description" id="contact_email-description">'.__('This email address will be used for functions which allow the website visitor to contact the owner of the website.', $this->key).'</p>
                </td>
            </tr>
        </table>';

        submit_button();

        echo '</form>
        </div>';
    }
}
