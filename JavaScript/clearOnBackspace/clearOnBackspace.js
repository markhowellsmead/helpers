/**
* Binds key event to a form field, which clears the value after X seconds.
* DOES NOT WORK CORRECTLY YET
* This currently works in desktop browsers but not mobile Safari,
* which is where it would be most useful.
*
* @author	mhm
* @since 	10.12.14
*
*/

var XSeconds = 1;

// function
var clearOnBackspace = function(){
	$(this).bind('keydown', function(e){
		if(e.keyCode === 8){
			var field = $(this);
			if (!downTimer) {
				downTimer = setInterval(function() {
					field.val('');
					clearInterval(downTimer);
					downTimer = null;
				}, XSeconds*1000);
			}
		}else{
			if (downTimer) {
				clearInterval(downTimer);
				downTimer = null;
			}
		}
	}).bind('keyup', function(){
		if (downTimer) {
			clearInterval(downTimer);
			downTimer = null;
			lastKey = 0;
		}
	});
};

// bind to field
clearOnBackspace.call($('input', $(this)));