
# 學習Webpack 4 2019
# 遇見太多坑在webpack了 所以才生成這支資料。
你以為webpack只是簡簡單單打包script罷了嗎！那你就錯了，之前我也認為就那些簡單打包和babel組合。就以為已經入門webpack了
這裡會分享一些基礎Webpack使用功能還有坑。。。。
npm run start || npm run build

 * webpack ---- 4.29.6
 * webpack-cli ---- 3.3.0
 * style-loader ---- 0.23.1
 * css-loader ---- 2.1.1
 * sass-loader ---- 7.1.0
 * node-sass ---- 4.11.0
 * HtmlWebpackPlugin ---- 3.2.0
 * webpack-merge ---- 4.2.1
 * webpack-dev-server ---- 3.2.1
 * html-loader ---- 0.5.5
 * file-loader ---- 3.0.1
 * clean-webpack-plugin ---- 2.0.1
 * mini-css-extract-plugin ---- 0.5.0
 * optimize-css-assets-webpack-plugin ---- 5.0.1
 
 

### scss轉換css再插入DOM里
要注意這個，它是從後面開始讀取和轉換它的顺序！



``` javascript
  rules: [
      {
          test: /\.scss$/,
          use: [
              { loader: "style-loader" }, // 3. inject styles into DOM
              { loader: "css-loader" }, // 2. second run this
              { loader: "sass-loader"} // 1. run first
          ],
      }
  ]

```

<p>在webpack.config里增加<strong>[contentHash]</strong>讓系統記錄每次更換資料都會添加hast號碼，如果遊覽器已經這網頁下載后，過後還是一樣的hast號碼，它不不會再去浪費時間去下載它</p>

``` javascript
  entry: "./src/index.js",
  output: {
  filename: "main.[contentHash].js",
        path: path.resolve(__dirname, "dist")
    },  
 ```

----------------
### 記得使用這個在你的index.html里就不需要寫script去讀取去的main.js文件了。需要使用HtmlWebpackPlugin讓它自動去生成script和hash
<p>在webpack.config的index.html資料里不需要bootstrap的資料了, 有bootstrap去幫他自己去生成</p>

##### 想對webpack拆分到更加清楚的話可以使用webpack-merge
<p>創建webpack.common.js && webpack.dev.js && webpack.prod.js 去規分使用它</p>

``` javascript
  //webpack.dev.js 調用webpack.common里module.exports后全部資料
  const common = require("./webpack.common");
  module.exports = merge(dev, { regular code }) 
```

*在package.json里也要注意更改webpack --config <strong>webpack.dev.js</strong>這就是說是執行webpack.dev的webpack資料。當執行開發者webpack它不會再index文件里生成main.[hash].js*也還沒對文件minify。這些都是核對以上的文件 看你怎樣去寫code在你的webpack里


### html-loader && file-loader
<p>是不是奇怪為什麼當照片放在同一個src file里 index.html會讀取不到呢</p>
<p>使用html-loader。每當遇到img資料時,它就會去要求網頁去讀那張img資料 而不會明明設置的路線都正確但卻讀取不到的情況出現</p>
<p>還有還有記得還要在webpack里設置file-loader 那樣才算 大功告成哦</p>

**注意轉換照片 options里的 【hast】 和 output for bundle file的【contentHash】 不要搞混淆了

``` javascript
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
```
``` javascript
module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "[name].[contentHash].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [ new cleanWebpackPlugin()]
});
```


### clean-webpack-plugin
<p>這個工具能讓你之前的hash被保留下來沒使用到的被clean掉哦</p>

----------

### 你也可以使用多个entry file然后创建 不同的bundle

``` javascript
    //main 和 vender是被创建出来的bundle file的名字哦
    entry: {
        main: "./src/index.js",
        vender: "./src/vender.js"
    },
 ```
 ``` javascript
     //webpack.dev.js 因为创建不同的bundle文件 所以需要[name], 讓自動拿去文件名才不會混淆
     output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
 ```
 
 ``` javascript
     //webpack.prod.js 
     output: {
        filename: "[name].[contentHash].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
 ```
 # 重點中的重點來了！！！:fire:
 ### mini-css-extract-plugin 把文件超級縮小！
 
 *不需要在webpack.common.js里轉換 css 進去 style-loadder了
 *我們只需要 在prod格式里 用 **MiniCssExtractPlugin** 讀取css資料然後生成一個新的css文件
 ### 这个也会解决当你刷新网页 显示的500ms的unstyle dom， 如果使用style-loader那么他就会先下载dom才会读到下面的 style css。使用mini的话 它会把css 移去file先
 ``` javascript
 // webpack.prod.js
 const MiniCssExtractPlugin = require("mini-css-extract-plugin");
     plugins: [ 
        new MiniCssExtractPlugin({ filename: "[name].[contentHash].css"}), 
        new cleanWebpackPlugin()
    ],
  module: {
     rules: [{
         test: /\.scss$/,
         use: [
             MiniCssExtractPlugin.loader, // 3. 提取css into file
             "css-loader", // 2. second run this
             "sass-loader" // 1. run first
         ],
     }]
 },
    
 ```
 ### optimize-css-assets-webpack-plugin
 *minify the huge CSS ***放在module上面還是下面都沒問題~! 
 ``` javascript
     optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin()
    ]},
```
<p>但是 當我們使用這個optimize plugin它會影響到 之前設置的javascript minify</p>
<p>造成js 變回去dev格式 然後css minify了</p>
 ### 要怎樣解決這個問題呢
 ### 也得到bash的回應 文件夾容量太大了

``` bash
Assets:
  vender.e3842b15fa4de79b24a4.bundle.js (484 KiB)

WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This
can impact web performance.
```
<p>可以使用terser-webpack-plugin去解決js也能minify的這個問題</p>
<p>terser不必下載它 它已經在node-mudule裡面了~</p>

``` javascript
const TerserPlugin = require("terser-webpack-plugin");

    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin()
    ]},
```
-------


### 呼~只剩下html 還沒minify了。。 很簡單！！:rocket:

<p>把htmlplugin在 minimizer裡面</p>

```javascript
 //webpack.prod.js
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const TerserPlugin = require("terser-webpack-plugin");
 
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin(),
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true
                }
            })
    ]},
```



 
 

 
 

 
