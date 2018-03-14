const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

/*
 * Remember to use [chunkhash] for each and every bundle to
 * let the browser efficiently cache the bundles!
 * See https://webpack.js.org/guides/caching/.
 */

const extractSASS = new ExtractTextPlugin({
    allChunks: true,
    filename: 'stylesheets/styles.[contenthash].css'
    // filename: 'stylesheets/[name]-sass.[chunkhash].css'
});
// const extractCSS = new ExtractTextPlugin({
//     allChunks: true,
//     filename: 'stylesheets/[name]-css.[chunkhash].css'
// });

module.exports = merge(common, {
    // no sourcemaps in production code
    // devtool: 'source-map',
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        extractSASS,
        // extractCSS,
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.HashedModuleIdsPlugin(),
        // The CommonsChunkPlugin is *not* compatible with karma-webpack!
        // see https://github.com/webpack-contrib/karma-webpack/issues/24
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                // This prevents stylesheet resources with the .css or .scss extension
                // from being moved from their original chunk to the vendor chunk
                if (module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
                    return false;
                }
                return module.context && module.context.includes("node_modules");
            }
        }),
        // put boilerplate like runtime and manifest into a minimal bundle of its own
        // see https://webpack.js.org/guides/caching/
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: extractSASS.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            }
            // {
            //     test: /\.css$/,
            //     use: extractCSS.extract([ 'css-loader', 'postcss-loader' ])
            // }
        ]
    }
});
