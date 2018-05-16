const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const webpack = require("webpack");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  optimization: {
    namedModules: true,
    noEmitOnErrors: true
  },
  plugins: [
    new CleanWebpackPlugin(["coverage"]),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    // see https://stackoverflow.com/questions/39131809/karma-webpack-sourcemaps-not-working
    new webpack.SourceMapDevToolPlugin({
      filename: null, // if no value is provided the sourcemap is inlined
      test: /\.(ts|js)($|\?)/i // process .js and .ts files only
    })
  ],
  module: {
    rules: [
      {
        enforce: "post",
        test: /\.(js|ts)$/,
        loader: "istanbul-instrumenter-loader",
        include: [/\.ts$/],
        exclude: [
          /\.spec\.ts$/,
          /node_modules/
        ]
      }
    ]
  }
});
