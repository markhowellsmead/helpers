var jslib;if(!jslib){jslib=[];}	//	mh 20050412

lib_load=function(libpath){
	if(document.getElementById) {
		var script = document.createElement('script');script.defer=true;script.type="text/javascript";script.src=libpath;
		document.getElementsByTagName('head').item(0).appendChild(script);
		return script;
	}else{
		return false;
	}
}

load_css=function(csspath){
	if(document.getElementById) {
		var script = document.createElement('style');script.defer=true;script.type="text/css";script.src=csspath;
		document.getElementsByTagName('head').item(0).appendChild(script);
	}
}


var myPopups,aPopups
var windowNameDefault

class_Browser=function(){
	this.ver=navigator.appVersion;
	this.name=navigator.appName;
	this.agent=navigator.userAgent;
	this.win=(navigator.platform.toLowerCase().indexOf('win')>-1)?true:false;
	this.mac=(navigator.platform.toLowerCase().indexOf('mac')>-1)?true:false;
	this.dom=document.getElementById?true:false;
	this.ie=(this.name=='Microsoft Internet Explorer');
	this.ns=(this.name=='Netscape');
	this.ie4=(document.all && !this.dom)?true:false;
	this.ie5=(this.ie && (this.ver.indexOf("MSIE 5")!=-1))?true:false;
	this.ie6=(this.ie && (this.ver.indexOf("MSIE 6")!=-1))?true:false;
	this.ie7=(this.ie && (this.ver.indexOf("MSIE 7")!=-1))?true:false;
	this.ns4=(this.ns && integer(this.ver) == 4)?true:false;
	this.ns6=(this.dom && integer(this.ver)>=5)?true:false;
	this.safari=(this.ver.toLowerCase().indexOf("safari")>-1);
	this.firefox=(this.agent.toLowerCase().indexOf("firefox")>-1);
	this.dhtml=this.dom;
	this.rollover=this.dom;
	this.iemac=this.ie&&this.mac;
	this.gos=(this.dom&&!this.safari);
	return this
}
jslib.browser=new class_Browser();
bw=jslib.browser;

function outLinks(cLinks){
	// setup link targets and link titles
	if(!cLinks){
		cLinks=document.getElementsByTagName?document.getElementsByTagName("A"):document.links;
	}
	for (var i=0; i<=(cLinks.length-1);i++){
		var a=cLinks[i];
		if(a.href.indexOf("javascript:")<0){
			if((a.target=="")&&(a.href)&&(a.href.indexOf(self.location.hostname)<0)&&(a.href.indexOf("mailto:")<0)){
				a.target="_blank";
			}else if((document.body.className.toLowerCase().indexOf("popup")>-1)&&(self.window.opener)){
				try{
					var openerName=self.window.opener.name;
	     			if(openerName&&(a.target=="")){
						if((a.className=="opener")||(a.href.indexOf(self.location.hostname)>-1)){
							a.target=self.window.opener.name;
						}
					}
				}
				catch(e){a.target="_blank"}
			}
			if(a.title==""){
				if(a.href.indexOf("mailto:")>-1){
					a.title=a.href.split("?")[0].replace(/mailto:/g,"E-Mail ")
				}else if((a.href.indexOf("http://")>-1)&&(a.href.indexOf(self.location.hostname)<0)){
					a.title=a.hostname
				}
			}
		}
	}
}

function setWindow(){
	if((document.body.className.toLowerCase().indexOf("channel")<0)&&(self!=top)){top.location=self.location}
	if((document.body&&document.body.className.toLowerCase().indexOf("popup")<0&&document.body.className.toLowerCase().indexOf("channel")<0)&&(windowNameDefault!="")){self.window.name=windowNameDefault}
	if(document.body.className.toLowerCase().indexOf("popup")>-1){self.window.focus()}
}

function replaceAll(theString,searchChar,newChar){
	return theString.split(searchChar).join(newChar)}

function deConfirm(msg){
	confBox=confirm(sChars(msg,"js"))
	return confBox}

function deAlert(msg){ 
	alert(sChars(msg,"js"))
}

function dePrompt(label,defaultvalue){
	return prompt(sChars(label,"js"),sChars(defaultvalue,"js"))
}

