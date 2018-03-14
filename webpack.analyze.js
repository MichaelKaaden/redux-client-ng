const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.prod');
const webpack = require('webpack');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
    plugins: [
        new BundleAnalyzerPlugin()
    ]
});
