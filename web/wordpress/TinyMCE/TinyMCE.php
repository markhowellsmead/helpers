<?php

/**
 * Adds a custom button to the WordPress rich text editor bar using TinyMCE.
 */

namespace MHM\MyGreatPlugin;

class TinyMCE
{
    public function __construct()
    {
        add_action('admin_enqueue_scripts', array($this, 'buttonCSS'));
        add_filter('mce_external_plugins', array($this, 'addButtons'));
        add_filter('mce_buttons', array($this, 'registerButtons'));

        foreach (array('post.php', 'post-new.php') as $hook) {
            add_action("admin_head-$hook", array($this, 'localize'));
        }
    }

    public function addButtons($plugin_array)
    {
        $plugin_array['frp_auction'] = plugins_url('Resources/Public/JavaScript/mce_buttons.js', dirname(__FILE__));

        return $plugin_array;
    }

    public function registerButtons($buttons)
    {
        array_push($buttons, 'frp_auction');

        return $buttons;
    }

    public function localize()
    {
        $translation_array = array(
            'button_label' => __('Insert shortcode for an auction', 'frp_auction'),
        );
        echo '<script>var frp_auction_translations = {';
        $translations = array();
        foreach ($translation_array as $key => $value) {
            $translations[] = '"'.$key.'": "'.$value.'"';
        }
        echo implode(',', $translations);
        echo '}</script>';
    }

    public function buttonCSS($hook)
    {
        if (!in_array($hook, array('post.php', 'post-new.php'))) {
            return;
        }
        wp_enqueue_style('frp_auction-admin-css', plugins_url('Resources/Public/Css/mce_buttons.css', dirname(__FILE__)));
    }
}
