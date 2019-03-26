const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const webpack = require("webpack");

// enable this to show details in node.js' deprecation warnings
// process.traceDeprecation = true;

module.exports = {
  entry: {
    main: "./app/scripts/app.ts",
    vendor: [
      "angular",
      "angular-cookies",
      "angular-materialize",
      "angular-resource",
      "angular-route",
      "angular-touch",
      "angular-translate",
      "angular-translate-loader-static-files",
      "es6-shim",
      "jquery",
      "materialize-css"
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(process.cwd(), "dist")]
    }),
    new CopyWebpackPlugin([
      {
        from: "app/**/*.json"
      },
      {
        from: "app/favicon.ico",
        to: "favicon.ico"
      }
    ]),
    new HtmlWebpackPlugin({
      template: "./app/index.html",
      title: "redux client"
    }),
    new ForkTsCheckerWebpackPlugin({
      tslint: true
    }),
    // The CommonsChunkPlugin is *not* compatible with karma-webpack!
    // see https://github.com/webpack-contrib/karma-webpack/issues/24
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: 'vendor'
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: 'runtime'
    // }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|en/), // restrict Moment.js locale
    new webpack.ProvidePlugin({
      $: "jquery",
      Hamster: "hamsterjs",
      "window.jQuery": "jquery" // see https://github.com/krescruz/angular-materialize
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader", // compiles Sass to CSS
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 5000,
              // mimetype: 'application/font-woff',
              // name: './fonts/[name].[ext]', // Output below ./fonts
              name: "./fonts/[hash].[ext]", // Output below ./fonts
              publicPath: "../" // Take the directory into account
            }
          }
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: ["csv-loader"]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {}
          }
        ]
      },
      {
        test: /\.xml$/,
        use: ["xml-loader"]
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true // type checking happens in fork plugin
        },
        exclude: /node_modules/
        // include: path.resolve(__dirname, 'app/scripts')
      }
    ]
  },
  resolve: {
    // alias: {
    //     scripts: './app/scripts'
    // },
    extensions: [".tsx", ".ts", ".js"],

    modules: ["node_modules"]
  }
};
