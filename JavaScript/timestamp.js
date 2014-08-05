/*
	javascript function to calculate a timestamp
	to the nearest second. optional parameter to add a number
	of seconds to the current timestamp, e.g. if you need
	the timestamp for the time in one hour

	works independently from external libraries.

	https://github.com/mhmli
	v1.0 - 5.8.2014
*/


function timestamp(addSeconds){
	if (!Date.now){Date.now = function(){return new Date().getTime();};}
	return (Math.floor(Date.now()/1000))+parseInt(addSeconds,10);
};


var now = timestamp();
var now = timestamp(0);
var inOneHour = timestamp(1000*60*60);