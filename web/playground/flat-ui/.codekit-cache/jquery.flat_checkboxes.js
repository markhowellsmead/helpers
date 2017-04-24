/*

usage: $('.wp-contactform7 input[name="red"]').flat_checkboxes();

*/

(function($){

	$.extend($.fn, {
	
		flat_checkboxes: function(){

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