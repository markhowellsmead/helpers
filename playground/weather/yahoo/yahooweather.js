(function($){
	$.fn.extend({
		getYahooWeather: function(attr, callback) {
			if(attr.woeID){
				var locationQuery = encodeURI("select item from weather.forecast where woeid in (" +attr.woeID+ ") and u='c'"),
			    locationUrl = "http://query.yahooapis.com/v1/public/yql?q=" + locationQuery + "&format=json&callback=?";
				$.ajax({
					url: locationUrl,
					dataType: 'jsonp',
					success: function(data, textStatus, jqXHR){
						callback(data, textStatus, jqXHR);
					}
				});
			}
			return this;
		}
	});
})(jQuery);