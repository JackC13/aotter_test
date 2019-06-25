var path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'production',
  entry: {
    'main':'./sdk/entry.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'sdk.bundle.js'
  },    
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
            // 需要用到的 loader
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
        ]
    }
  ]
  },    
  plugins: [
    new MiniCssExtractPlugin({
        // 指定輸出位置
        // [name] 為上方進入點設定的 "名稱"
        filename: "./[name].css"
    })
  ]
};