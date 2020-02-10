import gulp from 'gulp';

const config = {
	name: 'Hello Theme',
	key: 'sht',
	distDir: './dist/',
	gulpDir: './gulp/',
	assetsBuild: './src/',
	errorLog: function (error) {
		console.log('\x1b[31m%s\x1b[0m', error);
		if(this.emit) {
			this.emit('end');
		}
	}
};

import { task as taskGutenberg } from './gulp/task-gutenberg';
export const gutenberg = () => taskGutenberg(config);
export const watch = () => {
	const settings = { usePolling: true, interval: 100 };
	gulp.watch(config.assetsBuild + 'gutenberg/**/*.{js,jsx}', settings, gulp.series(gutenberg));
};

export const taskDefault = gulp.series(gulp.parallel(gutenberg), watch);
export default taskDefault;
