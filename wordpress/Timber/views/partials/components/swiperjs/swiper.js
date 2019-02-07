/**
 * Based on https://idangero.us/swiper/api/
 * Use npm i swiper -save-dev to install the library dependency
 */

import Swiper from 'swiper/dist/js/swiper.js';

var appslider = new Swiper('.c-appslider .swiper-container', {
	autoplay: {
		delay: 5000
	},
	grabCursor: true,
	speed: 500
});

var mySwiper = new Swiper('.c-modelsslider .swiper-container', {
	pagination: {
		el: '.swiper-pagination',
		grabCursor: true
	},
});
