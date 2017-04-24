/*!
 * jQuery RSS Reader Plugin v1.0.0
 * https://github.com/frappant/frp_rss
 *
 * Copyright 2014 Mark Howells-Mead
 * Released under the GPL version 2 (or later) license http://www.gnu.org/licenses/gpl-2.0.html
*/

var date; // date.js

(function($){
	$.extend($.fn, {
		
		frp_rss_fetch: function(url, callback){

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
			}else{
				if(window.console && window.console.error){
					window.console.error('frp_rss_fetch: URL ' +url+ ' is invalid');
				}
			}

		},//frp_rss
		
		frp_rss_validate: function(url){

			return (/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(url)) ? true : false;

		},//frp_rss_validate
		
		frp_rss_htmlentities: function(str){

			return $("<div/>").text(str).html();

		},//frp_rss_htmlentities
		
		frp_rss_parse: function(data){

			// data: AJAX response containing XML
			
	    	var $xml 	= $(data),
	    		items 	= $xml.find('item');

			if(items.length){
			
				$.ajax({
					url: 'src/date.js',
					async: false
				});

				var returnArray = [];

				items.each(function() {

			        var $this = $(this),
			            item = {
			                title: $this.find("title").text(),
			                link: $this.find("link").text(),
			                description: $this.find("description").text(),
			                date: Date.parse($this.find("pubDate").text()) / 1000,
			                source: $this.find("source").text()
						};

					returnArray.push(item);
				});

				return returnArray;

			}else{
				if(window.console && window.console.info){
					window.console.info('frp_rss_parse: feed contains no items');
				}
				return null;
			}

		}//frp_rss_parse


	});

})(jQuery);