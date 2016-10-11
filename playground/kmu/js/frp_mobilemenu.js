(function($){$.extend($.fn, {

	mobilemenu: function() {
		return this.each(function(){
			var link = this,menuTop=null;
			if($(link).data){
				$(link).data('targetElm',$($(this)[0].hash));
				if($(window).width()<768){$(link).data('targetElm').hide();}
				else{$(link).data('targetElm').show();}
				$(window).resize(function(){
					if($(window).width()>=768){
						$(link).removeClass('open').data('targetElm').show();
					}else{
						$(link).data('targetElm').hide();
					}
				});
		
				$(link).click(function(e){
					e.preventDefault();
					this.blur();
					menu=$(this).data('targetElm');
					$(this).toggleClass('open');
					menu.data('top',menu.offset().top).slideToggle('fast');
					return false;
				})
			}
		})
	}
	
})})(jQuery);

$('a.mobilemenu').mobilemenu();	