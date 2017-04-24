//	general helper functions
//	jQuery required

(function($){
	$.extend($.fn, {

		restoreFromHTMLClipboard: function(){
			if($(this).data('clipboard')){
				$(this).html($(this).data('clipboard'));
			}
			$(this).data('clipboard','');
			return this;
		},

		saveToHTMLClipboard: function(){
			$(this).data('clipboard',$(this).html());
			return this;
		}

	});
})(jQuery);