function sChars(sct,mtyp){
	//	Beispiel:
	//	sChars("F(ue)r Br(oe)nnimann: bitte (Ue)berpr(ue)fen","js")

	if(sct.indexOf("(")<0){return sct}

	aIn=new Array("(Oe)","(oe)","(Ae)","(ae)","(Ue)","(ue)","(Eg)","(eg)","(Ea)","(ea)","(Oc)","(oc)"," ")
	switch(mtyp){
		case "js":
		if(jslib.browser.safari){
			aOut=new Array("Ö","ö","Ä","ä","Ü","ü","È","è","E","é","Ô","ô"," ")
		}else{
			aOut=new Array("%d6","%f6","%c4","%e4","%dc","%fc","%c8","%e8","%c9","%e9","%d4","%f4"," ")
		}
		break
		case "html":
		aOut=new Array("&Ouml;","&ouml;","&Auml;","&auml;","&Uuml;","&uuml;","&Egrave;","&egrave;","&Eacute;","&eacute;","&Ocirc;","&ocirc;"," ")
	}
	for(rL=0;rL<aIn.length;rL++){
		sct=replaceAll(sct,aIn[rL],aOut[rL])
	}
	if(mtyp=="js"){sct=unescape(sct)}
	return sct
}


function p(ohref,fname,w,h,params){
	//	generic popup window launcher
	if((!self.window.name)&&(!self.window.opener)&&(windowNameDefault)){self.window.name=windowNameDefault}
	if(!fname){fname=""}
	if(!params){params=""}
	if(!h){h=screen.availHeight*0.9}
	if(!w){w=screen.availWidth*0.9}
	h=(h>(screen.availHeight*0.7)||(h==0))?screen.availHeight*0.7:h
	w=(w>(screen.availWidth)||(w==0))?screen.availWidth:w
	windowPosition=centre_window(w,h)
	newWin=window.open(ohref,fname,params+',width='+Math.round(w)+',height='+Math.round(h)+",left="+windowPosition[0]+",top="+windowPosition[1])
	myPopups++
	return false;
}

popupBlocked=function(obj){
	//	check for popup window blocker
	//	cr 16.12.2005 mh
	try{var dummy=obj.name;return false}
	catch(e){return true}
	return obj;
}

function p2(ohref,fname,w,h,params){
	//	generic popup window launcher
	if((!self.window.name)&&(!self.window.opener)&&(windowNameDefault)){self.window.name=windowNameDefault}
	if(!fname){fname=""}
	if(!params){params=""}
	if(!h){h=screen.availHeight*0.9}
	if(!w){w=screen.availWidth*0.9}
	h=(h>(screen.availHeight*0.7)||(h==0))?screen.availHeight*0.7:h
	w=(w>(screen.availWidth)||(w==0))?screen.availWidth:w
	windowPosition=centre_window(w,h)
	newWin=window.open(ohref,fname,params+',width='+Math.round(w)+',height='+Math.round(h)+",left="+windowPosition[0]+",top="+windowPosition[1])
	myPopups++
	return newWin;
}

function centre_window(w,h){
	// calculate x,y positions for popup window to appear in the centre of the screen
	windims=new Array(
		Math.round((screen.availWidth-w)/2),
		Math.round(((screen.availHeight*0.9)-h)/2)
	)
	return windims
}

function newwin(a){
	//	<a href="myImage.jpg" onclick="return newwin(this)">Klicken Sie hier</a>
	a.target="_blank"
	return true
}

function goTo(thePath){
	if(thePath!=""){document.location.href=thePath}
}

function openmediafile(plugin_type,a){
	//	detect browser plugin for rich content media. if present, open media link in a new window,
	//	otherwise it will be downloaded by the browser. e.g. adobe pdf can be opened inside the
	//	browser under ie windows and safari: make sure this happens in a new window.  in mozilla,
	//	the linked pdf will just be downloaded, so no new window is necessary
	//	cr 8.4.2005 mh
	if(jslib.cPlugins[plugin_type]){return newwin(a)}	//	open new window
	else{return true}	//	just follow normal link procedure
}

