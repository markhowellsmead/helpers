/*
	Tests a string using regex to see if it is a valid URL or not.
*/
function isURL(url){
	var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
	return regexp.test(url);
};//isURL