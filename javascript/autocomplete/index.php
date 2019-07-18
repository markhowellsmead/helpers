<!DOCTYPE html>
<html>
<head>
	<title>Autocomplete field using JSON</title>
	<script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>
	<link rel="stylesheet" href="autocomplete.css">
</head>
<body>
<!--Make sure the form has the autocomplete function switched off! -->
<p><a href="https://www.w3schools.com/howto/howto_js_autocomplete.asp">Source</a></p>
<form autocomplete="off" action="#">
	<div class="autocomplete" _style="width:300px;">
		<input data-autocomplete id="myInput" type="text" name="myCountry" placeholder="Destination">
		<input data-real id="myCountryID" name="myCountryID" type="text" disabled>
	</div>
	<input type="submit">
</form>
<script src="autocomplete_ajax.js"></script>
<script>
	(function($){

		autocomplete(document.getElementById('myInput'), document.getElementById('myCountryID'));

		// $.ajax({
		// 	url: 'https://permanenttourist.ch/wp-json/wp/v2/posts',
		// 	type: 'GET',
		// 	cache: false,
		// 	data: {
		// 		'per_page': 100
		// 	},
		// 	dataType: 'json',
		// 	success: function(response) {
		// 		var posts = [];
		// 		for(var i = 0; i < response.length; i++){
		// 			posts.push(response[i].title.rendered);
		// 		}
		// 		autocomplete(document.getElementById('myInput'), posts);
		// 	}
		// });


	})(jQuery);
</script>
</body>
</html>