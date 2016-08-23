(function($){
	$(document).on('ready', function(){
		$('.mod.toggle-expose').on('click', '.toggle-expose', function(){
			$(this).closest('.button-holder').addClass('is-hidden');
			var $images = $('[data-style]', $(this).closest('.mod.toggle-expose'));
			$images.each(function(){
				var $img = $(this);
				$img.attr('style', $img.attr('data-style'));
				$img.removeAttr('data-style');
				$img.removeClass('is-hidden');
			});
		});
	});
})(jQuery);
