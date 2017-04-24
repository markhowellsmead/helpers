<!DOCTYPE html>
<html lang="de" xmlns="http://www.w3.org/1999/xhtml" xmlns:og="http://opengraphprotocol.org/schema/" xmlns:fb="http://www.facebook.com/2008/fbml">
<head>
	<!--[if lt IE 9]>
		<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta charset="utf-8">
    <title></title>
	<script src="//code.jquery.com/jquery-latest.js"></script>
	<script src="fb.js"></script>
</head>
<body>

<a href="#" class="hi">Say hi!</a>

<div id="fb-root"></div>
<script>

/*window.fbAsyncInit = function() {
	FB.init({
		appId: '524616097587784',
		cookie: true,
		status: true,
		xfbml: true,
		channelUrl: 'http://www.fb.mhm/'
	});
};*/


window.fbAsyncInit = function() {                                                                                                                                     
 FB.init({                                                                                                                                                           
   appId      : '524616097587784', // App ID                                                                                                                         
   status     : true, // check login status                                                                                                                          
   cookie     : true                                                                                                                                                 
 });                                                                                                                                                                 

 // Check if the current user is logged in                                                                                                                           
 // and has authorized the app                                                                                                                                       
 FB.getLoginStatus(function(response) {  
 
 
 console.log(response);
                                                                                                                             
   // Check the result of the user                                                                                                                                   
   if(response && response.status == 'connected') {                                                                                                                  
     // The user is connected to Facebook                                                                                                                            
     // and has authorized the app.                                                                                                                                  
     // Now personalize the user experience                                                                                                                          

     FB.api('/me', function(response) {                                                                                                                              
       var message = document.getElementById('welcomeMessage');                                                                                                      
       message.innerHTML = 'Hello, ' + response.first_name;                                                                                                          
     });                                                                                                                                                             
   } else {                                                                                                                                                          
     // The user has not authenticated your app,                                                                                                                     
     // proceed with your normal (anonymous) flow.                                                                                                                   
   }                                                                                                                                                                 
 });                                                                                                                                                                 
};                                                                                                                                                                    

// Load the SDK Asynchronously
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=113869198637480";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


$('a.hi').click(function(e){
	e.preventDefault();
	sayHi();
});

</script>
</body>
</html>