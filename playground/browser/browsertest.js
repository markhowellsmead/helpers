javascriptVersion1_1 = true;

// initialize global variables

var detectableWithVB = false;
var pluginFound = false;

function canDetectPlugins() {
	if( detectableWithVB || (navigator.plugins && navigator.plugins.length > 0) ) {
		return true;
	} else {
		return false;
	}
}


function info(){
	var hoehe, breite, farbe, os, name, browser, sprache, cookiesok, javaok;
	hoehe   = screen.height;
	breite  = screen.width;
	farbe   = screen.colorDepth;
	os	  	= navigator.platform;
	browser = navigator.appName;
	httpid  = navigator.userAgent;
	sprache = navigator.language;

	if(navigator.cookieEnabled == true)
	  cookiesok = "permitted";
	else if(navigator.cookieEnabled == false)
	  cookiesok = "forbitten";
	else
	  cookiesok = "unsupported request";

	if(navigator.javaEnabled && navigator.javaEnabled() == true)
	  javaok = "active";
	else if(!navigator.javaEnabled || (navigator.javaEnabled() == false))
	  javaok ="deactivated";
	else
	  javaok = "unsupported request";

	document.write("<table border='0' width='100%' summary='Get possible browser information'>");
	document.write("<tr><th id='header1' class='thheader'>Abfrage<\/th><th id='header2' class='thheader'>Antwort<\/th><\/tr>");
	document.write("<tr><td class='header1' class='tblblankname'>Browser name<\/td><td class='header2' class='tblblankname'>" + browser + "<\/td><\/tr>");
	document.write("<tr><td class='header1' class='tblinename'>HTTP-Identifikation<\/td><td headers='header2' class='tblinename'>" + httpid + "<\/td><\/tr>");
	document.write("<tr><td class='header1' class='tblblankname'>Cookies<\/td><td headers='header2' class='tblblankname'>" + cookiesok + "<\/td><\/tr>");
	document.write("<tr><td class='header1' class='tblinename'>Javascript<\/td><td headers='header2' class='tblinename'>active<\/td><\/tr>");
	document.write("<tr><td class='header1' class='tblblankname'>Java<\/td><td headers='header2' class='tblblankname'>" + javaok + "<\/td><\/tr>");
	document.write("<tr><td class='header1' class='tblinename'>OS platform<\/td><td headers='header2' class='tblinename'>" + os + "<\/td><\/tr>");
	document.write("<tr><td class='header1' class='tblblankname'>Language<\/td><td headers='header2' class='tblblankname'>" + sprache + "<\/td><\/tr>");
	document.write("<tr><td class='header1' class='tblinename'>screen width<\/td><td headers='header2' class='tblinename'>" + breite + " Pixel<\/td><\/tr>");
	document.write("<tr><td class='header1' class='tblblankname'>screen height<\/td><td headers='header2' class='tblblankname'>" + hoehe + " Pixel<\/td><\/tr>");
	document.write("<tr><td class='header1' class='tblinename'>Color depth<\/td><td headers='header2' class='tblinename'>" + farbe + " Bit<\/td><\/tr>");
	document.write("<\/table>");
}


  function pluginabfrage()
  {
       document.writeln("<table border='0' width='100%' summary='Browser Plug scan'>");
         document.writeln("<tr><th id='header1' class='thheader'>Plugin<\/th><th id='header2' class='thheader'>Beschreibung<\/th><\/tr>");
         for(var i=0; i<navigator.plugins.length; i++)
         {
           document.writeln("<tr>");
           if(i == 0) {
             document.writeln("<td class='header1' class='tblblankname'>" + navigator.plugins[i].name + "<\/td>");
		         if(navigator.plugins[i].name == "nppdf.so")
               document.writeln("<td headers='header2' class='tblblankname'>Adobe Acrobat Reader Plug-in<\/td>");
		         else
               document.writeln("<td headers='header2' class='tblblankname'>" + navigator.plugins[i].description + "<\/td>");
               document.writeln("<\/tr>");
           }
           if(i == 1) {
             document.writeln("<td class='header1' class='tblinename'>" + navigator.plugins[i].name + "<\/td>");
		         if(navigator.plugins[i].name == "nppdf.so")
               document.writeln("<td headers='header2' class='tblinename'>Adobe Acrobat Reader Plug-in<\/td>");
		         else
               document.writeln("<td headers='header2' class='tblinename'>" + navigator.plugins[i].description + "<\/td>");
               document.writeln("<\/tr>");
           }
           if(i == 2) {
             document.writeln("<td class='header1' class='tblblankname'>" + navigator.plugins[i].name + "<\/td>");
		         if(navigator.plugins[i].name == "nppdf.so")
               document.writeln("<td headers='header2' class='tblblankname'>Adobe Acrobat Reader Plug-in<\/td>");
		         else
               document.writeln("<td headers='header2' class='tblblankname'>" + navigator.plugins[i].description + "<\/td>");
               document.writeln("<\/tr>");
           }
           if(i == 3) {
             document.writeln("<td class='header1' class='tblinename'>" + navigator.plugins[i].name + "<\/td>");
		         if(navigator.plugins[i].name == "nppdf.so")
               document.writeln("<td headers='header2' class='tblinename'>Adobe Acrobat Reader Plug-in<\/td>");
		         else
               document.writeln("<td headers='header2' class='tblinename'>" + navigator.plugins[i].description + "<\/td>");
               document.writeln("<\/tr>");
           }
           if(i == 4) {
             document.writeln("<td class='header1' class='tblblankname'>" + navigator.plugins[i].name + "<\/td>");
		         if(navigator.plugins[i].name == "nppdf.so")
               document.writeln("<td headers='header2' class='tblblankname'>Adobe Acrobat Reader Plug-in<\/td>");
		         else
               document.writeln("<td headers='header2' class='tblblankname'>" + navigator.plugins[i].description + "<\/td>");
               document.writeln("<\/tr>");
           }
           if(i == 5) {
             document.writeln("<td class='header1' class='tblinename'>" + navigator.plugins[i].name + "<\/td>");
		         if(navigator.plugins[i].name == "nppdf.so")
               document.writeln("<td headers='header2' class='tblinename'>Adobe Acrobat Reader Plug-in<\/td>");
		         else
               document.writeln("<td headers='header2' class='tblinename'>" + navigator.plugins[i].description + "<\/td>");
               document.writeln("<\/tr>");
           }
           if(i == 6) {
             document.writeln("<td class='header1' class='tblblankname'>" + navigator.plugins[i].name + "<\/td>");
		         if(navigator.plugins[i].name == "nppdf.so")
               document.writeln("<td headers='header2' class='tblblankname'>Adobe Acrobat Reader Plug-in<\/td>");
		         else
               document.writeln("<td headers='header2' class='tblblankname'>" + navigator.plugins[i].description + "<\/td>");
               document.writeln("<\/tr>");
           }
           if(i == 7) {
             document.writeln("<td class='header1' class='tblinename'>" + navigator.plugins[i].name + "<\/td>");
		         if(navigator.plugins[i].name == "nppdf.so")
               document.writeln("<td headers='header2' class='tblinename'>Adobe Acrobat Reader Plug-in<\/td>");
		         else
               document.writeln("<td headers='header2' class='tblinename'>" + navigator.plugins[i].description + "<\/td>");
               document.writeln("<\/tr>");
           }        
           if(i == 8) {
             document.writeln("<td class='header1' class='tblblankname'>" + navigator.plugins[i].name + "<\/td>");
		         if(navigator.plugins[i].name == "nppdf.so")
               document.writeln("<td headers='header2' class='tblblankname'>Adobe Acrobat Reader Plug-in<\/td>");
		         else
               document.writeln("<td headers='header2' class='tblblankname'>" + navigator.plugins[i].description + "<\/td>");
               document.writeln("<\/tr>");
           }
           if(i == 9) {
             document.writeln("<td class='header1' class='tblinename'>" + navigator.plugins[i].name + "<\/td>");
		         if(navigator.plugins[i].name == "nppdf.so")
               document.writeln("<td headers='header2' class='tblinename'>Adobe Acrobat Reader Plug-in<\/td>");
		         else
               document.writeln("<td headers='header2' class='tblinename'>" + navigator.plugins[i].description + "<\/td>");
               document.writeln("<\/tr>");
           }   
           if(i == 10) {
             document.writeln("<td class='header1' class='tblblankname'>" + navigator.plugins[i].name + "<\/td>");
		         if(navigator.plugins[i].name == "nppdf.so")
               document.writeln("<td headers='header2' class='tblblankname'>Adobe Acrobat Reader Plug-in<\/td>");
		         else
               document.writeln("<td headers='header2' class='tblblankname'>" + navigator.plugins[i].description + "<\/td>");
               document.writeln("<\/tr>");
           }
           if(i == 11) {
             document.writeln("<td class='header1' class='tblinename'>" + navigator.plugins[i].name + "<\/td>");
		         if(navigator.plugins[i].name == "nppdf.so")
               document.writeln("<td headers='header2' class='tblinename'>Adobe Acrobat Reader Plug-in<\/td>");
		         else
               document.writeln("<td headers='header2' class='tblinename'>" + navigator.plugins[i].description + "<\/td>");
               document.writeln("<\/tr>");
           }
           if(i == 12) {
             document.writeln("<td class='header1' class='tblblankname'>" + navigator.plugins[i].name + "<\/td>");
		         if(navigator.plugins[i].name == "nppdf.so")
               document.writeln("<td headers='header2' class='tblblankname'>Adobe Acrobat Reader Plug-in<\/td>");
		         else
               document.writeln("<td headers='header2' class='tblblankname'>" + navigator.plugins[i].description + "<\/td>");
               document.writeln("<\/tr>");
           }
           if(i == 13) {
             document.writeln("<td class='header1' class='tblinename'>" + navigator.plugins[i].name + "<\/td>");
		         if(navigator.plugins[i].name == "nppdf.so")
               document.writeln("<td headers='header2' class='tblinename'>Adobe Acrobat Reader Plug-in<\/td>");
		         else
               document.writeln("<td headers='header2' class='tblinename'>" + navigator.plugins[i].description + "<\/td>");
               document.writeln("<\/tr>");
           }   
           if(i == 14) {
             document.writeln("<td class='header1' class='tblblankname'>" + navigator.plugins[i].name + "<\/td>");
		         if(navigator.plugins[i].name == "nppdf.so")
               document.writeln("<td headers='header2' class='tblblankname'>Adobe Acrobat Reader Plug-in<\/td>");
		         else
               document.writeln("<td headers='header2' class='tblblankname'>" + navigator.plugins[i].description + "<\/td>");
               document.writeln("<\/tr>");
           }
           if(i == 15) {
             document.writeln("<td class='header1' class='tblinename'>" + navigator.plugins[i].name + "<\/td>");
		         if(navigator.plugins[i].name == "nppdf.so")
               document.writeln("<td headers='header2' class='tblinename'>Adobe Acrobat Reader Plug-in<\/td>");
		         else
               document.writeln("<td headers='header2' class='tblinename'>" + navigator.plugins[i].description + "<\/td>");
               document.writeln("<\/tr>");
           }
           if(i == 16) {
             document.writeln("<td class='header1' class='tblblankname'>" + navigator.plugins[i].name + "<\/td>");
		         if(navigator.plugins[i].name == "nppdf.so")
               document.writeln("<td headers='header2' class='tblblankname'>Adobe Acrobat Reader Plug-in<\/td>");
		         else
               document.writeln("<td headers='header2' class='tblblankname'>" + navigator.plugins[i].description + "<\/td>");
               document.writeln("<\/tr>");
           }
           if(i == 17) {
             document.writeln("<td class='header1' class='tblinename'>" + navigator.plugins[i].name + "<\/td>");
		         if(navigator.plugins[i].name == "nppdf.so")
               document.writeln("<td headers='header2' class='tblinename'>Adobe Acrobat Reader Plug-in<\/td>");
		         else
               document.writeln("<td headers='header2' class='tblinename'>" + navigator.plugins[i].description + "<\/td>");
               document.writeln("<\/tr>");
           }
           if(i == 18) {
             document.writeln("<td class='header1' class='tblblankname'>" + navigator.plugins[i].name + "<\/td>");
		         if(navigator.plugins[i].name == "nppdf.so")
               document.writeln("<td headers='header2' class='tblblankname'>Adobe Acrobat Reader Plug-in<\/td>");
		         else
               document.writeln("<td headers='header2' class='tblblankname'>" + navigator.plugins[i].description + "<\/td>");
               document.writeln("<\/tr>");
           }
           if(i == 19) {
             document.writeln("<td class='header1' class='tblinename'>" + navigator.plugins[i].name + "<\/td>");
		         if(navigator.plugins[i].name == "nppdf.so")
               document.writeln("<td headers='header2' class='tblinename'>Adobe Acrobat Reader Plug-in<\/td>");
		         else
               document.writeln("<td headers='header2' class='tblinename'>" + navigator.plugins[i].description + "<\/td>");
               document.writeln("<\/tr>");
           }
         }
		if(i == 0)
		{
		   document.writeln("<tr>");
           document.writeln("<td class='header1' class='tblblankname'>MediaPlayer<\/td>");
		   document.writeln("<td headers='header2' class='tblblankname'>");
		   if(detectActiveXControl('MediaPlayer.MediaPlayer.1'))
		      document.writeln("Microsoft MediaPlayer Plugin existing");
		   else
		      document.writeln("- - -");
		   document.writeln("<\/td>");
		   document.writeln("<\/tr>");       
		   document.writeln("<tr>");
       document.writeln("<td class='header1' class='tblinename'>Silverlight<\/td>");
		   document.writeln("<td headers='header2' class='tblinename'>");
		   if(detectActiveXControl('AgControl.AgControl'))
		      document.writeln("Microsoft Silverlight existing");
		   else
		      document.writeln("- - -");
		   document.writeln("<\/td>");
		   document.writeln("<\/tr>");
		   document.writeln("<tr>");
           document.writeln("<td class='header1' class='tblblankname'>WUWebControl class<\/td>");
		   document.writeln("<td headers='header2' class='tblblankname'>");
		   if(detectActiveXControl('SoftwareDistribution.WebControl.1'))
		      document.writeln("Windows Update Web Control existing");
		   else
		      document.writeln("- - -");
		   document.writeln("<\/td>");
		   document.writeln("<\/tr>");
		   document.writeln("<tr>");
           document.writeln("<td class='header1' class='tblblankname'>MUWebControl class<\/td>");
		   document.writeln("<td headers='header2' class='tblblankname'>");
		   if(detectActiveXControl('SoftwareDistribution.MicrosoftUpdateWebControl'))
		      document.writeln("Microsoft Update Web Control existing");
		   else
		      document.writeln("- - -");
		   document.writeln("<\/td>");
		   document.writeln("<\/tr>");       
		   document.writeln("<tr>");
       document.writeln("<td class='header1' class='tblinename'>XML DOM Document<\/td>");
		   document.writeln("<td headers='header2' class='tblinename'>");
		   if(detectActiveXControl('Microsoft.FreeThreadedXMLDOM.1.0'))
		      document.writeln("Microsoft Free Threaded XML DOM Document existing");
		   else
		      document.writeln("- - -");
		   document.writeln("<\/td>");
		   document.writeln("<\/tr>");
		   document.writeln("<tr>");
       document.writeln("<td class='header1' class='tblblankname'>XML HTTP<\/td>");
		   document.writeln("<td headers='header2' class='tblblankname'>");
		   if(detectActiveXControl('Microsoft.XMLHTTP.1.0'))
		      document.writeln("Microsoft XML HTTP existing");
		   else
		      document.writeln("- - -");
		   document.writeln("<\/td>");
		   document.writeln("<\/tr>");
		   document.writeln("<tr>");
       document.writeln("<td class='header1' class='tblinename'>XML Schema Cache<\/td>");
		   document.writeln("<td headers='header2' class='tblinename'>");
		   if(detectActiveXControl('Msxml2.XMLSchemaCache.3.0'))
		      document.writeln("Microsoft XML Schema Cache existing");
		   else
		      document.writeln("- - -");
		   document.writeln("<\/td>");
		   document.writeln("<\/tr>");
		   document.writeln("<tr>");
       document.writeln("<td class='header1' class='tblblankname'>XML Data Source Object<\/td>");
		   document.writeln("<td headers='header2' class='tblblankname'>");
		   if(detectActiveXControl('Microsoft.XMLDSO.1.0'))
		      document.writeln("Microsoft XML Data Source Object existing");
		   else
		      document.writeln("- - -");
		   document.writeln("<\/td>");
		   document.writeln("<\/tr>");
		   document.writeln("<tr>");
       document.writeln("<td class='header1' class='tblinename'>XSL Template<\/td>");
		   document.writeln("<td headers='header2' class='tblinename'>");
		   if(detectActiveXControl('Msxml2.XSLTemplate.3.0'))
		      document.writeln("Microsoft XSL Template existing");
		   else
		      document.writeln("- - -");
		   document.writeln("<\/td>");
		   document.writeln("<\/tr>");
		   document.writeln("<tr>");
       document.writeln("<td class='header1' class='tblblankname'>ieframe.dll<\/td>");
		   document.writeln("<td headers='header2' class='tblblankname'>");
		   if(detectActiveXControl('Shell.UIHelper.1'))
		      document.writeln("Microsoft Shell UI Helper existing");
		   else
		      document.writeln("- - -");
		   document.writeln("<\/td>");
		   document.writeln("<\/tr>");
		   document.writeln("<tr>");
       document.writeln("<td class='header1' class='tblinename'>tdc.ocx control<\/td>");
		   document.writeln("<td headers='header2' class='tblinename'>");
		   if(detectActiveXControl('TDCCtl.TDCCtl.1'))
		      document.writeln("Microsoft Tabular Data Control ActiveX existing");
		   else
		      document.writeln("- - -");
		   document.writeln("<\/td>");
		   document.writeln("<\/tr>");
		   document.writeln("<tr>");		   
           document.writeln("<td class='header1' class='tblblankname'>RMGetLicense class<\/td>");
		   document.writeln("<td headers='header2' class='tblblankname'>");
		   if(detectActiveXControl('DRM.GetLicense.1'))
		      document.writeln("Microsoft DRM ActiveX Network Object existing");
		   else
		      document.writeln("- - -");
		   document.writeln("<\/td>");
		   document.writeln("<\/tr>");		   

		   document.writeln("<tr>");
           document.writeln("<td class='header1' class='tblinename'>Adobe PDF Reader<\/td>");
		   document.writeln("<td headers='header2' class='tblinename'>");
		   if(detectActiveXControl('PDF.PdfCtrl.4'))
		      document.writeln("Adobe Systems Inc. Adobe PDF Reader existing");
		   else if(detectActiveXControl('PDF.PdfCtrl.5'))
		      document.writeln("Adobe Systems Inc. Adobe PDF Reader existing");
		   else if(detectActiveXControl('PDF.PdfCtrl.6'))
		      document.writeln("Adobe Systems Inc. Adobe PDF Reader existing");
		   else if(detectActiveXControl('AcroPDF.PDF.1'))
		      document.writeln("Adobe Systems Inc. Adobe PDF Reader existing");
		   else
		      document.writeln("- - -");
		   document.writeln("<\/td>");
		   document.writeln("<\/tr>");
		   document.writeln("<tr>");
           document.writeln("<td class='header1' class='tblblankname'>Adobe SVG-Viewer<\/td>");
		   document.writeln("<td headers='header2' class='tblblankname'>");
		   if(detectActiveXControl('Adobe.SVGCtl'))
		      document.writeln("Acrobat SVG-Viewer Plugin existing");
		   else
		      document.writeln("- - -");
		   document.writeln("<\/td>");
		   document.writeln("<\/tr>");
		   
		   document.writeln("<tr>");
           document.writeln("<td class='header1' class='tblinename'>QuickTime<\/td>");
		   document.writeln("<td headers='header2' class='tblinename'>");
		   if(detectActiveXControl('QuickTimeCheckObject.QuickTimeCheck.1'))
		      document.writeln("Apple Inc. QuickTime Plugin existing");
		   else
		      document.writeln("- - -");
		   document.writeln("<\/td>");
		   document.writeln("<\/tr>");
		   document.writeln("<tr>");		   
           document.writeln("<td class='header1' class='tblblankname'>iTunesDetector class<\/td>");
		   document.writeln("<td headers='header2' class='tblblankname'>");
		   if(detectActiveXControl('ITDetector.iTunesDetector'))
		      document.writeln("Apple Inc. ITDetector Module existing");
		   else
		      document.writeln("- - -");
		   document.writeln("<\/td>");
		   document.writeln("<\/tr>");

		   document.writeln("<tr>");
           document.writeln("<td class='header1' class='tblinename'>Sun Java Konsole<\/td>");
		   document.writeln("<td headers='header2' class='tblinename'>");
		   if(detectActiveXControl('JavaPlugin'))
		      document.writeln("Sun Java Console existing");
		   else
		      document.writeln("- - -");
		   document.writeln("<\/td>");
		   document.writeln("<\/tr>");

		   document.writeln("<tr>");
           document.writeln("<td class='header1' class='tblblankname'>Shockwave Director<\/td>");
		   document.writeln("<td headers='header2' class='tblblankname'>");
		   if(detectActiveXControl('SWCtl.SWCtl'))
		      document.writeln("Shockwave Director Plugin existing");
		   else
		      document.writeln("- - -");
		   document.writeln("<\/td>");
		   document.writeln("<\/tr>");
		   
       document.writeln("<tr>");
           document.writeln("<td class='header1' class='tblinename'>Shockwave Flash Object<\/td>");
		   document.writeln("<td headers='header2' class='tblinename'>");
		   if(detectActiveXControl('ShockwaveFlash.ShockwaveFlash.1'))
		      document.writeln("Shockwave Flash Plugin existing");
		   else
		      document.writeln("- - -");
		   document.writeln("<\/td>");
		   document.writeln("<\/tr>");

		   document.writeln("<tr>");
           document.writeln("<td class='header1' class='tblblankname'>Real Player<\/td>");
		   document.writeln("<td headers='header2' class='tblblankname'>");
		   if(detectActiveXControl('rmocx.RealPlayer G2 Control'))
		      document.writeln("Real Player Plugin existing");
		   else
		      document.writeln("- - -");
		   document.writeln("<\/td>");
		   document.writeln("<\/tr>");
		   
		   document.writeln("<tr>");
           document.writeln("<td class='header1' class='tblinename'>MathPlayer<\/td>");
		   document.writeln("<td headers='header2' class='tblinename'>");
		   if(detectActiveXControl('MathPlayer.Behavior.1'))
		      document.writeln("MathPlayer Plugin existing");
		   else
		      document.writeln("- - -");
		   document.writeln("<\/td>");
		   document.writeln("<\/tr>");
       		   
		}
        document.writeln("<\/table>");
  }
  
  
  
