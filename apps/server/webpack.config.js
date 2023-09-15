const path = require('path')

module.exports = {
	entry: './src/main.ts',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	target: 'node',
	mode: 'production',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js'
	},
	externals: {
		bufferutil: 'bufferutil',
		'utf-8-validate': 'utf-8-validate'
	}
}
