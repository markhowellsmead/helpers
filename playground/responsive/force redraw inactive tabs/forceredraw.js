/*
	if a responsive design is used and set to e.g. tablet view and then 
	the user changes to another tab and resizes to full screen,
	then switches back to the original tab, the original tablet view css
	still applies. the feature is most commonly seen in google chrome.
	
	this fixes that.
	
	mhm 11.7.2013
*/
(function() {
    var hidden = "hidden";
    if (hidden in document) document.addEventListener("visibilitychange", heyprojectionist);
    else if ((hidden = "mozHidden") in document) document.addEventListener("mozvisibilitychange", heyprojectionist);
    else if ((hidden = "webkitHidden") in document) document.addEventListener("webkitvisibilitychange", heyprojectionist);
    else if ((hidden = "msHidden") in document) document.addEventListener("msvisibilitychange", heyprojectionist);
    else if ('onfocusin' in document) document.onfocusin = document.onfocusout = heyprojectionist;
    else window.onpageshow = window.onpagehide = window.onfocus = window.onblur = heyprojectionist;

    function heyprojectionist(evt){var v='sg-tab-bust-visible', h = 'sg-tab-bust-hidden',evtMap = {focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h};evt = evt || window.event;
	    if (evt.type in evtMap) document.body.className = evtMap[evt.type];
	    else document.body.className = this[hidden] ? "sg-tab-bust-hidden" : "sg-tab-bust-visible";
	}
})();