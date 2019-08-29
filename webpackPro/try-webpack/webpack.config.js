const path = require('path');
const webpack = require('webpack');
// 将hmtl打包
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 提取css, webpack4 不在使用 extract-text-webpack-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// console.log(path.resolve(__dirname,'dist')); // 物理地址拼接
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const env = process.env.NODE_ENV;
const devMode = env !== 'production';

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname , 'dist'),
        filename: '[name]-[chunkhash:10].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: 'babel-loader'
            },
            {
                test: /\.css/,
                use: [
                  { loader: 'style-loader', options: { sourceMap: true } },
                  { loader: 'css-loader', options: { sourceMap: true } },
                  { loader: 'postcss-loader', options: { sourceMap: true } },
                ]
            },
            {
                test: /\.less$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                        publicPath: (resourcePath, context) => {
                            // publicPath is the relative path of the resource to the context
                            // e.g. for ./css/admin/main.css the publicPath will be ../../
                            // while for ./css/main.css the publicPath will be ../
                            return path.relative(path.dirname(resourcePath), context) + '/';
                        },
                        },
                    },
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.scss$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                        publicPath: (resourcePath, context) => {
                            // publicPath is the relative path of the resource to the context
                            // e.g. for ./css/admin/main.css the publicPath will be ../../
                            // while for ./css/main.css the publicPath will be ../
                            return path.relative(path.dirname(resourcePath), context) + '/';
                        },
                        },
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            }, 
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js','.json','.jsx', '.less','.scss','.css'],
        alias: {
            '@':  path.resolve(__dirname, 'src')
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: JSON.stringify('production')
            }
        }),        
        new MiniCssExtractPlugin('styles/css/[name]-[contenthash:10].css'),  // [name] 默认 也可以自定义name 声明使用
        new webpack.ProvidePlugin({
            _: 'lodash'
        }),
        new HtmlWebpackPlugin({
            file: 'index.html',
            template: 'public/index.html'
        }),
        // https://www.webpackjs.com/guides/caching/#%E8%BE%93%E5%87%BA%E6%96%87%E4%BB%B6%E7%9A%84%E6%96%87%E4%BB%B6%E5%90%8D-output-filenames-
        // HashedModuleIdsPlugin 保证提出的vendor hash不随项目文件改变
        new webpack.HashedModuleIdsPlugin(),
        new CopyWebpackPlugin([ // src下其他的文件直接复制到 dist 目录下
            {from: 'public/favicon.ico', to: 'favicon.ico'}
        ]),
        new webpack.ProvidePlugin({ // 引用框架 jquery lodash 工具库是很多组件会复用的，省去了import
            '_': 'lodash'
        })
    ],
    optimization: {    
        runtimeChunk: true,
        splitChunks:{
            chunks:'async'//分割异步打包的代码，
        }
    },    
    devServer: {
        port: '9004',
        hot: true,
        // contentBase: [path.join(__dirname, "public"), path.join(__dirname, "src")],
        before(app) {
            app.get('/api/test.json', (req,res) => {
                res.json({
                    code: 200,
                    message: 'Hello World'
                })
            })
        }
    }
}