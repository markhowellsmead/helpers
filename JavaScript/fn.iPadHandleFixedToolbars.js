/*
	Add special class name to fixed toolbar elements
	when focusing on form fields on iPad and iPhone.
	Required as	they "stick" otherwise and hide other 
	content. Requires addition of CSS rules for class 
	.toolbar.notfixed

	usage: $('input,textarea,select').iPadHandleFixedToolbars();
	
	mhm 20.3.2013

*/
(function($){$.extend($.fn, {
	iPadHandleFixedToolbars: function() {
		if(navigator.userAgent.match(/iPad|iPhone/i) != null){
			$(this).focus(function(){
			    $('.toolbar').addClass('notfixed');
			}).blur(function(){
			    $('.toolbar').removeClass('notfixed');
			});
		}
		return this;
	}
})})(jQuery);