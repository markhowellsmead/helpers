function sayHi() {
	// Check if the current user is logged in
	// and has authorized the app
	
	FB.getLoginStatus(function(response) {
		// Check the result of the user

		console.log(response);
		
		if (response && response.status == 'connected') {
			// The user is connected to Facebook
			// and has authorized the app.
			// Now personalize the user experience
			FB.api('/me', function(response) {
				var message = document.getElementById('welcomeMessage');
				message.innerHTML = 'Hello, ' + response.first_name;
			});
		} else {
			alert('not authorized');
			// The user has not authenticated your app,
			// proceed with your normal (anonymous) flow.
		}
	});
};