* 这里只有 html 和 转换 ES6的。如果html里面有img 需要用到file-loader另外一个插件

``` javascript
    "@babel/cli": "^7.4.4",
    "@babel/core": "^7.4.4",
    "@babel/preset-env": "^7.4.4",
    "babel-loader": "^8.0.6",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^3.2.0"
    "@babel/polyfill": "^7.4.4",
    "webpack": "^4.31.0",
    "webpack-cli": "^3.3.2",
    "webpack-dev-server": "^3.3.1"
```

``` git
    "@babel/cli": "^7.4.4",
    "@babel/core": "^7.4.4",
    "@babel/preset-env": "^7.4.4",
    "babel-loader": "^8.0.6",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^3.2.0"
    "@babel/polyfill": "^7.4.4",
    "webpack": "^4.31.0",
    "webpack-cli": "^3.3.2",
    "webpack-dev-server": "^3.3.1"
 ```
 
 

 
 ``` javascript
 //webpack.config.js
 const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    },
    optimization: {
        minimizer: [
            new TerserPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: './index.html',
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true
                }
            })
        ]
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.html$/,
            use: [{
                loader: "html-loader",
                options: {
                    minimizer: true
                }
            }]
        }
    ]}
}
```

 
