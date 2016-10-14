<?php
/**
 * Example code to show how the addition of a WordPress-internal rewrite rule works.
 * Mark Howells-Mead | permanent.tourist@gmail.com | Since 14.10.2016.
 */

/*
 * 1. Add a custom rewrite rule using htaccess syntax. Using index.php at the start
 * ensures that the rule is recognized as a Wordpress rule. Rules which start with
 * anything else are classed as non-Wordpress rules, and parsed after WordPress rules.
 */
function customRewrite()
{
    add_rewrite_rule('^specialUrlPrefix/(.+)/?$', 'index.php?specialVariable=$matches[1]', 'top');
}
add_action('init', 'customRewrite');

/**
 * 2. Add “myVar” as an allowed query variable.
 *
 * @param array $public_query_vars The array of regular query variables to be extended.
 *
 * @return array The modified array of accepted query variables
 */
function query_vars($public_query_vars)
{
    $public_query_vars[] = 'specialVariable';

    return $public_query_vars;
}
add_filter('query_vars', 'query_vars');

/**
 * 3. Handle the request.
 *
 * @param object $wp_query The WordPress query object containing everything you need.
 */
function shortUrlRedirect($wp_query)
{
    if (isset($wp_query->query_vars['specialVariable'])) {
        // output file here
        die('Do your worst!');
    }
}
add_action('parse_query', 'shortUrlRedirect', 1);
