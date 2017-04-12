var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ReplacePlugin = require('replace-bundle-webpack-plugin');

module.exports = {
	entry: {
		app: './src/index.js',
		'todomvc-common': 'todomvc-common'
	},
	output: {
		path:  __dirname + '/build',
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style')
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({ filename: 'style.css',  allChunks: true })
	],
	devtool: 'source-map',
	devServer: {
		port: process.env.PORT || 8080
	}
};
