Hegi={
	popups:function(){
		if (!document.getElementsByTagName){ return; }
		var anchors = document.getElementsByTagName('a');
		for (var i=0; i<anchors.length; i++){
			var anchor = anchors[i];
			var relAttribute = String(anchor.getAttribute('rel'));
			if (anchor.getAttribute('href') && ((relAttribute.toLowerCase().match('diapro')) || (relAttribute.toLowerCase().match('json')))){
				anchor.onclick = function () {
					p(this.href,"gallery",535,600,"toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=0");
					this.blur();
					return false;
				}
			}

			/*var classAttribute = String(anchor.getAttribute('className'));
			if (anchor.getAttribute('href') && ((classAttribute.toLowerCase().match('thickbox')) || (classAttribute.toLowerCase().match('json')))){
				anchor.href+="?height=500&width=500";
			}*/
		}
	}
}
Event.observe(window, 'load', Hegi.popups, false);
