/*
	Force content of browser window to re-draw (not reload)
	when switching between tabs in e.g. Google Chrome,
	when responsive design is implemented and window is resized
	when viewing a different tab.
	
	mhm 16.9.2013
	
*/

(function() {
	originalBodyClass = document.body.className
    var hidden = "hidden";
    if (hidden in document) document.addEventListener("visibilitychange", heyprojectionist);
    else if ((hidden = "mozHidden") in document) document.addEventListener("mozvisibilitychange", heyprojectionist);
    else if ((hidden = "webkitHidden") in document) document.addEventListener("webkitvisibilitychange", heyprojectionist);
    else if ((hidden = "msHidden") in document) document.addEventListener("msvisibilitychange", heyprojectionist);
    else if ('onfocusin' in document) document.onfocusin = document.onfocusout = heyprojectionist;
    else window.onpageshow = window.onpagehide = window.onfocus = window.onblur = heyprojectionist;

    function heyprojectionist(evt){var v='sg-tab-bust-visible', h = 'sg-tab-bust-hidden',evtMap = {focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h};evt = evt || window.event;
	    if (evt.type in evtMap) document.body.className = evtMap[evt.type];
	    else document.body.className = (originalBodyClass!==''?originalBodyClass+' ':'') + (this[hidden] ? 'sg-tab-bust-hidden' : 'sg-tab-bust-visible');
	}
})();