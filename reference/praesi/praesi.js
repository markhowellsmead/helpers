(function($){

	$.extend($.fn, {

		get_hostname: function(){
			var url = $(this).attr('href');
			if(url){
				url=url.toString();
				if(url.indexOf('http://')!==0 && url.indexOf('https://')!==0 && url.indexOf('//')!==0){
					return false;
				}else{
					return url.replace('http://','').replace('https://','').replace('//','').split(/[/?#]/)[0];
				}
			}
		},

		setAsExternalLink: function(){
			$(this).each(function(link){
				var $link = $(this);
				var hostname = $link.get_hostname();
				if(
					hostname
					&&(hostname.indexOf(self.location.hostname)<0)
					&&(hostname.indexOf(self.location.hostname.replace('www.',''))<0) // same domain without www
					&&(hostname!="")
					&&(hostname!=null)
					&&((hostname.hash=='')||(hostname.hash==null))
					&&(hostname.indexOf('javascript:')<0)
					&&(hostname.indexOf('mailto:')<0)
					&&(!$link.attr('target') || $link.attr('target')=="")
					&&(!$link.hasClass('fancybox'))
					&&(!$link.hasClass('toggle'))
				){
					this.target="_blank";
					if(this.title==""&&this.title!==null&&this.className.indexOf("tooltip")<0){this.title=this.hostname;}
				}
			});
			return this;
		}
	});

})(jQuery);
		
var currentSlide = 0;
var nSlides = 0;

var hideAll = function(){
	$('.slide').removeClass('act');
}

var showNext = function(){
	if(currentSlide==(nSlides-1)){
		return;
	}else{
		hideAll();
		currentSlide++;
		$('#slide'+currentSlide).addClass('act');
		sessionStorage.setItem('currentSlide',currentSlide);
		$('a').setAsExternalLink();
	}
}
var showPrevious = function(){
	if(currentSlide==0){
		return;
	}else{
		hideAll();
		currentSlide--;
		$('#slide'+currentSlide).addClass('act');
		sessionStorage.setItem('currentSlide',currentSlide);
		$('a').setAsExternalLink();
	}
}


$(document).ready(function(){

	nSlides = $('.slide').length;
	
	if((currentSlide = sessionStorage.getItem('currentSlide')) && $('#slide'+currentSlide).length){
		$('#slide'+currentSlide).addClass('act');
	}else{
		$('.slide:first').addClass('act');
	}

	$('a').setAsExternalLink();

	$(window).on('keydown', function(e){
		switch(e.keyCode){
			case 37: // prev
				showPrevious();
				break;
			case 39: // next
				showNext();
				break;
		}
	});
	
});
