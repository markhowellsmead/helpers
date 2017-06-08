/**
 * Run this using node_modules/gulp/bin/gulp.js !!!
 * mhm 8.6.2017
 */

'use strict';

import plugins from 'gulp-load-plugins';
//import rename from 'gulp-rename';
import yargs from 'yargs';
import gulp from 'gulp';
import rimraf from 'rimraf';
import yaml from 'js-yaml';
import fs from 'fs';

// Load all Gulp plugins into one variable
const $ = plugins();

// Load settings from config.yml
const { PATHS } = loadConfig();

function loadConfig() {
    let ymlFile = fs.readFileSync('config.yml', 'utf8');
    return yaml.load(ymlFile);
}

// Build the "dist" folder by running all of the below tasks
gulp.task('build',
    gulp.series(clean, copyJS));

// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
    rimraf(PATHS.dist, done);
}

/**
 * Copies JavaScript files as-is from e.g. bower_components
 * The path is manipulated to simplify the destination path.
 */
function copyJS(done) {
    if (PATHS.copyjavascript) {
        gulp.src(PATHS.copyjavascript, { base: '.' })
		.pipe($.concat('libs.js'))
            .pipe(gulp.dest(PATHS.dist + '/assets/js'));
    }
    if(done){
        done();
    }
}
