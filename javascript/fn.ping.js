/*
	1. Use e.g. as click handler on a link
		the href will be called via Ajax GET
		and the appropriate function will be called
		according to the response code

		$('a.pingLink').ping_onclick();

	2. call the url ping.php every 2 seconds

		$.fn.poll_server('ping.php',2000);

		optional: pass callback function as 3rd parameter

		$.fn.poll_server('ping.php',2000, function(){
			console.log(data);
		});


	mhm 03/2013

*/

(function($){$.extend($.fn, {
	ping_onclick: function(clickEvent){
		clickEvent.preventDefault();
		$.ajax({
			url: $(this).attr('href'),
			statusCode: {
				304: function(){
					alert('status code 304');
				},
				200: function(){
					alert('status code 200');
				}
			}
		});
		return this;
	},//ping_onclick

	poll_server: function (urlIn,repeatEvery,callbackfn) {
		if(!repeatEvery){repeatEvery=10000;} // default is 10 sec
	    $.ajax({
	        url : urlIn,
	        timeout: 10000, // max timeout 10 sec. this is just a poll to the server, so shouldn't take more than 10 sec
	        complete : function (data) {
				if(callbackfn){callbackfn(data);}
	            setTimeout(function () {
	                $.fn.poll_server(urlIn,repeatEvery,callbackfn);
	            }, repeatEvery);
	        }
	    });
	}//poll_server

})})(jQuery);

