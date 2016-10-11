/**
 * jQuery.compatabilityMode.js
 * Check to see if the visitor is using IE in compatability mode
 * Via https://social.msdn.microsoft.com/Forums/vstudio/en-US/ae715fd2-1ddd-46f7-8c26-9aed6b2103f1/how-to-detect-compatibility-mode-in-ie-any-version?forum=netfxjscript
 *
 * @depedency jquery
 * @since 12.11.2014 mhm 
 */

(function($){

	function IECompatibility() {
		var agentStr = navigator.userAgent;
		this.IsIE = false;
		this.IsOn = undefined;  //defined only if IE
		this.Version = undefined;
		if (agentStr.indexOf("MSIE 7.0") > -1) {
			this.IsIE = true;
			this.IsOn = true;
			if (agentStr.indexOf("Trident/6.0") > -1) {
				this.Version = 'IE10';
			} else if (agentStr.indexOf("Trident/5.0") > -1) {
				this.Version = 'IE9';
			} else if (agentStr.indexOf("Trident/4.0") > -1) {
				this.Version = 'IE8';
			} else {
				this.IsOn = false; // compatability mimics 7, thus not on
				this.Version = 'IE7';
			}
		} //IE 7
	}	

	$(document).ready(function() {
		var iec = new IECompatibility();
		window.alert('IsIE: ' + iec.IsIE + '\nVersion: ' + iec.Version + '\nCompatability On: ' + iec.IsOn);
	});

})(jQuery);