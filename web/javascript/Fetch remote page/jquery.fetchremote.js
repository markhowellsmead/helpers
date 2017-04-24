(function($){
	$.ajaxSetup({
	    scriptCharset: "utf-8", //or "ISO-8859-1"
	    contentType: "application/json; charset=utf-8"
	});
	
	$.getJSON('http://whateverorigin.org/get?url=' + 
	    encodeURIComponent('https://www.picfair.com/mhmli') + '&callback=?',
	    function (data) {
	
	
	        //If the expected response is JSON
	        //var response = $.parseJSON(data.contents);

	        //If the expected response is text/plain
	        var $html = $('#userpagepicsholder', $(data.contents));
	        
	        $('a', $html).each(function(){
		        $(this).attr('href', 'https://www.picfair.com' + $(this).attr('href'));
	        });
	        
	        $("#viewer").html($html);

		}
	);

})(jQuery);