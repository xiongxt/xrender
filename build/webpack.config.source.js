const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
var ROOT_PATH = path.resolve(__dirname, '../');

const config = {
    entry: './src/xrender.js',
    output: {
        filename: '[name].js',
        path: path.resolve(ROOT_PATH, 'dist')
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
    }
};

module.exports = config;