var nVer = navigator.appVersion;
var nAgt = navigator.userAgent;
var browserName  = navigator.appName;
var fullVersion  = ''+parseFloat(navigator.appVersion); 
var majorVersion = parseInt(navigator.appVersion,10);
var nameOffset,verOffset,ix;

// In Opera, the true version is after "Opera" or after "Version"
if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
 browserName = "Opera";
 fullVersion = nAgt.substring(verOffset+6);
 if ((verOffset=nAgt.indexOf("Version"))!=-1) 
   fullVersion = nAgt.substring(verOffset+8);
}
// In MSIE, the true version is after "MSIE" in userAgent
else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
 browserName = "Microsoft Internet Explorer";
 fullVersion = nAgt.substring(verOffset+5);
}
// In Chrome, the true version is after "Chrome" 
else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
 browserName = "Google Chrome";
 fullVersion = nAgt.substring(verOffset+7);
}
// In Safari, the true version is after "Safari" or after "Version" 
else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
 browserName = "Safari";
 fullVersion = nAgt.substring(verOffset+7);
 if ((verOffset=nAgt.indexOf("Version"))!=-1) 
   fullVersion = nAgt.substring(verOffset+8);
}
// In Firefox, the true version is after "Firefox" 
else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
 browserName = "Mozilla Firefox";
 fullVersion = nAgt.substring(verOffset+8);
}
// In most other browsers, "name/version" is at the end of userAgent 
else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < (verOffset=nAgt.lastIndexOf('/')) ) 
{
 browserName = nAgt.substring(nameOffset,verOffset);
 fullVersion = nAgt.substring(verOffset+1);
 if (browserName.toLowerCase()==browserName.toUpperCase()) {
  browserName = navigator.appName;
 }
}
// trim the fullVersion string at semicolon/space if present
if ((ix=fullVersion.indexOf(';'))!=-1) fullVersion=fullVersion.substring(0,ix);
if ((ix=fullVersion.indexOf(' '))!=-1) fullVersion=fullVersion.substring(0,ix);

majorVersion = parseInt(''+fullVersion,10);
if (isNaN(majorVersion)) {
 fullVersion  = ''+parseFloat(navigator.appVersion); 
 majorVersion = parseInt(navigator.appVersion,10);
}


function basicBrowserInfo(){
	document.write(browserName+' Version '+fullVersion);
}