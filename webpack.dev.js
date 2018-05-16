const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const webpack = require("webpack");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "/dist",
    hot: true,
    historyApiFallback: true,  // without this, any URL beyond / won't work, see https://webpack.js.org/configuration/dev-server/#devserver-historyapifallback
    port: 9000
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  optimization: {
    namedModules: true,
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
    new webpack.HotModuleReplacementPlugin()
  ]
});
