/**
 * Based on https://idangero.us/swiper/api/
 * Use npm i swiper -save-dev to install the library dependency
 * https://github.com/markhowellsmead/helpers/wiki/Swiper
	*
	* Logic simplified in v6 (July 2020)
	* so that each component can be loaded separately
 */

import Swiper, { Pagination } from 'swiper';
Swiper.use([Pagination]);

new Swiper('.wp-block-sht-carousel .swiper-container', {
	autoHeight: true,
	loop: true,
	simulateTouch: false,
	pagination: {
		el: '.swiper-pagination',
		clickable: true
	},
});

