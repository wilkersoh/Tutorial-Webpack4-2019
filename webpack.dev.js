const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: "development",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [ new HtmlWebpackPlugin({
        template: "./src/index.html"
    })],
    module: {
        rules: [
            {
            test: /\.scss$/,
            use: [
                { loader: "style-loader" }, // 3. inject styles into DOM
                { loader: "css-loader" }, // 2. second run this
                { loader: "sass-loader"} // 1. run first
            ],
        }]
    },
}); 