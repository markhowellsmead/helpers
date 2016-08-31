<?php
/**
 * Class containing generic WordPress post handling functions: create, update, save etc.
 * Should be instantiated from other scripts or classes.
 *
 * Author: Mark Howells-Mead, permanenttourist.ch, August 2016
 * License: https://creativecommons.org/licenses/by/4.0/
 */

namespace MHM\WordPress;

class PostHandler
{
    public $key = '';

    public function dump($var, $die = false)
    {
        echo '<pre>'.print_r($var, 1).'</pre>';
        if ($die) {
            die();
        }
    }

    public function __construct()
    {
        $this->key = basename(__DIR__);
    }

    public function createPost($data = array())
    {
        $data = array_merge(array(
            'post_type' => $this->custom_post_type,
            'post_author' => get_current_user_id(),
            'post_name' => '',
            'post_title' => '',
            'post_tags' => array(),
            'post_status' => 'draft',
            'post_meta' => array(),
        ), $data);

        if (!$data['post_author']) {
            error_log(__METHOD__.': no valid author');

            return;
        }

        // Make sure a new post is always created: remove any ID passed in.
        // (This function is creating posts, not updating them.)
        if (isset($data['ID'])) {
            unset($data['ID']);
        }

        // Store the new post in the database. If all is well, we'll get the new $post_id back.
        $post_id = wp_insert_post($data);

        if (is_wp_error($post_id)) {
            error_log(__METHOD__.': unable to insert a new post');

            return;
        }

        // Adding post meta happens immediately. Values are stored in a separate DB table so we don't need ro re-save the post.
        if (!empty($data['post_meta'])) {
            foreach ($data['post_meta'] as $meta_key => $meta_value) {
                if (!empty($meta_key)) {
                    if ($meta_value !== false && $meta_value !== null) {
                        add_post_meta($post_id, $meta_key, $meta_value, true);
                    }
                }
            }
        }

        return $post_id;
    }
}
