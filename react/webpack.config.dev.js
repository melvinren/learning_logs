const path = require('path');
const webpack = require('webpack');


module.exports = {
	entry: [
		// we ship a ffew polyfills by default
		require.resolve('./polyfills'),
		'./src/index.js'
	],
	output:{
		pathinfo:true,
		filename: 'static/js/bundle.js',
		chunkFilename: 'static/js[name].chunk.js',
		publicPath:'/'
	},
	module: {
		strictExportPresence: true,
		rules: [
			test: /\.(js|jsx)$/,
			enforce: 'pre',
			use: [
			{
				options:{
					eslintPath: require.resolve('eslint'),

				},
				loader: require.resolve('eslint-loader'),
			}],
			include: './src'
		]
	}
}