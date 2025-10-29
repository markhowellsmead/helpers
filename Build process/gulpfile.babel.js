/**
 * Gulpfile for WordPress Theme by Say Hello
 * 
 * This gulpfile sets up various Gulp tasks to handle styles, scripts, SVG optimization,
 * and block-specific assets for a WordPress theme. It imports tasks from the .build/gulp
 * directory and configures them with paths and settings specific to the theme.
 * 
 * The tasks include:
 * - block_scripts: Builds block-specific JavaScript files using Webpack.
 * - block_styles: Compiles block-specific SCSS files into CSS.
 * - scripts: Bundles general JavaScript files for the theme.
 * - styles: Compiles general SCSS files into CSS for the theme.
 * - svg: Minifies SVG files in the assets directory.
 * 
 * A watch task is also defined to monitor changes in source files and automatically
 * trigger the appropriate build tasks.
 * 
 * This version 29.10.2025 mark@sayhello.ch
 */

import gulp from 'gulp';

const config = {
	name: 'WordPress Theme by Say Hello',
	key: 'sht',
	themeDir: './',
	assetsDir: './assets/',
	gulpDir: './.build/gulp/',
	assetsBuild: './.build/assets/',
	blockScriptsSrc: './src/Block/**/assets/src/scripts',
	blockScriptsDist: './src/Block/',
	blockStylesSrc: './src/Block/**/assets/src/styles/**/*.{scss,js}',
	blockStylesDist: './src/Block/',
	scriptsComponentsDir: './.build/assets/scripts/_components',
	errorLog: function (error) {
		console.log('\x1b[31m%s\x1b[0m', error);
		if (this.emit) {
			this.emit('end');
		}
	},
};

import { task as taskBlockScripts } from './.build/gulp/task-block-scripts.js';
import { task as taskBlockStyles } from './.build/gulp/task-block-styles.js';
import { task as taskScripts } from './.build/gulp/task-scripts.js';
import { task as taskStyles } from './.build/gulp/task-styles.js';
import { task as taskSvg } from './.build/gulp/task-svg.js';

export const block_scripts = () => taskBlockScripts(config);
export const block_styles = () => taskBlockStyles(config);
export const scripts = () => taskScripts(config);
export const styles = () => taskStyles(config);
export const svg = () => taskSvg(config);

export const watch = () => {
	const settings = { usePolling: true, interval: 100 };

	gulp.watch(config.blockStylesSrc, settings, gulp.series(block_styles));
	gulp.watch(`${config.blockScriptsSrc}/**/*.{scss,js}`, settings, gulp.series(block_scripts));
	gulp.watch(`${config.assetsBuild}styles/**/*.scss`, settings, gulp.series(styles));
	gulp.watch(`${config.assetsBuild}scripts/**/*.{scss,css,js}`, settings, gulp.series(scripts));
	gulp.watch(`${config.assetsDir}settings.json`, settings, gulp.series(scripts, styles));
	gulp.watch(`${config.themeDir}theme.json`, settings, gulp.series(scripts, styles));
	gulp.watch([`${config.assetsDir}**/*.svg`, `!${config.assetsDir}**/*.min.svg`], settings, gulp.series(svg));
};

export const taskDefault = gulp.series(watch);
export default taskDefault;
