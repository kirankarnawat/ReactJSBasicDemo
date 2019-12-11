const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const { createWebpackDevConfig } = require("@craco/craco");
const cracoConfig = require("./craco.config.js");
const webpackConfig = createWebpackDevConfig(cracoConfig);

module.exports = {

    // webpack will take the files from ./src/index
    entry: './src/index',
    //entry: ["@babel/polyfill", "./src/index"],

    mode: 'production',
    devtool: 'source-map',

    // and output it into /dist as bundle.js
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
        publicPath: "/"
    },

    // adding .ts and .tsx to resolve.extensions will help babel look for .ts and .tsx files to transpile
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },

    module: {
        rules: [

            // we use babel-loader to load our jsx and tsx files
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    { loader:  'babel-loader' },
                    {
                        loader: 'babel-loader', options: {
                            babelrc: true, plugins: [
                                ['import', { libraryName: "antd", style: true }]
                            ]
                        }
                    },
                    { loader: 'ts-loader' }
                ]
            },

            // css-loader to bundle all the css files into one file and style-loader to add all the styles  inside the style tag of the document
            {
                test: /\.(css)$/,
                use: [
                    {
                        loader: 'style-loader', // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    }
                ],
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader', // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                        options: {
                            javascriptEnabled: true
                        }
                    },
                ],
            },
            {
                test: /\.js$/,
                use: ["source-map-loader"],
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf|ico)(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'file-loader',
                }
            }
        ]
    },
    devServer: {
        compress: true,
        contentBase: __dirname,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: "./index.html"
        }),
        new CopyWebpackPlugin([
            { from: 'src/lib/lms.js' },
            { from: './public/favicon.ico' },
            { from: './public/manifest.json', to: './manifest.json' }
        ]),
        new webpack.DefinePlugin({
            "process.env.REACT_APP_APP_BASE_URL": "'http://192.168.0.7:3000/'",
            "process.env.REACT_APP_REMOTE_SERVICE_BASE_URL": "'http://192.168.5.190/DLLMSAPI/api/'",
            "process.env.PUBLIC_URL": "'/'"
        })
    ]
};

//module.exports = webpackConfig;
