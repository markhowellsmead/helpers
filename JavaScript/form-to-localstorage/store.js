var frp_offlineapp = function(){

	'use strict';
	
	this.storeFormValues = function(wrapper){
		var data = Array();
		$('div.person',$(wrapper)).each(function(){
			var $form = $('form',$(this));
			data.push($form.serializeArray());
		})
		localStorage.setItem('form-to-localstorage', JSON.stringify(data));
		$('#code').html(localStorage.getItem('form-to-localstorage'));
		
	};//storeFormValues
	
};//frp_offlineapp
	
//////////////////////////////////////////////////
	
var app = new frp_offlineapp();

$('div.people').bind('keyup',function(e){
	app.storeFormValues(this);
});