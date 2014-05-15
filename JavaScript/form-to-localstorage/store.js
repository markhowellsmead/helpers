$('div.people').bind('keyup',function(e){
	data = Array();
	$('div.person',$(this)).each(function(){
		$form = $('form',$(this));
		data.push($form.serializeArray());
	})
	localStorage.setItem('form-to-localstorage', JSON.stringify(data));
	$('#code').html(localStorage.getItem('form-to-localstorage'));
});