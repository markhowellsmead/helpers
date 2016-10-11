(function($){

	$("document").ready(function(){
		$(".keys a").click(function(e){
			e.preventDefault();
			$.ajax({
				url: this.href,
				dataType: 'json',
				complete: function(xhr){
					if(xhr.responseText!==""){
						if(xhr.responseJSON && xhr.responseJSON.message){
							$('.message').empty().attr('class', 'message').html('<h3>' +xhr.responseJSON.extension_key+ '</h3>' + xhr.responseJSON.message).attr('class','message status'+xhr.responseJSON.status);
						}else{
							$('.message').html(xhr.responseText).attr('class','message status500').show();
						}
					}
				}
			});
		});
	});

})(jQuery);