/*
	interactive menu which adapts itself automatically
	for mobile views. based on core files available from
	http://mmenu.frebsite.nl/ and customized slightly in this
	file to ensure that the menu resets itself when the
	window size is enlarged back to desktop size
	
	See http://mmenu.frebsite.nl/ for setup and options
	of the core function $.mmenu. This version by mhm 6.11.2013.
*/
	

(function($){

	//////////////////////////////////////////////////

	function startMmenu(menuID) {
		menuIDNoHash = menuID.replace('#','');
		var e = window.innerWidth;
		e <= frp_menu_maxmobile && !$("#mm-subnav").length && $(menuID).mmenu({
			slidingSubmenus: false
		},{
			selectedClass: 'act',
			clone: !0,
			preventTabbing: !0,
			hardwareAcceleration: !0,
			onClick: {
				close: !0,
				delayPageload: !0,
				blockUI: !1
			}
		});
		e > frp_menu_maxmobile && $('#mm-'+menuIDNoHash).trigger('close');
	
	}//startMmenu
		
	//////////////////////////////////////////////////
		
	function startMasonry(e, t){
		var n, wiw = window.innerWidth;
		if (wiw > frp_menu_maxmobile) {
			n = $(e);
			n.isotope({
				// update columnWidth to a percentage of container width
				masonry: { columnWidth: n.width() / 7 }
			});
		}// else n !== undefined && n.masonry("destroy")
	}

	//////////////////////////////////////////////////

	//document.body.addEventlistener('touchstart',function(){},false);

	frp_menu_id = '#mainmenu';
	frp_menu_firstlevel = $(frp_menu_id+'>ul>li');

    $(frp_menu_id+'>ul>li').bind('touchstart touchend',function(e){
	    //e.preventDefault();
        $(this).toggleClass('hover_effect');
    });
	frp_menu_maxmobile = 768;
	frp_menu_do=function(){
		startMmenu(frp_menu_id);
	}
	$(window).ready(frp_menu_do).resize(frp_menu_do);

	//////////////////////////////////////////////////

})(jQuery);