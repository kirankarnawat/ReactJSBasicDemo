const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { createWebpackDevConfig } = require("@craco/craco");
const cracoConfig = require("./craco.config.js");
const webpackConfig = createWebpackDevConfig(cracoConfig);


module.exports = {
   
    // webpack will take the files from ./src/index
    entry: './src/index',

    // and output it into /dist as bundle.js
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'bundle.js',
    },

    // adding .ts and .tsx to resolve.extensions will help babel look for .ts and .tsx files to transpile
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },

    module: {
        rules: [

            // we use babel-loader to load our jsx and tsx files
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            },

            // css-loader to bundle all the css files into one file and style-loader to add all the styles  inside the style tag of the document
            {
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader']
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
        //port: 9000
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
    ]
};

module.exports = webpackConfig;
