/**
 * Basic example of Grunt usage.
 * @since 07.04.15 | mhm
 */

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// config for script concatenation
		concat: {
			dist: {
				src: [
					'js/*.js' // All JS in this folder
				],
				dest: 'build/js/production.js'
			}
		},

		// config for image minification
		imagemin: {
			dynamic: {
				files: [{
				progressive: true,
					expand: true,					// Enable dynamic expansion
					cwd: 'source/',					// Src matches are relative to this path
					src: ['**/*.{png,jpg,gif}'],	// Actual patterns to match
					dest: 'compressed/'				// Destination path prefix
				}]
			}
		},

		// config for script uglification
		// this must be called AFTER concat
		uglify: {
		    build: {
		        src: 'build/js/production.js',
		        dest: 'build/js/production.min.js'
		    }
		}
	});

	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Example task initialization 
	grunt.registerTask('default', ['imagemin']);
	grunt.registerTask('default', ['concat', 'uglify']);
	grunt.registerTask('default', ['imagemin', 'concat', 'uglify']);

};