var popmedia_custom;
function popmedia(path,mediatype){
	if(popmedia_custom){return popmedia_custom(path,mediatype)}
	else{
		w=(mediatype=="audio")?500:650
		h=(mediatype=="audio")?100:455
		options="menubar=0,location=0,toolbar=0,directories=0,status=1,resizable=1,scrollbars=0"
		return p(path,'gosmedia',w,h,options)
	}
}

function eObj(oIn,setListeners){
	//	mh 08/2004
	if(document.layers){return false}
	oBase=oIn?((typeof oIn).toLowerCase()=="object")?oIn:document.getElementById(oIn):new Object()
	if(oBase){
		if(setListeners&&libDhtml){oBase.eventlistenerAdd=libDhtml.eventlistenerAdd;oBase.eventlistenerRemove=libDhtml.eventlistenerRemove;}
		oBase.path=oBase
		oBase.css=oBase.style	//	legacy compatibility
		//oBase.clip=clipIt
		//oBase.move=moveIt
		//oBase.moveto=moveTo
		//oBase.showhide=showHide
	}
	return oBase
}

aEL=function(obj,evType,fn){
	//	add event listener
	//	20060602 mh
	if(obj.addEventListener) {		//	W3C
		obj.addEventListener(evType,fn,false);
	}else if(obj.attachEvent){		//	IE
		obj.attachEvent("on"+evType,fn);
	}else{
		var originalHandler=obj["on"+evType];
		if (originalHandler){
			obj["on"+evType]=function(e){originalHandler(e);fn(e);};
		}else{
			obj["on"+evType]=fn;
		}
	}
}

function selValue(pField){
	//	legacy
	return pulldownValue(pField)
}

pulldownValue=function(pField){
	//	cr 7.7.2005 mh
	return pField.options[pField.selectedIndex].value?pField.options[pField.selectedIndex].value:pField.options[pField.selectedIndex].text;
}

isChecked=function(thefield){
	// return true if a checkbox / one of a set of radio buttons is checked
	if(thefield.type=="checkbox"){return thefield.checked}
	else if((thefield.length>-1)&&(thefield.type!="select-one")){
		for(i=0;i<thefield.length;i++){
			if(thefield[i].checked){return true}
		}
		return false}
	else{return false}
}

formFieldValue=function(o){
	if((!o.type)||(o.type=="checkbox")){return !isChecked(o)}	//	checkbox or radio button
	else if(o.type.indexOf("select")==0){return (o.options[o.selectedIndex].value=="")}	//	pulldown
	else{return (o.value=="")}	//	hidden and text fields
}

function dom_obj(id){
	//	abbreviated reference to element in document heirarchy by ID
	return document.getElementById(id)
}

function integer(n){
	//	avoid octal parsing
	//	(strings beginning with "0" are always parsed as octal numbers)
	return parseInt(n,10)
}

function clientwindow(){
	//--- browser window size ---
	if(self.innerHeight){	// all except Explorer
		this.w = self.innerWidth;
		this.h = self.innerHeight;
		return this
	}else if(document.documentElement&&document.documentElement.clientHeight){	// Explorer 6 Strict Mode
		this.w = document.documentElement.clientWidth;
		this.h = document.documentElement.clientHeight;
		return this
	}else if (document.body){	// other Explorers
		this.w = document.body.clientWidth;
		this.h = document.body.clientHeight;
		return this
	}
	return false
}

class_Cookie=function(){
	//////////////////////////
	//	cookie functions	//
	//	mh 20050412			//
	//////////////////////////
	this.read=function(cookiename){
		var cookiestring = cookiename + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==" ") c = c.substring(1,c.length);
			if (c.indexOf(cookiestring) == 0) return c.substring(cookiestring.length,c.length);
		}
		return null;
	}
	this.set=function(name,value,days,path){	//	create / update cookie
		if(!days){expires=""}
		else{
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = ";expires="+date.toGMTString();
		}
		document.cookie = name+"="+escape(value)+expires+";path="+(path!=null?path:"/");
		return true;
	}
	this.expires=function(nrdays){
		var UTCstring;
		Today = new Date();
		nomilli=Date.parse(Today);
		Today.setTime(nomilli+nrdays*24*60*60*1000);
		UTCstring = Today.toUTCString();
		return UTCstring;
	}
	this.clear=function(name){
		return this.set(name,"",-1)
	}
}
jslib.cookies=new class_Cookie()

