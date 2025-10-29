/**
 * Gulp task to minify SVG files.
 * 
 * This file defines a Gulp task that processes SVG files located in the specified assets directory.
 * It uses gulp-svgmin to minify the SVG files and outputs the minified versions with a .min.svg
 * suffix in the same directory.
 * 
 * This version 29.10.2025 mark@sayhello.ch
 */

import gulp from 'gulp';

import rename from 'gulp-rename';
import svgmin from 'gulp-svgmin';

export const task = (config) => {
    return gulp
    .src([config.assetsDir + '**/*.svg', '!' + config.assetsDir + '**/*.min.svg'])
    .pipe(
        svgmin(
            {
                plugins: [
                {
                    removeViewBox: false,
                },
                ],
            }
        )
    )
        .pipe(
            rename(
                {
                    suffix: '.min',
                }
            )
        )
        .on('error', config.errorLog)
        .pipe(gulp.dest(config.assetsDir));
};
