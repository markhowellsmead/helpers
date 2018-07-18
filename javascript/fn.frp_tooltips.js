/*
	frappant.ch / mhm
	dependency: jquery.js
	v1.1 / 14.3.2013	clean code and improve object referencing
	v1.0 / 14.4.2011	initial version

	usage: $('a.tooltip').frp_tooltip();

*/

(function($){
	$.extend($.fn, {

    frp_tooltip: function(options) {
	    var tooltip;
    	if(!tooltip){
    		//	create basic tooltip object
    		var tooltip=$('<span class="tooltip"></span>');
	    	tooltip_content=$('<span class="content"/>');
	    	tooltip.append(tooltip_content);
    		$('body').append(tooltip);
	    	tooltip.hide();
    	}
    	return $.each(this,function(index){
    		$this=$(this);
    		$parent=$this.parent();
    		$parentOffset=$parent.offset();

    		//	speichert die koordinaten des links (X x Y) im data objekt des links ab
    		$this.data('anchorpoint_left',$parentOffset.left+($parent.width()/2)+'px');
    		$this.data('anchorpoint_top',$parentOffset.top+($this.height()*1.25)+'px');

    		//	neues fenster aufmachen
    		$this.attr('target','_blank');

			//	tooltip anbinden
    		$this.bind({
    			mouseover:	function(){$this.showFillTooltip(tooltip,tooltip_content);return true},
    			mouseout:	function(){$this.hideTooltip(tooltip);return true}
    		});
    	});
    	return this;
    },

    showFillTooltip: function(tooltip,tooltip_content){
	    active_object=$(this);
	    tooltip=$(tooltip);
    	tooltip.css({
    		top:	active_object.data('anchorpoint_top'),
    		left:	active_object.data('anchorpoint_left')
    	});
		$(tooltip_content).text(active_object.text());
    	tooltip.show();
    	return this;
    },


    hideTooltip: function(tooltip,tooltip_content){
    	//	leeren und ausblenden
		$(tooltip_content).text('');
    	$(tooltip).hide();
    	return this;
    };

})(jQuery);