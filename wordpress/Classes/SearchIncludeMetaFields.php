<?php
/**
 * Extend WordPress search to include custom fields.
 *
 * https://adambalee.com/search-wordpress-by-custom-fields-without-a-plugin/
 * This copy since 15.9.2016
 */

namespace MHM\WordPress;

class SearchIncludeMetaFields
{
    public function __construct()
    {
        add_filter('posts_join', array($this, 'searchJoin'));
        add_filter('posts_where', array($this, 'searchWhere'));
        add_filter('posts_distinct', array($this, 'searchDistinct'));
    }

    /**
     * Join posts and postmeta tables.
     *
     * http://codex.wordpress.org/Plugin_API/Filter_Reference/posts_join
     */
    public function searchJoin($join)
    {
        global $wpdb;

        if (is_search() && strpos($join, ' LEFT JOIN '.$wpdb->postmeta.' ON '.$wpdb->posts.'.ID = '.$wpdb->postmeta.'.post_id ') === false) {
            $join .= ' LEFT JOIN '.$wpdb->postmeta.' ON '.$wpdb->posts.'.ID = '.$wpdb->postmeta.'.post_id ';
        }

        return $join;
    }

    /**
     * Modify the search query with posts_where.
     *
     * http://codex.wordpress.org/Plugin_API/Filter_Reference/posts_where
     */
    public function searchWhere($where)
    {
        global $pagenow, $wpdb;

        if (is_search()) {
            $where = preg_replace(
                "/\(\s*".$wpdb->posts.".post_title\s+LIKE\s*(\'[^\']+\')\s*\)/",
                '('.$wpdb->posts.'.post_title LIKE $1) OR ('.$wpdb->postmeta.'.meta_value LIKE $1)',
                $where
            );
        }

        return $where;
    }

    /**
     * Prevent duplicates.
     *
     * http://codex.wordpress.org/Plugin_API/Filter_Reference/posts_distinct
     */
    public function searchDistinct($where)
    {
        global $wpdb;

        if (is_search()) {
            return 'DISTINCT';
        }

        return $where;
    }
}

new SearchIncludeMetaFields();
