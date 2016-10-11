/*
Erweiterung für jQuery-Objekte um in $-Objekt als Warnmelder
einzublenden und nach fünf Sekunden wieder automatisch auszublenden.
Alles in einer Aufruf.

frappant.ch / mhm

zB
	$('#myMessageDiv').data('defaultClass','default');
	$('#zweitesElement').click(function(){
		$('#myMessageDiv').showMessage('Was machst du da?,'error');
	});
*/

(function($){
	$.extend($.fn, {
		showMessage: function(message,mode){
			this.attr('class',this.data('defaultClass'));
			this.html('');
			if(message){
				if(!mode){mode='hint';}
				mode='error';
				this.addClass(mode).html(message);
				this.comeIn('fast').delay(5000).goOut('slow');
			}
		},
		comeIn: function(speed){
			this.slideDown(speed);
			return this;
			
		},
		goOut: function(speed){
			this.slideUp(speed,function(){
				$(this).html('');
				$(this).attr('class',$(this).data('defaultClass'));
			});
			return this;
		}
	})
})(jQuery);