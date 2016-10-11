(function($){

    if(!$.Frp){
        $.Frp = new Object();
    };
    
	
	$.Frp.Opinions = {

		update: function(message){
			$(this).html(message);
		}
	};

})(jQuery);