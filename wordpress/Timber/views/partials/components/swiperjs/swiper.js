/**
 * Based on https://idangero.us/swiper/api/
 * Use npm i swiper -save-dev to install the library dependency
 * Note the import path, which works around problems with gulp-uglify
 * https://github.com/markhowellsmead/helpers/wiki/Swiper
 */

import Swiper from 'swiper/dist/js/swiper.js';

new Swiper('.swiper', {
	…
});
