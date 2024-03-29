import gulp from "gulp";
import gulpWebpack from "webpack-stream";
import rename from "gulp-rename";
import uglify from "gulp-uglify";
import fs from "fs";

function getDirectories(path) {
	return fs.readdirSync(path).filter(function (file) {
		return fs.statSync(path + "/" + file).isDirectory();
	});
}

export const task = (config) => {
	return new Promise((resolve) => {
		const bundles = getDirectories(`${config.assetsBuild}preact/`);
		const entry = {};
		bundles.forEach((bundle) => {
			const filePath = `${config.assetsBuild}preact/${bundle}/index.js`;
			if (fs.existsSync(filePath)) {
				entry[bundle] = "./" + filePath;
			}
		});

		gulp.src([`${config.assetsBuild}preact/*`])
			// Webpack
			.pipe(
				gulpWebpack({
					entry,
					mode: "production",
					module: {
						rules: [
							{
								test: /\.js$/,
								exclude: /node_modules/,
								loader: "babel-loader",
							},
							{
								test: /\.css$/i,
								use: ["style-loader", "css-loader"],
							},
							{
								test: /\.svg$/,
								use: [
									{
										loader: "svg-url-loader",
										options: {
											limit: 10000,
										},
									},
								],
							},
						],
					},
					output: {
						filename: "[name].js",
					},
					externals: {
						jquery: "jQuery",
						react: "preactCompat",
						"react-dom": "preactCompat",
					},
				})
			)
			.on("error", config.errorLog)
			.pipe(
				rename({
					suffix: ".min",
				})
			)
			.pipe(gulp.dest(config.assetsDir + "preact/"))

			// Minify
			.pipe(uglify())

			.on("error", config.errorLog)
			.pipe(gulp.dest(config.assetsDir + "preact/"));
		resolve();
	});
};
