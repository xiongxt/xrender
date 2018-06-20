const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
var ROOT_PATH = path.resolve(__dirname, '../');

const config = {
    entry: './example/js/index.js',
    // output: {
    //     filename: 'js/[name].js',
    //     path: path.resolve(ROOT_PATH, 'dist')
    //     // publicPath: "/dist/"
    // },
    devServer: {
        contentBase: './dist', // dist为你需要注册静态服务的文件夹
        port: '8091', // 端口
        inline: true, // 表示代码修改后页面自动刷新
        hot: true // 便是模块热替换
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [['env']]
                        }
                    }
                ]
            },
            {
                test: /\.js?$/,
                enforce: 'pre',
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'eslint-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './example/index.html', // html源文件所在位置
            filename: 'index.html', // 输出文件的文件名
            minify: {
                removeAttributeQuotes: true, // 移除属性的引号
                removeComments: true, // 移除注释
                removeEmptyAttributes: true, // 移除空属性
                collapseWhitespace: true // 移除空格
            }
        })
    ]
};

module.exports = config;
