$(function() {
	$('button.data').click(function(e){
		$button = $(this);
		mailtext = '';
		$('div.data').find('table').each(function(){
			mailtext+='<table>'+$(this).html()+'</table>';
		});
		var jqxhr = $.post('mail.php', { content:mailtext })
			.done(function() { $button.replaceWith('<p class="success">Daten wurden übermittelt. Danke!</p>') });
	});
});