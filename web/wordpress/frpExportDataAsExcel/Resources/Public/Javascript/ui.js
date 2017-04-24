(function($) {

	function exportExcel() {

		var selected = $("input[name='content']:checked");
		var value = selected.val();
		var data = {
			action : 'actionExportExcel',
			datatype : value
		};

		$.post(ajaxurl, data, function(response) {

			downloadUrl(response);
		});
	}

	var $idown;

	function downloadUrl(url) {
		if ($idown) {

			$idown.attr('src', url);
		} else {

			$idown = $('<iframe>', {
				id : 'idown',
				src : url
			}).hide().appendTo('body');
		}
	}

	$(document).ready(function() {
		$('#submitExportExcel').click(function(e) {
			e.preventDefault();
			exportExcel();
		});
	});

})(jQuery);