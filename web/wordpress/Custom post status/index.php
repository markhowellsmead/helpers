<?php
add_action('init', function () {
    register_post_status('archive', array(
        'label'                     => _x('Archive', 'post'),
        'public'                    => true,
        'show_in_admin_all_list'    => false,
        'show_in_admin_status_list' => true,
        'label_count'               => _n_noop(
            'Archive <span class="count">(%s)</span>',
            'Archive <span class="count">(%s)</span>'
        ),
    ));
});

add_action('admin_footer-post.php', function () {
    global $post;
    $complete = '';
    $label    = '';
    if ($post->post_type == 'post') {
        if ($post->post_status == 'archive') {
            $complete = ' selected="selected"';
            $label    = '<span id="post-status-display"> Archived</span>';
        }
        echo '
			<script>
			jQuery(document).ready(function($){
			$("select#post_status").append("<option value="archive" ' . $complete . '>Archive</option>");
			$(".misc-pub-section label").append("' . $label . '");
			});
			</script>
		';
    }
});

add_filter('display_post_states', function ($states) {
    global $post;
    $arg = get_query_var('post_status');
    if ($arg != 'archive') {
        if ($post->post_status == 'archive') {
            return array('Archive');
        }
    }
    return $states;
});
