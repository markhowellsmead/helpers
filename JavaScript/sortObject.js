/*
	Sort JavaScript object by key or value
	Chrome will sort numeric keys first
	
	mhm 7.9.2014 via http://am.aurlien.net/post/1221493460/sorting-javascript-objects

	Usage
		// sort by keys
		myObject = sortObject(myObject);
		
		// sort by values
		myObject = sortObject(myObject, 'value'); 

		// sort by values, case-sensitive
		myObject = sortObject(myObject, 'value', true); 

*/

sortObject = function(obj, type, caseSensitive) {
	var temp_array = [];
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			if (!caseSensitive) {
				key = (key['toLowerCase'] ? key.toLowerCase() : key);
			}
			temp_array.push(key);
		}
	}
	if (typeof type === 'function') {
		temp_array.sort(type);
	} else if (type === 'value') {
		temp_array.sort(function(a,b) {
			var x = obj[a];
			var y = obj[b];
			if (!caseSensitive) {
				x = (x['toLowerCase'] ? x.toLowerCase() : x);
				y = (y['toLowerCase'] ? y.toLowerCase() : y);
			}
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		});
	} else {
		temp_array.sort();
	}
	var temp_obj = {};
	for (var i=0; i<temp_array.length; i++) {
		temp_obj[temp_array[i]] = obj[temp_array[i]];
	}
	return temp_obj;
};
