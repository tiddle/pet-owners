const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	mode: 'production',
	output: {
		filename: './dist/main.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
		],
	},
	plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
	],

	devServer: {
		contentBase: path.join(__dirname, 'dist')
	}
};
