const path = require("path")
const fs = require("fs")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const dirs = fs.readdirSync(path.resolve(__dirname, 'src'))

const copyOptions = {
  patterns: []
}

const htmlChunks = []

const entrys = {}

if (dirs && dirs.length > 0) {
  dirs.forEach(dir => {
    if (dir !== 'common') {
      const page = `${dir}/${dir}`

      entrys[page] = path.resolve(__dirname, 'src', dir, 'js/index.js')

      htmlChunks.push(
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, 'src', dir, 'index.html'),
          chunks: [page],
          filename: page + ".html"
        })
      )
      copyOptions.patterns.push(
        {
          from: 'dist/' + dir + '.*',
          to: path.join(__dirname, 'dist', dir, '/'),
          context: __dirname,
          flatten: true,
        },
        {
          from: path.join(__dirname, 'dist/vendor.js'),
          to: path.join(__dirname, 'dist', dir)
        }
      )
    }
  })
}

module.exports = (env, argv) => {
  return {
    mode: 'development',
    entry: entrys,
    output: {
      path: path.resolve(__dirname, 'dist'),
      chunkFilename: "common/vendor.js"
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
    optimization: argv.mode === 'production' ?
      {
        splitChunks: {
          chunks: 'all'
        }
      } :
      {}
    ,
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [path.join(__dirname, 'dist/*')]
      }),
      new MiniCssExtractPlugin(),
      ...htmlChunks,
      // new CopyPlugin(copyOptions)
    ],
    devServer: {
      port: 9002,
      contentBase: path.join(__dirname, 'dist')
    }
  }
}