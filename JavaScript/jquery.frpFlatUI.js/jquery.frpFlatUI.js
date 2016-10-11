(function($){

	$.extend($.fn, {
	
		flat_checkboxes: function(){

			//usage: $('input[type="checkbox"]').flat_checkboxes();

			this.each(function(){
				var wrapper = $('<label class="checkbox-flat"><span/></label>');
				var my_wrapper = wrapper.insertAfter($(this));
				var cb = $(this).detach();
				my_wrapper.append(cb).addClass(cb.attr('name'));
				
			});
			$('label.checkbox-flat input').click(function(){
				$(this).parent().toggleClass('act');
			});
				
				
			return this;
		}
	
	});

})(jQuery);