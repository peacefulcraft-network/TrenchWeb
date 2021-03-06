/* eslint-disable */
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "bin"),
    filename: "app.[hash:8].js",
    chunkFilename: "[name].bit.[hash:8].js",
    publicPath: "/"
  },
  devtool: "source-map",
  target: "web",
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    hot: true,
    disableHostCheck: true
  },
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: { test: /[\\/]node_modules[\\/]/, name: "common", chunks: "all" }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    })
  ]
}