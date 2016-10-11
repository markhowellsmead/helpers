/*
	frappant.ch / mhm
	dependency: jquery
	Since 24.9.2014

	usage: $.frp_rss('http://www.example.org/rss/', function(data){
		
		console.log(data);
	
	});

*/

(function($){
	$.extend($.fn, {
		
		frp_rss: function(url, callback){

			if(this.frp_rss_validate(url)){
				$.ajax({
					url: 'getXML.php?url='+url,
					dataType: 'xml',
					success: function(response){
					    if(typeof callback === 'function'){
						    callback($.fn.frp_rss_parse(response));
						}
					}
				});
			}
		},//frp_rss

		//////////////////////////////////////////////////

		frp_rss_validate: function(url){
			return (/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(url)) ? true : false;
		},//frp_rss_validate

		//////////////////////////////////////////////////

		frp_rss_parse: function(data){
		
			var $xml = $(data);
			
			var channel_information = $xml.find("rss channel");
			
			/*
				channel_information.find("title").text()
				channel_information.find("link").text()
				channel_information.find("description").text()
				channel_information.find("lastBuildDate").text()
			*/

			var feed_entries = $xml.find('item', channel_information);

			return $xml;
			
		}//frp_rss_parse

	});

})(jQuery);