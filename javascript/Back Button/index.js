/**
 * Check for back buttons and update their href to the referrer if it's an internal link, otherwise disable them.
 *
 * @returns void
 */
export function backButton() {
	const buttons = document.querySelectorAll('a[id="pageback"]');

	if(!buttons.length) {
		return;
	}

	buttons.forEach((button) => {
		const gcs = window.getComputedStyle(button);
		button.dataset.opacityWas = gcs.opacity;
		button.dataset.pointerEventsWas = gcs.pointerEvents;
		button.dataset.cursorWas = gcs.cursor;
		button.style.opacity = '0';
		button.style.pointerEvents = 'none';
		button.style.cursor = 'default';
	});

	const referrer = document.referrer;
	let isInternalReferrer = false;

	try {
		if (referrer) {
			const refUrl = new URL(referrer);
			const sameOrigin = refUrl.origin === window.location.origin;
			const samePathAndQuery = refUrl.pathname === window.location.pathname && refUrl.search === window.location.search;
			// Internal referrer and not the same document (path+query)
			isInternalReferrer = sameOrigin && !samePathAndQuery;
		}
	} catch (err) {
		console.log('Back button: failed to parse referrer', err);
		isInternalReferrer = false;
	}

	buttons.forEach((button) => {
		if (isInternalReferrer) {
			button.href = referrer;
			button.style.opacity = button.dataset.opacityWas || '';
			button.style.pointerEvents = button.dataset.pointerEventsWas || '';
			button.style.cursor = button.dataset.cursorWas || '';
			delete button.dataset.opacityWas;
			delete button.dataset.pointerEventsWas;
			delete button.dataset.cursorWas;
			button.removeAttribute('onclick');
		}
	});
};
