if(window.Element && !Element.prototype.closest) {
	Element.prototype.closest =
		function (s) {
			var matches = (this.document || this.ownerDocument).querySelectorAll(s),
				i,
				el = this;
			do {
				i = matches.length;
				while(--i >= 0 && matches.item(i) !== el) {};
			} while((i < 0) && (el = el.parentElement));
			return el;
		};
}

(function () {

	var accordions = document.querySelectorAll('[data-accordion]');

	var accordionClickHandler = function () {
		var isopen = this.closest('[data-accordion]').getAttribute('aria-expanded') === 'true';
		this.closest('[data-accordion]').setAttribute('aria-expanded', isopen ? 'false' : 'true');
	};

	for(var i = 0; i < accordions.length; i++) {
		accordions[i].setAttribute('aria-expanded', 'false');
		accordions[i].querySelector('[data-accordion-toggler]').addEventListener('click', accordionClickHandler);
	}

})();
