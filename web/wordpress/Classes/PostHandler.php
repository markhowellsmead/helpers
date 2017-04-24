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

    public function arrayMapR($func, $arr)
    {
        $newArr = array();

        foreach ($arr as $key => $value) {
            $newArr[ $key ] = (is_array($value) ? $this->arrayMapR($func, $value) : (is_array($func) ? call_user_func_array($func, $value) : $func($value)));
        }

        return $newArr;
    }

    public function sanitizeData(&$data)
    {
        $data = $this->arrayMapR('strip_tags', $data);
    }

    public function createPost($data = array())
    {
        $data = array_merge(array(
            'post_type' => 'post',
            'post_author' => get_current_user_id(),
            'post_name' => '',
            'post_title' => '',
            'post_tags' => array(),
            'post_status' => 'draft',
            'post_meta' => array(),
        ), $data);

        $this->sanitizeData($data);

        if (!$data['post_author']) {
            error_log(__METHOD__.': no valid author');

            return;
        }

        // Make sure a new post is always created: remove any ID passed in.
        // (This function is creating posts, not updating them.)
        if (isset($data['ID'])) {
            unset($data['ID']);
        }

        // Remove post meta into its own variable, so that wp_insert_post
        // doesn't try to save it directly to the post entry. We'll save it separately in a minute.
        $post_meta = $data['post_meta'];
        unset($data['post_meta']);

        // Store the new post in the database. If all is well, we'll get the new $post_id back.
        $post_id = wp_insert_post($data);

        if (is_wp_error($post_id)) {
            error_log(__METHOD__.': unable to insert a new post');

            return;
        }

        $this->updatePostMeta($post_meta, $post_id);

        return $post_id;
    }

    public function updatePost($data = array())
    {
        $post_meta = null;

        if (!isset($data['ID'])) {
            error_log(__METHOD__.': ID not specified');

            return;
        }

        $this->sanitizeData($data);

        // Sanitize data array
        $data['ID'] = intval($data['ID']);

        // Remove post meta into its own variable, so that wp_insert_post
        // doesn't try to save it directly to the post entry. We'll save it separately in a minute.

        if (isset($data['post_meta'])) {
            $post_meta = $data['post_meta'];
            unset($data['post_meta']);
        }

        $post_id = wp_update_post($data);

        if (is_wp_error($post_id)) {
            error_log(__METHOD__.': unable to insert a new post');

            return;
        }

        $this->updatePostMeta($post_meta, $post_id);

        return $post_id;
    }

    public function updatePostMeta($post_meta, $post_id)
    {
        // Adding post meta happens immediately. Values are stored in a separate
        // DB table so we don't need ro re-save the post.
        if (!empty($post_meta)) {
            foreach ($post_meta as $meta_key => $meta_value) {
                if (!empty($meta_key)) {
                    if ($meta_value !== false && $meta_value !== null) {
                        $current_value = get_post_meta($post_id, $meta_key, true);
                        if (empty($current_value)) {
                            add_post_meta($post_id, $meta_key, $meta_value, true);
                        } else {
                            update_post_meta($post_id, $meta_key, $meta_value, $current_value);
                        }
                    }
                }
            }
        }
    }
}
