/*
	Reference for object-oriented class programming in Javascript
	mhm 10.9.2013
*/

// Always include the following definition for support in older browsers
// bind() was first introduced in JavaScript 1.8.5
Function.prototype.bind||(Function.prototype.bind=function(e){var t,n,r,i;if(typeof this!="function")throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");t=Array.prototype.slice.call(arguments,1),n=this,r=function(){},i=function(){return n.apply(this instanceof r&&e?this:e,t.concat(Array.prototype.slice.call(arguments)))};r.prototype=this.prototype;i.prototype=new r;return i});

var myClass = function(){
	
	var privateVar = true; // private. can only be used inside the class.

	this.option = true; // public. can be accessed and changed from outside the class.

	this.colourOption = '#f00';
	this.message = 'Hello world';
	this.myArray = [];
	this.myObject = {};
	
	this.announce = function(){
		alert(this.message);
	};//announce

	this.clickHandler = function(event){
		alert(this.option ? 'yes' : 'no');
		if(event && console && console.log){
			clickedLink = eventTarget(event); // references the internal eventTarget function, not the external one
			console.log(clickedLink);
		}
	}.bind(this);//clickHandler

	var eventTarget = function(e){
		e = e || window.event;
		var targ = e.target || e.srcElement;
		if (targ.nodeType == 3) targ = targ.parentNode;
		return targ;
	};//eventTarget

};

//////////////////////////////////////////////////
// Usage and calls

// add new stuff to all instances of myClass
myClass.prototype.newFunction=function(){};
myClass.prototype.myOption2='green';


// make a new instance of myClass to be used as a default
var app_default = new myClass();

// make a new instance of myClass and alert the default message using announce()
var app_english = new myClass();
app_english.announce();

// make a new instance of myClass, change the message to German, alert the German message using announce()
var app_german = new myClass();
app_german.message = 'Hallo Welt';
app_german.announce();

// alert the default message again using announce() within the first instance
app_english.announce();

// add click handler to a link
document.getElementById('myLink').onclick = function(event){

	// change colour associated with the default instance
	// the colour in other instances app_english and app_default
	// will remain unchanged
	app_default.colourOption = '#0f0';

	// pass event on
	app_default.clickHandler(event);
	// or don't pass on event
	app_default.clickHandler();
	
	// block default click event result
	return false;
};


eventTarget = function(){
	alert('external eventTarget function');	
};