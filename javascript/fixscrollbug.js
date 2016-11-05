//	if iPhone, scroll page down 1px to a) hide addressbar and b) force fixed toolbars to be fixed
//	mhm 03/2013
d=document;w=window;if (d.readyState === "complete"){__fSB();}else if(d.addEventListener){d.addEventListener("DOMContentLoaded",__fSB,false);w.addEventListener("load",__fSB,false);}else if(w.attachEvent){d.attachEvent("onreadystatechange", __fSB);w.attachEvent("onLoad",__fSB);}else{setTimeout(__fSB,2000);}
function __fSB(){/iPhone|iPad/.test(navigator.userAgent) && !location.hash && setTimeout(function(){if(!pageYOffset) w.scrollTo(0,1);},100);};