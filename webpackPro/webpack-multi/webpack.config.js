const path = require("path")
const fs = require("fs")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');

const dirs = fs.readdirSync(path.resolve(__dirname, 'src'))
const copyOptions = {};

const htmlChunks = [];

const entrys = {};
if (dirs && dirs.length > 0) {
  dirs.forEach(dir => {
    if (dir !== 'common')  {
      entrys[dir] = path.join(__dirname, 'src', dir, 'js/index.js')
      htmlChunks.push(
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, 'src', dir, 'index.html'),
          chunks: [dir],
          filename: dir + ".html"
        })
      )
    }
  })
}

module.exports = {
  mode: 'development',
  entry: entrys,
  output: {
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: "vendor.js"
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          // {
          //   loader: 'style-loader'
          // },
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader'
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    ...htmlChunks
    // new CopyPlugin(copyOptions)
  ]
}