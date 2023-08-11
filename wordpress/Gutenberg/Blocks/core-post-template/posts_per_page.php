<?php

/**
 * Modify the query on the core post template block.
 * https://wordpress.stackexchange.com/questions/405588/using-pre-get-posts-on-a-specific-core-query-block/405881
 * See also https://core.trac.wordpress.org/ticket/54850 raised as part of the discussion
 * mark[at]sayhello.ch May 2022
 */

add_filter('block_type_metadata_settings', function ($settings, $metadata) {
  if ($metadata['name'] !== 'core/post-template') {
    return $settings;
  }
  if ($settings['render_callback'] !== 'render_block_core_post_template') {
    return $settings;
  }
  $settings['render_callback'] = 'wpse_render_block_core_post_template';
  return $settings;
}, 10, 2);

function wpse_render_block_core_post_template($attributes, $content, $block)
{
  $callback = fn ($query) => $query->set('posts_per_page', 2);

  add_action('pre_get_posts', $callback, 999);
  $output = render_block_core_post_template($attributes, $content, $block);
  remove_action('pre_get_posts', $callback, 999);

  return $output;
}
