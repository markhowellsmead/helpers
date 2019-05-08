/**
 * Fetch number of comments for a post via WordPress REST API
 * and add the count to all specified HTML on the elements which
 * reference the requested post ID.
 * 
 * HTML: <span data-comment-count data-comment-count-postid="12345"></span>
 * JS: $('[data-comment-count]').sh_get_comment_count();
 *
 * Use wp_localize_script in PHP to add a JavaScript object named shCommentCountAPISettings containing
 * - 'root' => esc_url_raw(rest_url())
 * - 'nonce' => wp_create_nonce('wp_rest')
 * - 'uid' => get_current_user_id()
 *
 * Author mark@sayhello.ch 2019
 * 
 */

(function($) {
	$.fn.sh_get_comment_count = function(options) {
		var settings;

		var setDefaultOptions = function() {
			return {
				postIdAttribute: 'data-comment-count-postid',
				displayCountElement: '[data-comment-count]'
			}
		};

		var getPostIds = function(elements) {
			var postIds = Array();
			for (var i = 0; i < elements.length; i++) {
				var element = $(elements[i]);
				if (element.attr(settings.postIdAttribute)) {
					if (postIds.indexOf(element.attr(settings.postIdAttribute)) < 0) {
						postIds.push(element.attr(settings.postIdAttribute));
					}
				}
			}
			return postIds;
		};

		var showCommentCount = function(response_data, post_id) {
			if (response_data && response_data.length) {
				$('[' + settings.postIdAttribute + '="' + post_id + '"]').text(response_data.length).addClass('is--filled');
			} else {
				window.console.warn('No comments for post ' + post_id);
			}
		};

		var doRestRequest = function(restRoute, method, post_id, callback) {
			$.ajax({
				url: shCommentCountAPISettings.root + restRoute,
				type: method,
				beforeSend: function(xhr) {
					xhr.setRequestHeader('X-WP-Nonce', shCommentCountAPISettings.nonce);
				},
				data: {
					'post': post_id
				},
				success: function(response_data) {
					callback(response_data, post_id);
				}
			});
		};

		var init = function(elements, options) {
			if (elements.length > 0) {
				settings = $.extend(setDefaultOptions(), options);
				$.each(getPostIds(elements), function() {
					doRestRequest('wp/v2/comments', 'GET', this, function(response_data, post_id) {
						showCommentCount(response_data, post_id);
					});
				});

			} else {
				return false;
			}
			return true;
		};

		var initialized = init(this, options);

	};

	if (shCommentCountAPISettings) {
		$('[data-comment-count]').sh_get_comment_count();
	} else {
		window.console.error('No settings object (shCommentCountAPISettings) available');
	}

}(jQuery));
