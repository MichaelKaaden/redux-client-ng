const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const webpack = require("webpack");

module.exports = merge(common, {
  mode: "none",
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
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        path.resolve(process.cwd(), "coverage")
      ]
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    // see https://stackoverflow.com/questions/39131809/karma-webpack-sourcemaps-not-working
    new webpack.SourceMapDevToolPlugin({
      filename: null, // if no value is provided the sourcemap is inlined
      test: /\.(ts)($|\?)/i // process .js and .ts files only
    })
  ],
  module: {
    rules: [
      {
        enforce: "post",
        test: /\.(js|ts)$/,
        loader: "istanbul-instrumenter-loader",
        include: [/\.ts$/],
        exclude: [/\.spec\.ts$/, /node_modules/]
      }
    ]
  }
});
