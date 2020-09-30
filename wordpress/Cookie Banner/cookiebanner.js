(function () {
	var getCookie = function (name) {
		var value = "; " + document.cookie;
		var parts = value.split("; " + name + "=");
		if (parts.length == 2) return parts.pop().split(";").shift();
	};

	var setCookie = function (name, value, days) {
		var d = new Date;
		d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
		document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
	}

	var showOrHide = function () {
		if (!getCookie('cookiebanner')) {
			document.documentElement.classList.add('s--showcookiebanner');
		} else {
			document.documentElement.classList.remove('s--showcookiebanner');
		}
	}

	showOrHide();

	document.querySelectorAll('[data-cookiebanner-close]').forEach((button) => {
		button.addEventListener('click', () => {
			setCookie('cookiebanner', 'closed', 30);
			showOrHide();
		});
	});

})();
