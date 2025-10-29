/**
 * Gulp task to compile and bundle JavaScript and SCSS assets using Webpack.
 *
 * This file defines a Gulp task that processes JavaScript and SCSS files located in the
 * specified block scripts source directory. It uses Webpack to bundle the files, applying
 * necessary loaders for JavaScript (Babel), SCSS (Sass), and SVG (SVGR). The bundled files
 * are then output to the designated assets directory.
 *
 * It also utilizes the DependencyExtractionWebpackPlugin to manage WordPress dependencies.
 *
 * It also adds an alias for shared components to simplify imports in React components.
 *
 * This version 29.10.2025 mark@sayhello.ch
 *
 */

import gulp from 'gulp';
import gulpWebpack from 'webpack-stream';
import fs from 'fs';
import path from 'path';
import sass from 'sass';
import DependencyExtractionWebpackPlugin from '@wordpress/dependency-extraction-webpack-plugin';

const getDirectories = (path) => fs.readdirSync(path).filter((file) => fs.statSync(`${path}/${file}`).isDirectory());
const __dirname = path.resolve();

export const task = (config) => {
	return new Promise((resolve) => {
		const bundles = getDirectories(`${config.assetsBuild}scripts/`);
		const entry = {};

		bundles.forEach((bundle) => {
			const filePath = `${config.assetsBuild}scripts/${bundle}/index.js`;
			if (fs.existsSync(filePath)) {
				entry[bundle] = './' + filePath;
			}
		});

		gulp.src([`${config.assetsBuild}scripts/*`])
			.pipe(
				gulpWebpack({
					entry,
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
					plugins: [new DependencyExtractionWebpackPlugin()],
					resolve: {
						alias: {
							'@sharedcomponents': path.resolve(__dirname, config.scriptsComponentsDir),
						},
					},
				})
			)
			.on('error', config.errorLog)
			.pipe(gulp.dest(`${config.assetsDir}scripts/`));
		resolve();
	});
};
