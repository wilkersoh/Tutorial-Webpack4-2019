module.exports = {
    entry: {
        main: "./src/index.js",
        vender: "./src/vender.js"
    },
    module: {
        rules: [
           /* {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" }, // 3. inject styles into DOM
                    { loader: "css-loader" },
                    { loader: "sass-loader"}
                ],
            },*/
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test:/\.(svg|png|jpg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash][ext]",
                        outputPath: "imgs" // create a imgs folder in dist folder
                    }
                }
            }
        ]
    }
};