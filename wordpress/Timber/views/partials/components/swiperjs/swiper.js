/**
 * Based on https://idangero.us/swiper/api/
 * Use npm i swiper -save-dev to install the library dependency
 * Note the import path, which works around problems with gulp-uglify
 * https://github.com/markhowellsmead/helpers/wiki/Swiper
	*
	* JS path in the Node Module changed in version 5.
 */

import Swiper from 'swiper/js/swiper.js';

new Swiper('.swiper', {
	…
});
