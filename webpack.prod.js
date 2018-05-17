const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const webpack = require("webpack");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

/*
 * Remember to use [chunkhash] for each and every bundle to
 * let the browser efficiently cache the bundles!
 * See https://webpack.js.org/guides/caching/.
 */

const extractSASS = new ExtractTextPlugin({
  allChunks: true,
  filename: "stylesheets/styles.[chunkhash].css"
  // filename: 'stylesheets/[name]-sass.[chunkhash].css'
});
// const extractCSS = new ExtractTextPlugin({
//     allChunks: true,
//     filename: 'stylesheets/[name]-css.[chunkhash].css'
// });

module.exports = merge(common, {
  mode: "production",
  // no sourcemaps in production code
  // devtool: 'source-map',
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "dist")
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    },
    runtimeChunk: {
      name: "manifest"
    }
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    extractSASS,
    // extractCSS,
    new webpack.HashedModuleIdsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractSASS.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: true
              }
            },
            {
              loader: "sass-loader"
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
