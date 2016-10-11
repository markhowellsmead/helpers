if(window.attachEvent&&(navigator.appVersion.indexOf("MSIE 7.")<0)){
	function correctPNG(){
		//	correctly handle PNG transparency in Win IE 5.5 or higher.
		//	this function handles all inline images.
		aImages=document.getElementsByTagName("IMG");
		for(var i=0;i < aImages.length;i++){
			var img=aImages[i];
			var imgName=img.src.toUpperCase();
			if(/\.PNG/.test(imgName)){
				var imgID=(img.id)?"id='"+img.id+"' ":"";
				var imgClass=(img.className) ? "class='"+img.className+"' " : "";
				var imgTitle=(img.title) ? "title=\""+img.title+"\" " : "title=\""+img.alt+"\" ";
				var imgStyle="display:inline-block;"+img.style.cssText;
	
				if(img.align=="left"){imgStyle="float:left;"+imgStyle}
				if(img.align=="right"){imgStyle="float:right;"+imgStyle}
				if(img.parentElement.href){imgStyle="cursor:pointer;"+imgStyle}
	
				var strNewHTML="<span "+imgID+imgClass+imgTitle
				+ " style=\""+"width:"+img.width+"px; height:"+img.height+"px;"+imgStyle+";"
				+ "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
				+ "(src=\'"+img.src+"\', sizingMethod='scale');margin:0;padding:0\"></span>";

				img.outerHTML=strNewHTML;
	
				i=i-1;
			}
		}
	}
	
	function correctPNG_css(){
		//	correctly handle PNG transparency in background images for Win IE 5.5 or higher.
		//	only objects with inline (style="") background images will be handled.
		aBlocks=document.all;	//	ALL HTML ELEMENTS
		for(var i=0;i<aBlocks.length;i++){
			var oName=aBlocks[i].style.backgroundImage;
			if((oName!="")&&(oName.substring(oName.length-4,oName.length-1)=="png")){
				if(navigator.appVersion.indexOf("MSIE 5.0")<0){	//	ie5.5+
					aBlocks[i].style.height=aBlocks[i].offsetHeight+"px";	//	width or height must be defined, for ms filters to work
					bgURL=oName.replace("url(","").replace(")","");
					aBlocks[i].style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\""+bgURL+"\", sizingMethod=\"crop\")";
					aBlocks[i].style.backgroundImage="none";
					if(aBlocks[i].href){aBlocks[i].style.cursor="hand";}
				}else{	//	ie5.0x
					aBlocks[i].className+=" pngAlternative";
				}
			}
		}
	}
	
	window.attachEvent("onload", correctPNG);		//	do inline images
	window.attachEvent("onload", correctPNG_css);	//	do CSS background images
}