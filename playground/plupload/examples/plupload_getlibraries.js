(function($){
	$(document).ready(function(){
		!function(e,t,r){function n(){for(;d[0]&&'loaded'==d[0][f];)c=d.shift(),c[o]=!i.parentNode.insertBefore(c,i)}for(var s,a,c,d=[],i=e.scripts[0],o='onreadystatechange',f='readyState';s=r.shift();)a=e.createElement(t),'async'in i?(a.async=!1,e.head.appendChild(a)):i[f]?(d.push(a),a[o]=n):e.write('<'+t+' src="'+s+'" defer></'+t+'>'),a.src=s}(document,'script',[
			'../js/plupload.full.min.js',
			'../js/i18n/de.js',
			'./plupload.class.min.js',
			'./plupload.init.min.js'
		]);
	});
})(jQuery);