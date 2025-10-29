/**
 * Gulp task to build block scripts using Webpack.
 * 
 * This file defines a Gulp task that processes JavaScript files located in the specified block scripts
 * source directory. It uses Webpack to bundle the files, applying necessary loaders for JavaScript
 * (Babel), SCSS (Sass), and SVG (SVGR). The bundled files are then output to the designated block
 * scripts distribution directory.
 * 
 * It also utilizes the DependencyExtractionWebpackPlugin to manage WordPress dependencies.
 * 
 * It also adds an alias for shared components to simplify imports in React components.
 * 
 * This version 29.10.2025 mark@sayhello.ch
 */

import { src, dest } from 'gulp';
import { sync as globSync } from 'glob';
import rename from 'gulp-rename';
import path from 'path';
import gulpWebpack from 'webpack-stream';
import sass from 'sass';
import DependencyExtractionWebpackPlugin from '@wordpress/dependency-extraction-webpack-plugin';
const __dirname = path.resolve();

export const task = (config) => {
	return new Promise((resolve) => {
		const taskPath = `${config.blockScriptsSrc}/**/*.js`;
		const files = globSync(taskPath);
		const entries = {};

		files.forEach((file) => {
			if (!path.basename(file).startsWith('_')) {
				const folders = path.dirname(file).split(path.sep);
				const folder_last = folders[folders.length - 1];

				if (!folder_last.startsWith('_')) {
					entries[`${folders[2]}_${folder_last}`] = `./${file}`; // MyBlock_editor.js || MyBlock_view.js
				}
			}
		});

		src([taskPath])
			.pipe(
				gulpWebpack({
					entry: entries,
					mode: 'production',
					module: {
						rules: [
							{
								test: /\.js$/,
								exclude: /node_modules/,
								loader: 'babel-loader',
							},
							{
								test: /\.s?css$/i,
								use: [
									'style-loader',
									'css-loader',
									{
										loader: 'sass-loader',
										options: {
											implementation: sass,
										},
									},
								],
							},
							{
								test: /\.svg$/i,
								issuer: /\.[jt]sx?$/,
								use: [{ loader: '@svgr/webpack', options: { icon: true } }],
							},
						],
					},
					output: {
						filename: '[name].js',
					},
					externals: {
						jquery: 'jQuery',
					},
					plugins: [new DependencyExtractionWebpackPlugin()],
					resolve: {
						alias: {
							'@sharedcomponents': path.resolve(__dirname, config.scriptsComponentsDir),
						},
					},
				})
			)
			.on('error', config.errorLog)
			.pipe(
				rename((filePath) => {
					const basenameParts = filePath.basename.split('_');
					const targetBasename = basenameParts[1];
					const targetBasefolder = basenameParts[0];
					return {
						dirname: `${config.blockScriptsDist}${targetBasefolder}/assets/dist/scripts/`,
						basename: targetBasename,
						extname: filePath.extname,
					};
				})
			)
			.pipe(dest('./'));
		resolve();
	});
};
