let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let helpers = require('./helpers');

const extractCss = new ExtractTextPlugin({
    filename: "assets/[name].[hash].css"
});

module.exports = {
    entry: {
        'app': './src/main.ts'
    },

    resolve: {
        extensions: ['.ts', '.js', 'sass']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [{
                    loader: 'awesome-typescript-loader',
                    options: {configFileName: helpers.root('src', 'tsconfig.json')}
                }]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                loader: extractCss.extract({
                    loader: [
                        {
                            loader: "css-loader?importLoaders=1"
                        },
                        {
                            loader: "postcss-loader"
                        }
                    ],
                    fallbackLoader: "style-loader"
                })
            },
            {
                test: /\.scss$/,
                loader: extractCss.extract({
                    loader: [
                        {
                            loader: "css-loader?importLoaders=1"
                        },
                        {
                            loader: "postcss-loader"
                        },
                        {
                            loader: "sass-loader"
                        }
                    ],
                    fallbackLoader: "style-loader"
                })
            }
        ]
    },

    plugins: [

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app']
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),

        extractCss
    ]
};