const path = require('path')

module.exports = function (env, content) {
  return {
    mode: 'development',
    entry: {
      main: path.resolve(__dirname, 'src/js/index.js')
    },
    output: {
      filename: 'index.js',
      chunkFilename: 'vendor.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules|common/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      }
    }
  }
}