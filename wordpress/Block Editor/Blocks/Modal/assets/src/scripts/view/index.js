// add an event lostener to the window so that when anything is clisked
// which is outside the modal inner, the modal will close
window.addEventListener('click', (e) => {
	const modal = document.querySelector('.c-modal__inner'),
		modalToggle = document.querySelector('.c-modal__toggle');
	if (!modal.contains(e.target) && e.target !== modal && e.target !== modalToggle) {
		modalToggle.setAttribute('aria-expanded', 'false');
		modal.setAttribute('aria-hidden', 'true');
	}
});
