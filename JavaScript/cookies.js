/****************************************************
		createCookie
		Speichert ein Cookie
****************************************************/
function createCookie(cookieName, cookieValue, days) {
	
	var expires = '';
	
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		expires = '; expires='+ date.toGMTString();
	}
	document.cookie = cookieName + '=' + cookieValue + expires + '; path=/';
	
} // createCookie


/****************************************************
		readCookie
		Liest ein Cookie aus
****************************************************/
function readCookie(cookieName) {
	var cookieNameMarker = cookieName + '=';
	var cookieParts = document.cookie.split(';');
	
	// Cookie parsen
	for(var cookiePartNumber=0;cookiePartNumber < cookieParts.length;cookiePartNumber++) {
		var cookiePart = cookieParts[cookiePartNumber];
		
		// Weissraum ignorieren
		while (cookiePart.charAt(0)==' ') {
			cookiePart = cookiePart.substring(1,cookiePart.length);
		} // while hat Weissraum
		
		// Falls Cookieteil mit "[cookiename]=" beginnt, Wert parsen
		if (cookiePart.indexOf(cookieNameMarker) == 0) {
			return cookiePart.substring(cookieNameMarker.length, cookiePart.length);
		}
	} // for Cookie-Teile
	
	return null;
} // readCookie


/****************************************************
		eraseCookie
		Löscht ein cookie
****************************************************/
function eraseCookie(cookieName) {
	createCookie(cookieName,'',-1);
} // eraseCookie