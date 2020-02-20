(function (snackbar_data) {

	if(typeof snackbar_data === 'undefined') {
		console.error('Pass in a JS object called sht_snackbar using PHP which contains two sub arrays - links and text');
		return;
	}

	let snackbars = document.createElement('div');
	snackbars.classList.add('sht_snackbars');
	document.body.appendChild(snackbars);

	// Hider
	const hideEvent = new CustomEvent('sht_snackbar/hide', {
		bubbles: false
	});
	const hideSnackbar = ((event) => {
		event.target.classList.add('sht_snackbar--hidden');
	});

	// Remover
	const removeEvent = new CustomEvent('sht_snackbar/remove', {
		bubbles: false
	});
	const removeSnackbar = ((event) => {
		event.target.classList.add('sht_snackbar--hidden');
		if(event.target && event.target.parentNode) {
			setTimeout(() => {
				event.target.parentNode.removeChild(event.target);
			}, window.sht.settings.snackbar_transition);
		}
	});

	var snackbar = function (html) {
		let snackbar = document.createElement('div');
		snackbar.classList.add('sht_snackbar');
		snackbar.classList.add('sht_snackbar--hidden');
		snackbar.addEventListener('sht_snackbar/hide', hideSnackbar, false);
		snackbar.addEventListener('sht_snackbar/remove', removeSnackbar, false);
		snackbar.innerHTML = html;
		return snackbar;
	};

	window.addEventListener('sht_snackbar/show', function (event) {
		if(event.detail.overwrite) {
			snackbars.innerHTML = '';
		}
		let message = snackbar(event.detail.html);
		snackbars.appendChild(message);
		message.classList.remove('sht_snackbar--hidden');
		if(!event.detail.permanent) {
			setTimeout(function () {
				message.dispatchEvent(removeEvent);
			}, window.sht.settings.snackbar_wait);
		}
	});

})(sht_snackbar);
