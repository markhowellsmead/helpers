/**
 * Based on https://idangero.us/swiper/api/
 * Use npm i swiper -save-dev to install the library dependency
 * https://github.com/markhowellsmead/helpers/wiki/Swiper
	*
	* Logic simplified in v6 (July 2020)
	* so that each component can be loaded separately
	* Warning: v6 drops IE11 support!
 */

// For Swiper JS v6+ (incompatible with IE11!!!)
// Load CSS for all Swiper instances
import 'swiper/css';
import 'swiper/css/navigation';

import Swiper, { Navigation } from 'swiper';
const swipers = document.querySelectorAll('.c-swiper');

// Handles possible multiple Swipers on the same page
if (!!swipers.length) {
    const nudge = this_swiper => {
        this_swiper.navigation.update();
        console.log('Swiper nudged');
    };

    for (let i = 0; i < swipers.length; i++) {
        swipers[i].classList.add('c-swiper--' + i);

        let this_swiper = new Swiper('.c-swiper--' + i, {
            autoHeight: false,
            slidesPerView: 1,
            slidesPerGroup: 1,
            modules: [Navigation],
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });

        // Nudge the swiper to make sure that the navigation buttons appear
        setTimeout(() => nudge(this_swiper), 500);
    }
}
