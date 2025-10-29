/**
 * Gulp task to compile styles.
 *
 * This file defines a Gulp task that processes SCSS files, applies necessary transformations
 * such as autoprefixing and minification, and outputs the resulting CSS files to the specified
 * assets directory. It also handles editor styles specifically.
 *
 * It uses postcss with cssnano for minification, gulp-autoprefixer for adding vendor prefixes,
 * and gulp-sass for compiling SCSS to CSS. Additionally, it utilizes gulp-editor-styles to
 * handle styles specific to the WordPress editor. (Rules in assets/styles/editor/*.css will be
 * automatically wrapped in .editor-styles-wrapper class.)
 *
 * This version 29.10.2025 mark@sayhello.ch
 *
 */

import { src, dest } from 'gulp';
import cssnano from 'cssnano';
import postcss from 'gulp-postcss';
import filter from 'gulp-filter';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import sassImportJson from '@sayhellogmbh/gulp-sass-import-json';
import editorStyles from 'gulp-editor-styles';
import sass from 'gulp-sass';
import * as dartSass from 'sass';

const gulpSass = sass(dartSass);

export const task = (config) => {
	// Filter for editor styles -- rules in the matching CSS files will be wrapped in .editor-styles-wrapper
  // This looks wrong (.css instead of .scss) but it is correct!
	const blockFilter = filter(`${config.assetsBuild}styles/editor/*.css`, { restore: true });

	return (
		src(`${config.assetsBuild}styles/**/*.scss`)
			.pipe(sassImportJson({ cache: false, isScss: true }))
			.pipe(
				gulpSass({
					includePaths: ['./node_modules/'],
				}).on('error', gulpSass.logError)
			)
			.pipe(autoprefixer())
			.pipe(blockFilter)
			.pipe(editorStyles())
			.pipe(blockFilter.restore)
			.pipe(dest(`${config.assetsDir}styles/`))
			.on('error', config.errorLog)
			.pipe(postcss([cssnano({ preset: ['default', { mergeLonghand: false }] })])) // 29.10.2025 - known issue with cssnano > 6 - mergeLonghand breaking some styles
			.pipe(
				rename({
					suffix: '.min',
				})
			)
			.on('error', config.errorLog)
			.pipe(dest(`${config.assetsDir}styles/`))
			// Reload
			.pipe(filter('**/*.css'))
	);
};
