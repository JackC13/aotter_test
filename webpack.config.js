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
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
        ]
    }
  ]
  },    
  plugins: [
    new MiniCssExtractPlugin({
        filename: "./[name].css"
    })
  ]
};