function getcookie(n){return jslib.cookies.read(n)}
function readCookie(n){return jslib.cookies.read(n)}
function setcookie(name,value,path,duration){return jslib.cookies.set(name,value,duration,path)}
function getexpirydate(days){return jslib.cookies.expires(days)}

function centreMe(oL,mode){
	//	vertical and horizontal align a div: centreMe('myDiv')
	//	bspw. home page
	//	#myDiv	{position:absolute;top:-1000px;left:-1000px}
	if(document.getElementById){
		oWin=new clientwindow()
		oScroll=new basics.scrollPosition

		if(!mode){
			newX=(integer(integer(oWin.w)-document.getElementById(oL).offsetWidth)/2)
			document.getElementById(oL).style.left=newX>0?newX+"px":"0px";
			newY=(integer(integer(oWin.h)-document.getElementById(oL).offsetHeight)/2)+oScroll.y;
			document.getElementById(oL).style.top=newY>0?newY+"px":"0px";
			if(document.getElementById(oL).style.visibility!="visible"){document.getElementById(oL).style.visibility="visible";}
			setTimeout("centreMe('"+oL+"')",5)
		}else{
			if(mode.toLowerCase().indexOf("h")>-1){
				newX=(integer(integer(oWin.w)-document.getElementById(oL).offsetWidth)/2)
				document.getElementById(oL).style.left=newX>0?newX+"px":"0px";
			}
	
			if(mode.toLowerCase().indexOf("v")>-1){
				newY=(integer(integer(oWin.h)-document.getElementById(oL).offsetHeight)/2)
				document.getElementById(oL).style.top=newY>0?newY+"px":"0px";
			}
			if(document.getElementById(oL).style.visibility!="visible"){document.getElementById(oL).style.visibility="visible";}
			setTimeout("centreMe('"+oL+"','"+mode+"')",5)
		}
	}
	return
}

function dhtmlObj(eID){
	//	auch für älteren Browsers geeignet
	//	cr 20050404 mh

	this.id=eID

	if(document.getElementById){	//	IE5+ und Gecko
		if(!document.getElementById(eID)){return false}
		this.css=document.getElementById(eID).style;
		this.showMe=function(){this.css.visibility="visible"}
		this.hideMe=function(){this.css.visibility="hidden"}
	}
 	else if(document.layers){		//	NN4
		if(!document.layers[eID]){return false}
 		this.css=document.layers[eID]
		this.showMe=function(){this.css.visibility="show"}
		this.hideMe=function(){this.css.visibility="hide"}
 	}
 	else if(document.all){			//	IE4
		if(!document.all[eID]){return false}
	 	this.css=document.all[eID].style
		this.showMe=function(){this.css.visibility="visible"}
		this.hideMe=function(){this.css.visibility="hidden"}
	}
 	return this
}

function plugindetect_vbscript(){
	//	detect browser plugins using vbscript (ie windows)
	//	cr 8.4.2005 mh
	document.writeln("<script language=\"VBscript\">");
	document.writeln("detectableWithVB = False");
	document.writeln("If ScriptEngineMajorVersion >= 2 then");
	document.writeln("	detectableWithVB = True");
	document.writeln("End If");

	//	most plugins
	document.writeln("Function detectActiveXControl(activeXControlName)");
	document.writeln("	on error resume next");
	document.writeln("	detectActiveXControl = False");
	document.writeln("	If detectableWithVB Then");
	document.writeln("		detectActiveXControl = IsObject(CreateObject(activeXControlName))");	//	VBScript equivalent of "return" (must be false if not defined?)
	document.writeln("	End If");
	document.writeln("End Function");

	//	QuickTime
	document.writeln("Function detectQuickTimeActiveXControl()");
	document.writeln("	on error resume next");
	document.writeln("	detectQuickTimeActiveXControl = False");
	document.writeln("	If detectableWithVB Then");
	document.writeln("		detectQuickTimeActiveXControl = False");
	document.writeln("		hasQuickTimeChecker = false");
	document.writeln("		Set hasQuickTimeChecker = CreateObject(\"QuickTimeCheckObject.QuickTimeCheck.1\")");
	document.writeln("		If IsObject(hasQuickTimeChecker) Then");
	document.writeln("			If hasQuickTimeChecker.IsQuickTimeAvailable(0) Then ");
	document.writeln("				detectQuickTimeActiveXControl = True");		//	VBScript equivalent of "return" (must be false if not defined?)
	document.writeln("			End If");
	document.writeln("		End If");
	document.writeln("	End If");
	document.writeln("End Function");
	document.writeln("<\/scr" + "ipt>");
}

