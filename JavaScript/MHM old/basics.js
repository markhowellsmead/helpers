//	default functions for dhtml objects
//	2006.08.10 mh

var Class = {
  create: function() {
    return function() {
      this.initialize.apply(this, arguments);
    }
  }
}


var basics={
	getElementWithId:function(id){
		if(document.getElementById){return document.getElementById(id);}
		else if(document.all){return document.all[id];}
		else if(document.layers){return document.layers[id];}
	},
	
	associateObjWithEvent:function(obj, methodName){
		return (function(e){
			e = e||window.event;
			return obj[methodName](e, this);
		});
	},
	
	DhtmlObject:function(elementId){
		var el = getElementWithId(elementId);
		if(el){
			el.onclick = associateObjWithEvent(this, "doOnClick");
			el.onmouseover = associateObjWithEvent(this, "doMouseOver");
			el.onmouseout = associateObjWithEvent(this, "doMouseOut");
		}
	},
	
	addEvent:function(mode,func,obj){
		//addEvent("onresize",fnDoStuffOnResize,window);
		//addEvent("onload",fnDoStuffOnLoad);
		if(!obj||obj==null){obj=window;}
		switch(mode){
			case "onresize":
				var fnOld=obj.onresize;
				if (typeof obj.resize!="function") {
					obj.onresize=func;
				}else{
					obj.onresize=function() {
						fnOld();
						func();
					};
				}
				break;

			case "onload":
				var oldonload=obj.onload;
				if (typeof obj.onload!="function") {
					obj.onload=func;
				}else{
					obj.onload=function() {
						oldonload();
						func();
					};
				}
				break;

			case "onunload":
				var oldonunload=obj.onunload;
				if (typeof obj.onunload!="function") {
					obj.onunload=func;
				}else{
					obj.onunload=function() {
						oldonunload();
						func();
					};
				}
				break;
		}
	},
	
	inherit:function(oTarget,oSource) {
		//	assign properties, functions, variables etc.
		//	from a source object to another object
		function inheritance() {}
		inheritance.prototype = oSource.prototype;
	
		oTarget.prototype = new inheritance();
		oTarget.prototype.constructor = oTarget;
		oTarget.baseConstructor = oSource;
		oTarget.superClass = oSource.prototype;
	},
	
	parseGOSDataLight:function(data,d1,d2){
		//	 mh/ob 4.7.2006
		//	[1]CollectionName[2]NameColumn1[2]NameColumn2[1][2]Row1Value1[2]Row1Value2[1][2]Row2Value1[2]Row2Value2
		//	d1="[1]";d2="[2]";
		
		dataObj=new Object();dataObj.length=0;
		if(data&&d1&&d2){
			aData=data.split(d1);
			aColNames=aData[0].split(d2);
			dataObj["name"]=aColNames[0];
			aData["rows"]=new Object();
			aOrigKey=new Array();
			for(nRow=1;nRow<aData.length;nRow++){
				aData["rows"][nRow]=[];
				aData["rows"][nRow]["rowData"]=aData[nRow].split(d2);
				key=aData["rows"][nRow]["rowData"][1];
				dataObj[key]=new Object();
				aOrigKey[aOrigKey.length]=dataObj[key];
				for(nCol=1;nCol<aColNames.length;nCol++){
					dataObj[key][aColNames[nCol]]=aData["rows"][nRow]["rowData"][nCol];
				}
				dataObj.length++;
			}
			if(false){	//	debug
				document.body._oDataObj=dataObj;
				document.body._oAlle=aOrigKey;
				document.body._oData=aData;
			}
		}
		return dataObj;
	},
	
	scrollPosition:function(){
		//	no clash with global.js because function name camelcased here
		if (self.pageYOffset){	// all except Explorer
			this.x=self.pageXOffset;
			this.y=self.pageYOffset;
		}else if(document.documentElement&&document.documentElement.scrollTop){	// Explorer 6 Strict
			this.x=document.documentElement.scrollLeft;
			this.y=document.documentElement.scrollTop;
		}else if (document.body){	// all other Explorers
			this.x=document.body.scrollLeft;
			this.y=document.body.scrollTop;
		}
		this.w=this.x;this.h=this.y;	//	legacy
	},
	
	clientWindow:function(){
		//	no clash with global.js because function name camelcased here
		if(self.innerHeight){	// all except Explorer
			this.w = self.innerWidth;
			this.h = self.innerHeight;
		}else if(document.documentElement&&document.documentElement.clientHeight){	// Explorer 6 Strict Mode
			this.w = document.documentElement.clientWidth;
			this.h = document.documentElement.clientHeight;
		}else if (document.body){	// other Explorers
			this.w = document.body.clientWidth;
			this.h = document.body.clientHeight;
		}
	},
	
	scrollJump:function(){
		//	scroll up 1 pixel and back down to original position.
		//	required to reset scrollbars in some browsers.
		var scrollPos=new scrollPosition();
		window.scrollTo(scrollPos.x,scrollPos.y+1);
		window.scrollTo(scrollPos.x,scrollPos.y);
	},

	activeLanguage:document.getElementsByTagName("html")[0].lang?document.getElementsByTagName("html")[0].lang:"de",

	gl:function(array){
		return array[this.activeLanguage];
	},
	
	windowReload:function(o){
		//	location.reload is blocked by safari when used cross-frame
		//	cr 14.3.2006 mh
		o=o?o:window;
		o.location.search+=(o.location.search?'&':'?')+'rand='+Math.random();
	}
}

//	legacy
addEvent				= basics.addEvent;
associateObjWithEvent	= basics.associateObjWithEvent;
clientWindow			= basics.clientWindow;
DhtmlObject				= basics.DhtmlObject;
getElementWithId		= basics.getElementWithId;
inherit					= basics.inherit;
parseGOSDataLight		= basics.parseGOSDataLight;
scrollJump				= basics.scrollJump;
scrollPosition			= basics.scrollPosition;