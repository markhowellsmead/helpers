/**
 * Gulp task to compile block styles.
 *
 * This file defines a Gulp task that processes SCSS files located in the specified block styles
 * source directory. It compiles the SCSS files into CSS, applies autoprefixing, and outputs
 * both regular and minified versions of the CSS files to the designated block styles distribution
 * directory.
 *
 * It uses gulp-sass for compiling SCSS to CSS, gulp-autoprefixer for adding vendor prefixes,
 * and cssnano for minifying the CSS files.
 *
 * This version 29.10.2025 mark@sayhello.ch
 */

import { src, dest } from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import cssnano from 'cssnano';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import * as dartSass from 'sass';

const gulpSass = sass(dartSass);

export const task = (config) => {
	return (
		src([config.blockStylesSrc])
			.pipe(gulpSass().on('error', gulpSass.logError))
			.pipe(autoprefixer())
			.pipe(
				rename((path) => ({
					dirname: config.blockStylesDist.replace('./', '') + path.dirname.replace('/assets/src', '/assets/dist'),
					basename: path.basename,
					extname: path.extname,
				}))
			)
			.pipe(dest('./'))
			.on('error', config.errorLog)
			// Minify
			.pipe(postcss([cssnano({ preset: ['default', { mergeLonghand: false }] })])) // 29.10.2025 - known issue with cssnano > 6 - mergeLonghand breaking some styles
			.on('error', config.errorLog)
			.pipe(rename({ suffix: '.min' }))
			.pipe(dest('./'))
	);
};
