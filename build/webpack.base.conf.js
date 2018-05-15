'use strict';

const path = require('path');
var argv = require('yargs').argv;
var webpack = require('webpack');

require("babel-polyfill");

//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src');



module.exports = {

    devtool: 'cheap-module-eval-source-map',

    entry: [
        'src/index.js'
    ],

    output: {
        path: '/',
        // publicPath: 'http://localhost:8080/scripts/',
        filename: '[name].[hash].js'
    },

    devServer: {
        hot: true,
        compress: true,
        host: 'localhost',
        port: 8085
    },
    node: {
        fs: 'empty'
    },

    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["env"]
                        ]
                    }
                }
            ]
        },
        ]
    },

    plugins: [
        // new webpack.HotModuleReplacementPlugin()
        new webpack.optimize.UglifyJsPlugin({ minimize: true }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            minChunks: 3
        }),
    ]
}
