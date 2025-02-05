/**
 * Modal dialog controller.
 * This script handles all dialog elements on the page.
 *
 * Add a `aria-controls` attribute to the trigger element with the value of the modal's id.
 * The CSS for hiding/showing the modal is separate.
 *
 * mark@sayhello.ch 5.2.2025
 */

const modals = document.querySelectorAll('dialog');

const toggleModal = (event) => {
	event.target.blur();

	const modalId = event.currentTarget.getAttribute('aria-controls');

	if (!modalId || !document.getElementById(modalId)) {
		console.warn('No marching modal found for the trigger');
		return;
	}

	const modal = document.getElementById(modalId);

	// First set the new state of the modal
	modal.toggleAttribute('inert');

	// Then set the new state of the buttons
	const modalInert = modal.hasAttribute('inert');

	// Update the aria-expanded attribute of the trigger/s
	const triggers = document.querySelectorAll(`[aria-controls="${modalId}"]`);

	triggers.forEach((trigger) => {
		trigger.setAttribute('aria-expanded', modalInert ? 'false' : 'true');
	});

	// Focus the search input field if the modal is open
	// else focus the body to defocus the modal
	if (!modalInert) {
		modal.querySelector('input[type="search"]').focus();
	} else {
		document.body.focus();
	}
};

if (modals?.length) {
	modals.forEach((modal) => {
		const modalId = modal.getAttribute('id');
		const triggers = document.querySelectorAll(`[aria-controls="${modalId}"]`);

		if (triggers?.length) {

      // Assumes that the dialog is closed by default.
			triggers.forEach((trigger) => {
				trigger.setAttribute('aria-expanded', 'false');
				trigger.addEventListener('click', toggleModal);
			});
		}
	});
}