class_Plugins=function() {
	//	create js object containing activated browser plugins
	//	cr 8.4.2005 mh
	this.agent = navigator.userAgent.toLowerCase();
	if (navigator.plugins!=null&&navigator.plugins.length>0) {
		this["plugins"]=""
		for (i=0;i<navigator.plugins.length;i++){this["plugins"]+=navigator.plugins[i].name!=""?navigator.plugins[i].name+";":""}
		this["pdf"]			= (this["plugins"].indexOf("Adobe Acrobat")>-1)
		this["quicktime"]	= (this["plugins"].indexOf("QuickTime Plug-in")>-1)
		this["flash"]		= (this["plugins"].indexOf("Shockwave Flash")>-1)
		this["realplayer"]	= (this["plugins"].indexOf("RealPlayer")>-1)
		this["shockwave"]	= (this["plugins"].indexOf("Shockwave for Director")>-1)
		this["windowsmedia"]= (this["plugins"].indexOf("Windows Media")>-1)
	}
	else if (this.agent.indexOf("msie")!=-1&&parseInt(navigator.appVersion)>=4&&this.agent.indexOf("win")!=-1&&this.agent.indexOf("16bit")==-1){
		//	IE4+ Windows
		//	returns true for all plugins: VBScript makes the browser do funny things
		//	when trying to initiate the ActiveX object, when a link is clicked.

		//plugindetect_vbscript()
		this["plugins"]		= false
		this["pdf"]			= true	//	Acrobat browser plugin is default in Windows XP package	//detectActiveXControl("PDF.pdfCtrl.6")	//detectActiveXControl("PDF.pdfCtrl.5")
		this["quicktime"]	= true
		this["flash"]		= true
		this["realplayer"]	= true
		this["shockwave"]	= true
		this["windowsmedia"]= true
/*		this["quicktime"]	= detectQuickTimeActiveXControl()
		this["flash"]		= detectActiveXControl("ShockwaveFlash.ShockwaveFlash.1")
		this["realplayer"]	= (detectActiveXControl('rmocx.RealPlayer G2 Control')||detectActiveXControl('RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)')||detectActiveXControl('RealVideo.RealVideo(tm) ActiveX Control (32-bit)'));
		this["shockwave"]	= detectActiveXControl("SWCtl.SWCtl.1")
		this["windowsmedia"]= detectActiveXControl("MediaPlayer.MediaPlayer.1")*/
	}else{
	// Can't detect (e.g. old browsers)
		this["plugins"]=[];
	}
	return this
}
jslib.cPlugins=new class_Plugins()

class_Language=function(){
	this.lang_default="de";
	this.bodylang=document.getElementsByTagName?(document.getElementsByTagName("HTML")[0].lang!=null?document.getElementsByTagName("HTML")[0].lang:this.lang_default):this.lang_default;
	return this
}
jslib.language=new class_Language()

//	g-os email cloaking
//	cr 2005 ob
codeIn="!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@";
scrambler=function(tIn){
	for(n=0;n<tIn.length;n++){
		document.write((c=codeIn.indexOf(tIn.charAt(n)))>=0?codeIn.charAt(codeIn.length-c-1):tIn.charAt(n));
	}
}

function resizeContent(){
	//	adjust size of master DIV "#container" to fit largest image
	//	only in IE Windows
	//	cr 2004 mh
	if(document.getElementById&&document.getElementById("container")&&bw.ie&&bw.win){
		contWidth=document.getElementById("container").style.width
		for(iLoop=0;iLoop<document.images.length;iLoop++){
			iWidth=parseInt(document.getElementById("inhalt").document.images[iLoop].style.width)
			if(iWidth>contWidth){contWidth=iWidth+"px"}
		}
		document.getElementById("container").style.width=contWidth
		document.getElementById("container").style.margin="13px 2em 0 0"
	}
}

