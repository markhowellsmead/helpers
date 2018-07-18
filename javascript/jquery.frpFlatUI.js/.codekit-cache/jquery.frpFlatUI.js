(function($){

	$.extend($.fn, {
	
		flat_checkboxes: function(){

			//usage: $('input[type="checkbox"]').flat_checkboxes();

			wrapper = $('<label class="checkbox-flat"/>');
			wrapper.append('<span>');
			this.each(function(){
				my_wrapper = wrapper.insertAfter($(this));
				cb = $(this).detach();
				my_wrapper.append(cb).addClass(cb.attr('name'));
				
			});
			$('label.checkbox-flat input').click(function(){
				$(this).parent().toggleClass('act');
			});
				
				
			return this;
		}
	
	});

})(jQuery);