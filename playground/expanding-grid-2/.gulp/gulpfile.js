/**
* Gulp task to monitor the style.scss file and re-generate the CSS file when style.scss has changed
* Usage: Run “gulp” from the command line and leave the terminal window open!
* This runs the default task, which in turn inits the browser sync and watches the sass file
* When style.scss is saved, the sass task is run. This compiles and minifies the CSS, then re-streams
* the new CSS to the browser. (With this config, only Chrome.)
*
* @since 	14/07/2015
*/

'use strict';

//////////////////////////////////////////////////

var paths = {

    styles: {
        sass: '../',
        files: '../**/*.scss',
        css: '../'
    }

}

//////////////////////////////////////////////////

var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifyCss = require('gulp-minify-css'),
	notify = require('gulp-notify'),
	browserSync = require('browser-sync');

var themefolder		= '..',
	cssfolder 		= '..';

//////////////////////////////////////////////////

gulp.task('default', ['browser-sync', 'sass:watch']);

//////////////////////////////////////////////////

gulp.task('sass', function(){
	return gulp.src(paths.styles.files)
	    .pipe(sass().on('error', sass.logError))
	    .pipe(autoprefixer({
			browsers: ['last 3 versions']
		}))
		.pipe(gulp.dest(paths.styles.css))
	    .pipe(minifyCss())
	    .pipe(gulp.dest(paths.styles.css))
	    .pipe(browserSync.stream())
	    .pipe(notify('Compiled :)'));

});

//////////////////////////////////////////////////

gulp.task('sass:watch', function(){
	var watch_sass = gulp.watch(path.styles.sass+'/**/*.scss', ['sass']);
});

//////////////////////////////////////////////////

gulp.task('browser-sync', function () {
	var files = path.styles.files;

	browserSync.init(files, {
		proxy: {
			target: "http://www.fh.mhm/"
		}
	});
});