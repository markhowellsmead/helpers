d=document;w=window;h=location.hash;if(d.readyState==="complete"){__fSB();}else if(d.addEventListener){d.addEventListener("DOMContentLoaded",__fSB,false);w.addEventListener("load",__fSB,false);}else if(w.attachEvent){d.attachEvent("onreadystatechange",__fSB);w.attachEvent("onLoad",__fSB);}else{setTimeout(__fSB,500);}
function __fSB(){/iPhone|iPad/.test(navigator.userAgent)&&(h==null||h==undefined||h=='')&&setTimeout(function(){if(!pageYOffset)w.scrollTo(0,1)},500);};

$('nav.menu ul').addClass('closed');
$('nav .toggler').click(function(e){
	e.preventDefault();
	$('nav ul').toggleClass('closed');
});