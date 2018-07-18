/**
 * Parse link URLs and set target to _blank if
 * it's an external link.
 * i.e. not the same website, not javascript, not fancybox etc.
 *
 * @version 2018-01-09
 */

(function($) {

	$.extend($.fn, {
		get_hostname: function() {
			var url = $(this).attr('href');
			if (url) {
				url = url.toString();
				if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0 && url.indexOf('//') !== 0) {
					return false;
				} else {
					return url.replace('http://', '').replace('https://', '').replace('//', '').split(/[/?#]/)[0] + ''; // plus nothing to force string
				}
			}
		},
		maybeSetLinkTarget: function() {
			$(this).each(function() {
				var $link = $(this);
				var hostname = $link.get_hostname() + '';
				if (
					hostname &&
					(hostname.indexOf(window.location.hostname) < 0) &&
					(hostname.indexOf(window.location.hostname.replace('www.', '')) < 0) &&
					(hostname !== '') &&
					(hostname !== null) &&
					((hostname.hash === '') || (hostname.hash === null) || (hostname.hash === undefined)) &&
					(hostname.indexOf('javascript') !== 0) &&
					(hostname.indexOf('mailto:') < 0) &&
					(!$link.hasClass('anchor')) &&
					(!$link.hasClass('fancybox')) &&
					(!$link.hasClass('toggle')) &&
					this.target === ''
				) {
					this.target = '_blank';
					if (this.className.indexOf('tooltip') < 0) {
						this.title = this.hostname;
					}
				}
			});
			return this;
		}
	});

})(jQuery);
