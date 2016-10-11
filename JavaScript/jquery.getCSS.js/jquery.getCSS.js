/*
	frp_getCSS | frappant.ch | mhm | 11.9.2013
	Get all CSS attributes from a jQuery-referenced element
	H/T http://stackoverflow.com/users/342275/marknadal
	
	Usage:
	var theCSS = $('.element').getCSS();
	
*/

(function($){

	$.fn.extend({
		getCSS:function(){
			this.each(function(){
			
				//regexp = new RegExp(/(background-size:\s(cover))/)
				regexp = new RegExp(/background-size:( ?)(cover|contain|[0-9]+px(\s)?([0-9]+px)?)/)
			
				if(CSSUtilities.getCSSRules(this)[0].css){
					found = CSSUtilities.getCSSRules(this)[0].css.match(regexp);
					if(found){
						document.write('"'+$(this).text()+'": '+found[2]+'<br>');
					}
					/*
				
					compared = CSSUtilities.getCSSRules(this)[0].css.match(/(background-size)[: ?]/g);
					if(compared.indexOf('background-size')>=0){
						document.write(CSSUtilities.getCSSRules(this)[0].css+'<br>');
					}*/
				}

			});
			return this;
		},//getCSS
	
		getCSS2json:function(css){
		    var s = {};
		    if(!css) return s;
		    if(css instanceof CSSStyleDeclaration) {
		        for(var i in css) {
		            if((css[i]).toLowerCase) {
		                s[(css[i]).toLowerCase()] = (css[css[i]]);
		            }
		        }
		    } 
		    else if(typeof css == "string") {
		        css = css.split("; ");          
		        for (var i in css) {
		            var l = css[i].split(": ");
		            s[l[0].toLowerCase()] = (l[1]);
		        };
		    }
		    return s;
		},//getCSS2json
		
		setBackgroundSize:function(){
			css = this.getCSS();
		}//setBackgroundSize
		
		
	});

})(jQuery);


function css(a){
    var o = {};
    var rules = window.getMatchedCSSRules(a.get(0));
    for(var r in rules) {
        o = $.extend(o, css2json(rules[r].style), css2json(a.attr('style')));
    }
    return o;
}
function css2json(css){
    var s = {};
    if(!css) return s;
    if(css instanceof CSSStyleDeclaration) {
        for(var i in css) {
            if((css[i]).toLowerCase) {
                s[(css[i]).toLowerCase()] = (css[css[i]]);
            }
        }
    } 
    else if(typeof css == "string") {
        css = css.split("; ");          
        for (var i in css) {
            var l = css[i].split(": ");
            s[l[0].toLowerCase()] = (l[1]);
        };
    }
    return s;
}