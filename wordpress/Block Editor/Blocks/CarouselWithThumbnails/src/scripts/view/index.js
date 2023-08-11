import Swiper, { Navigation, Thumbs } from 'swiper';

document.querySelectorAll('.c-swiper').forEach((swiper_outer) => {
	const thumbs_swiper = new Swiper(
		swiper_outer.querySelector('.swiper-thumbs-pagination'),
		{
			spaceBetween: 10,
			slidesPerView: 11,
			watchSlidesProgress: true,
		}
	);

	let ident_button_next = '.swiper-button-next',
		ident_button_prev = '.swiper-button-prev';

	const swiper_id = swiper_outer.getAttribute('id');

	if (swiper_id) {
		ident_button_next = `${ident_button_next}-${swiper_id}`;
		ident_button_prev = `${ident_button_prev}-${swiper_id}`;
	}

	console.log(ident_button_next);

	new Swiper(swiper_outer.querySelector('.swiper-main'), {
		modules: [Navigation, Thumbs],
		navigation: {
			nextEl: ident_button_next,
			prevEl: ident_button_prev,
		},
		thumbs: {
			swiper: thumbs_swiper,
		},
	});
});
