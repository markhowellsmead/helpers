/*
	General wrapper class for saving and retrieving data with browser's localStorage or sessionStorage using JavaScript.
	See README for usage.
	
	v1.0 - 5.8.2014 - mark@permanenttourist.ch
*/

if (!Date.now){Date.now = function(){return new Date().getTime();};}

window.clientstorage = new function(){
	
	'use strict';

	this.key = 'clientstorage';
	
	this.available = function() {
		try {return 'localStorage' in window && window['localStorage'] !== null;}
		catch (e) {return false;}
	};
	this.isAvailable = this.available();

	this.timestamp = function(addSeconds){
		return (Math.floor(Date.now()/1000))+addSeconds;
	};

	/////////////////////////////////////////////
	
	this.localStore = function(key,value,expires){
		// save value to localStorage if available, converted to JSON string
		if(this.isAvailable){
			if(expires){
				this.localSetExpiry(key+':x', expires);
			}
			return localStorage.setItem(key, JSON.stringify(value));
		}else{
			return false;
		}
	};

	this.localFetch = function(key){
		// fetch value from localStorage if available, parsed from JSON into original format
		if(this.isAvailable){
			this.localCheckExpiry(key);
			var item = localStorage.getItem(key);
			return item ? JSON.parse(item) : null;
		}else{
			return false;
		}
	};

	this.localRemove = function(key){
		// remove entry from localStorage
		if(this.isAvailable){
			localStorage.removeItem(key);
			localStorage.removeItem(key+':x'); // also remove expiry entry
		}
	};

	this.localCheckExpiry = function(key){
		// get expiry date for entry. if it is passed, then delete it and the relevant entry
		if(this.isAvailable){
			var expiry = localStorage.getItem(key+':x');
			if(expiry!==null && expiry < Math.floor((Date.now())/1000)){
				this.localRemove(key);
			};
		}
	};

	this.localSetExpiry = function(key,expires){
		// set expiry date for entry
		if(this.isAvailable){
			localStorage.setItem(key, expires);
		}
	};

	/////////////////////////////////////////////
	
	this.sessionStore = function(key,value,expires){
		// save value to sessionStorage if available, converted to JSON string
		if(this.isAvailable){
			if(expires){
				this.sessionSetExpiry(key+':x', expires);
			}
			return sessionStorage.setItem(key, JSON.stringify(value));
		}else{
			return false;
		}
	};

	this.sessionFetch = function(key){
		// fetch value from sessionStorage if available, parsed from JSON into original format
		if(this.isAvailable){
			this.sessionCheckExpiry(key);
			var item = sessionStorage.getItem(key);
			return item ? JSON.parse(item) : null;
		}else{
			return false;
		}
	};

	this.sessionRemove = function(key){
		// remove entry from sessionStorage
		if(this.isAvailable){
			sessionStorage.removeItem(key);
			sessionStorage.removeItem(key+':x'); // also remove expiry entry
		}
	};

	this.sessionCheckExpiry = function(key){
		// get expiry date for entry. if it is passed, then delete it and the relevant entry
		if(this.isAvailable){
			var expiry = sessionStorage.getItem(key+':x');
			if(expiry!==null && expiry < Math.floor((Date.now())/1000)){
				this.sessionRemove(key);
			};
		}
	};

	this.sessionSetExpiry = function(key,expires){
		// set expiry date for entry
		if(this.isAvailable){
			sessionStorage.setItem(key, expires);
		}
	};

};