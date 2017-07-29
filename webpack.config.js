var webpack = require("webpack");
var path = require("path");

const config = {
	entry: "./client/index.js",
	output: {
		path:__dirname,
		filename: "public/build/bundle.js"
	},
	devtool: "#source-map",
	module:{
		rules:[
			{
				test: /js$/,
				exclude: /(node_modules)/,
				loader: "babel-loader",
				query: {
					presets:["react", "es2015"]
				}
			}
		]
	}
}


module.exports = config;