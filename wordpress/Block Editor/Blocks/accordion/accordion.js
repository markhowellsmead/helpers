/**
 * Load as a frontend script
 *
 * Set initial state for all accordion blocks on the page
 * This code assumes use of the Hello Roots Theme from Say Hello
 * Since: 2.12.2020
 *
 * The actual toggling of the elements (button and target) takes place
 * through the global aria- attribute controls in aria-toggler.js in the Theme.
 * This file simply collapses the accordion when the page is loaded in
 * the browser, in order to set the initial state.
 */

(function () {
	var accordions = document.querySelectorAll('[data-accordion]');
	if(accordions && accordions.length) {
		accordions.forEach(accordion => {
			accordion.querySelector('[data-accordion-content]').setAttribute('aria-hidden', 'true');
			accordion.querySelector('[data-accordion-toggler]').setAttribute('aria-expanded', 'false');
		});
	}
})();
