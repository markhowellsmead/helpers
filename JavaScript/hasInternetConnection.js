/*
	javascript function to check whether the
	client browser is currently connected to the internet.

	works independently from external libraries.

	tested in ffox, chrome, ie9
	opera 11.62 returns false, but doesn't show alert message
	
	can trigger problems in slow machines or ie8 in compatability view

	navigator.onLine would be better, but isn't supported
	problem-free in all browsers.

	thanks http://remysharp.com/2011/04/19/broken-offline-support/
	thanks http://www.javascriptkit.com/javatutors/trycatch.shtml

	https://github.com/mhmli
	v1.0 15.5.2012
*/

function hasInternetConnection=function(){

	var onLine = false;
	var ajaxrequest=null;
	if (window.ActiveXObject){
		try {
			ajaxrequest=new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			try{
				ajaxrequest=new ActiveXObject("Microsoft.XMLHTTP");
			}catch(e){
				alert("Ajax not supported in your browser!");
			}
		}
	}else if (window.XMLHttpRequest){
		ajaxrequest=new XMLHttpRequest();
	}
	ajaxrequest.open('HEAD','/',false);
	try {
		ajaxrequest.send();
		onLine = true;
	}catch(e){
		onLine = false;
		alert('Please check your internet connection!');
	}
	return onLine;
}//hasInternetConnection


if(hasInternetConnection()){
	//	do something which requires a live internet connection
	//	e.g. make an ajax request to update some information
}