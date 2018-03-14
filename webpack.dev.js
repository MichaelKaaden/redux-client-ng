const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: '/dist',
        hot: true,
        historyApiFallback: true,  // without this, any URL beyond / won't work, see https://webpack.js.org/configuration/dev-server/#devserver-historyapifallback
        port: 9000
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
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
    ]
});
