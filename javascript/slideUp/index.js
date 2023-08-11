/**
 * VanillaJS version of jQuery's slideUp
 *
 * mark@sayhello.ch April 2023
 */

const slideUp = (element, duration = 500) => {
	// Get the current height of the element
	const maxHeight = element.offsetHeight;

	// Set the height of the element to its current value
	element.style.maxHeight = maxHeight + 'px';

	// Set the element's overflow property to 'hidden'
	element.style.overflow = 'hidden';

	// Create an animation to set the height to 0
	const animation = element.animate(
		{ maxHeight: 0, opacity: 0 },
		{ duration: duration }
	);

	// When the animation is complete, hide the element
	animation.onfinish = () => {
		element.remove();
	};
};

export default slideUp;