function cal(a){
	if((typeof a).toLowerCase()=="object"){
		actField=a
	}else{
		actField=document.getElementById(a)
	}
	dOpenCalendar(actField)	//	/js/date.js
	return false
}

function checkFormField(field,myTyp){
	//	upd 10.02.2005 mh
	//	existiert das Feld?
	if(field){
		switch(myTyp){
			case "select":
				return(field.type=="select-one" || field.type=="select-multiple");
				break;
			case "text":
				return(field.type=="text");
				break;
			case "hidden":
				return(field.type=="hidden");
				break;
			default:
				return(false);
		}
	}else{
		return(false)
	}
}

_formFieldValue_OLD=function(field){
	if(!field){return false}
	switch(field.type){
		case "select":
			return(field.selectedIndex>-1?field.options[field.selectedIndex].value:false);
			break;

		case "text":
			return(field.value);
			break;

		case "hidden":
			return(field.type=="hidden");
			break;

		case "radio":
			if(field.length==1){return(field.value);}
			else{
				var i=0;
				while(field[i]){
					if(field[i].checked){return field.value;}
					i++;
				}
				return false;
			}
			break;

		case "checkbox":
			aValues=new Array();
			if(field.length>1){	//	return array of all values
				var i=0;
				while(field[i]){
					if(field[i].checked){aValues[aValues.length]=field[i].value;}
					i++;
				}
				return aValues;
			}else{
				aValues[aValues.length]=field.value;
			}
			return(aValues.length>0?aValues:false);
			break;

		default:
			alert("[error] field '"+field.id?field.id:field.name+"' has no type");
			return false;
	}
}

function mfSelIndex(pField){
	//	return selected value of pulldown
	//	cr <2001 tb
	if(pField.selectedIndex==-1 || pField.selectedIndex<pField.options.length){
		pOption=pField.options[pField.selectedIndex]
		vField=pOption.value?pOption.value:pOption.text;
	}
	else{ vField="";}
	return vField
}

clearFormField=function(o){
	//	delete value of specified form field
	//	parameter either field (object) or id (string)
	//	upd 8.7.2005 mh
	if(!document.getElementById){return true}
	if(typeof o.toLowerCase()!="object"){o=document.getElementById(o)}
	o.value=""
	return false
}

findInArray=function(needle,aHaystack)
{
	//	find value needle in array aHaystack
	//	cr 22.08.2005 mh
	for(var n in aHaystack){if(aHaystack[n]==needle){return n}}
	return -1;
}

printLink=function(sText,pre,post){
	if(window.print){if(!pre){pre=""};if(!post){post=""};document.write(pre+"<a href\"#\" onclick=\"window.print();return false\" style=\"cursor:pointer;cursor:hand\">"+sText+"<\/a>"+post)}
}

hasFlash=function(){

	if(jslib.cookies.read("hasflash")=="true"){return true}

	var nMinVersion=6;

	if(navigator.appVersion.indexOf("MSIE")!=-1&&navigator.appVersion.indexOf("Windows")>-1){
		document.write('<script language="VBScript"\> \non error resume next \nhasFlash = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash." & '+nMinVersion+'))) \n<\/script\> \n');
		if(window.hasFlash!=null){return window.hasFlash}
	}
	
	if(navigator.mimeTypes&&navigator.mimeTypes["application/x-shockwave-flash"]&&navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){
		var b=(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]).description;
		return parseInt(b.charAt(b.indexOf(".")-1))>=nMinVersion;
	}
	
	return false
}

if(!Function.prototype.apply){
	Function.prototype.apply = function(oScope, args) {
		var sarg = [];
		var rtrn, call;
		if (!oScope) oScope = window;
		if (!args) args = [];
		for (var i = 0; i < args.length; i++){sarg[i] = "args["+i+"]";}
		call = "oScope.__applyTemp__(" + sarg.join(",") + ");";
		oScope.__applyTemp__ = this;
		rtrn = eval(call);
		delete oScope.__applyTemp__;
		return rtrn;
	}
}

//	flash comms
//	if ssp + # then add if(href!="#")....
function flashPutHref(href){location.href=href;}
function flashPutTitle(title){document.title=title;}
