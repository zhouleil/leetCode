const path = require('path');
const merge = require('webpack-merge')
const common = require('./webpack.common.js');

module.exports = merge(common,{
    mode: 'development',
    // 查看报错源文件
    devtool: 'inline-source-map',
    devServer: {
        contentBase:  path.join(__dirname, 'dist'),
        compress: true,
        // port: 8081,
        hot: true
    },
    devtool:'cheap-module-eval-source-map'
})