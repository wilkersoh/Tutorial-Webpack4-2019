# Note-Webpack-2019

<h1>學習Webpack 2019</h1>
<p>遇見太多坑在webpack了 所以才生成這支資料。</p>
<p>你以為webpack只是簡簡單單打包script罷了嗎！那你就錯了，之前我也認為就那些簡單打包和babel組合。就以為已經入門webpack了</p>
<p>這裡會分享一些基礎Webpack使用功能還有坑。。。。</p>
<ul>
  <li>webpack</li>
  <li>webpack-cli</li>
  <li>style-loader</li>
  <li>css-loader</li>
  <li>scss-loader</li>
  <li>HtmlWebpackPlugin</li>
  <li>webpack-merge</li>
</ul>

<p>在webpack.config里增加<strong>[contentHash]</strong>讓系統記錄每次更換資料都會添加hast號碼，如果遊覽器已經這網頁下載后，過後還是一樣的hast號碼，它不不會再去浪費時間去下載它</p>
<code>
  entry: "./src/index.js",
    output: {
  filename: "main.<strong>[contentHash]</strong>.js",
        path: path.resolve(__dirname, "dist")
    },
</code>

<h3>記得使用這個在你的index.html里就不需要寫script去讀取去的main.js文件了。需要使用HtmlWebpackPlugin讓它自動去生成script和hash</h3>
<p>在webpack.config的index.html資料里不需要bootstrap的資料了, 有bootstrap去幫他自己去生成</p>

<h3>想對webpack拆分到更加清楚的話可以使用webpack-merge</h3>
<p>創建webpack.common.js && webpack.dev.js && webpack.prod.js 去規分使用它</p>

<code>
  //webpack.dev.js 調用webpack.common里module.exports后全部資料
  const common = require("./webpack.common");
  <hr>
  module.exports = merge(dev, { regular code })
</code>
