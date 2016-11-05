Hegi={
	initLinks:function(){
		if (!document.getElementsByTagName){ return; }
		var anchors = document.getElementsByTagName('a');
		for (var i=0; i<anchors.length; i++){
			var anchor = anchors[i];
			var relAttribute = String(anchor.getAttribute('rel'));
			if (anchor.getAttribute('href') && ((relAttribute.toLowerCase().match('popup')))){
				anchor.onclick = function () {
					p(this.href,"gallery",535,600,"toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=0");
					return false;
				}
			}
		}
	}
}