// make sure the console exists!
	if (!window.console) console = {};
	console.log = console.log || function(){};
	console.warn = console.warn || function(){};
	console.error = console.error || function(){};
	console.info = console.info || function(){};

//////////////////////////////////////////////////
// core class with functionality
	var Functionality = function(){
	
		var color = '', 		// string (private variable)
			objectData = {}, 	// array (private variable)
			datasource = '';	// string (private variable)
	
		this.construct = function(url){
			datasource = url; // muss auf this obeject gesetzt werden, nicht auf die Class
			console.log('object created with datasource '+datasource);
		};
	
		this.fetchObjectData = function(callback){ 	// with var, so can only be called within the class. ( = private)
			if(datasource!==''){ 					// …therefore variables like this one refer to the current object. ('this' is not required as in local scope.)
	
				$.getJSON(datasource,function(data,textStatus,jqXHR){
					objectData = data;				// don't use 'this' : we're still in local scope here so private variable 'objectData' can be accessed directly
					if(typeof(callback)=='function'){
						callback();
					}
				});
	
			}else{
				console.log('fetchObjectData: datasource is empty');
			}
		};

		this.getObjectData = function(){
			return objectData; // read private variable
		}//getObjectData


		// this function will be called externally…
		this.setObjectData = function(value){
			objectData = value; // write private variable
		}//setObjectData


		// this function will be called externally
		this.clearObjectData = function(){
			objectData = {}; // write private variable
		}//clearObjectData

			 /*
			 this is an 'alias' which can be called from inside the class.
			 calling this.clearObjectData wouldn't work because the variable objectData is private
			 */
			 _clearObjectData = this.clearObjectData;
	
	};
	

//////////////////////////////////////////////////
// secondary class with output functions
	var Display = function(){
	
		var viewData = '';

		this.buildDataHTML = function(){
			var listData = this.getObjectData(); // read private variable value into function-specific variable
			if(listData){
				for (key in listData) {
					if (listData.hasOwnProperty(key)){
						viewData+='<li>' + listData[key] + '</li>';
					}
				}
			}
			if(viewData!==''){
				viewData = '<ul>' + viewData + '</ul>';
			}
		}//buildDataHTML
	
		this.appendViewDataTo = function(target){
			if(target){
				target.innerHTML+=viewData;
			}else{
				console.log('appendViewDataTo: target object does not exist');
			}
		}//appendViewDataTo
	
		this.insertViewDataTo = function(target){
			if(target){
				target.innerHTML = viewData;
			}else{
				console.log('insertViewDataTo: target object does not exist');
			}
		}//insertViewDataTo
	
	
	};