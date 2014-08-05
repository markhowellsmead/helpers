Wrapper class for HTML5 web storage
===================================

General wrapper class for saving and retrieving data with browser's localStorage or sessionStorage using JavaScript.

Automatically converts the data for storage using `JSON.stringify()` and automatically converts it back using `JSON.parse()`.

If the additional third parameter is set as a valid integer when calling `localStore` or `sessionStore` (number of seconds from current time), an additional entry will be made	as a “flag” using the key and suffix `:x`. When using `localFetch` or `sessionFetch`, the function will always check to see if there is an expiry flag set. If it is set and is in the past, both storage entries will be deleted and the fetch function will return false.

Usage:
Check for the availability of localStorage or sessionStorage first by accessing the boolean `window.clientstorage.isAvailable`.

```
var dataForStorage = {
	a: 'Apple',
	b: 'Banana',
	c: 'Caterpillar'
};

// store regularly
if(window.clientstorage.isAvailable){
	window.clientstorage.sessionStore('frp:myUniqueKey', dataForStorage);
}

// store using expiry timestamp
if(window.clientstorage.isAvailable){
	window.clientstorage.sessionStore('frp:myUniqueKey', dataForStorage, window.clientstorage.timestamp(60));
}
```

Browser support
---------------
* http://caniuse.com/json
* http://caniuse.com/namevalue-storage

Author
-----
Mark Howells-Mead | http://permanenttourist.ch/

Restrictions
------------
All code within this repository is provided as-is under the GPL GNU General Public Licence v3 and may be freely used, adapted and built upon. No guarantee is provided or implied. See http://www.gnu.org/licenses/gpl.html for full terms of the license.

Please submit questions, tips, corrections and general excitement and praise via mark@permanenttourist.ch. My online presence is linked from http://permanenttourist.ch/.
