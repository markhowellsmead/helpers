/**
 * Sometimes, there is an incontrovertable need for the height of various
 * elements in a layout to be displayed at matching heights; even when they
 * are side-by-side, but in a completely separate HTML structure.
 *
 * This script equalizes the height of such elements using JavaScript. Sorry
 * to all the CSS Flexbox fans out there, but this is, at the time of writing,
 * not possible to solve using pure CSS.
 *
 * Usage:
 * $('[data-equalizeheights=".these-elements"]').equalizeHeight();
 * <div class="these-elements" data-equalizeheights=".these-elements">…</div>
 * <div class="these-elements" data-equalizeheights=".these-elements">…</div>
 * <div class="these-elements" data-equalizeheights=".these-elements">…</div>
 *
 * Long live CSS Grids, coming in 2017! :)
 *
 * Since 2009 (?). Added to my Helpers repository in 2016.
 * https://github.com/markhowellsmead/helpers/
 */

(function($, undefined) {
    $.fn.extend({
        equalizeHeight: function(turnoff) {
            if(this.data('equalizeheights') && $(this.data('equalizeheights')).length){
                var elms = $(this.data('equalizeheights'));
                if (turnoff) {
                    elms.each(function() {
                        $(this).height('auto');
                    });
                }
                else {
                    var biggest_height = 0;
                    elms.each(function() {
                        $(this).height('auto');
                        if ($(this).height() > biggest_height) {
                            biggest_height = $(this).height();
                        }
                    });
                    if (biggest_height) {
                        $(this).height(biggest_height).addClass('equalized');
                    }
                }
            }
            return this;
        }
    });
})(jQuery);
