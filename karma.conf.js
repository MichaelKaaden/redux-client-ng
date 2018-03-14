var webpackConfig = require('./webpack.test.js');

module.exports = function (config) {
    'use strict';

    config.set({
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // base path (one up from test, i. e. project root)
        basePath: '.',

        mime: {
            'text/x-typescript': ['ts', 'tsx']
        },

        // testing framework to use (jasmine/mocha/qunit/...)
        // as well as any additional frameworks (requirejs/chai/sinon/...)
        frameworks: [
            'jasmine',
        ],

        // list of files / patterns to load in the browser
        files: [
            'app/scripts/app.ts',
            'node_modules/angular-mocks/angular-mocks.js',
            'app/scripts/index.spec.ts'
        ],

        // list of files / patterns to exclude
        // exclude: [
        // ],

        // web server port
        port: 8082,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: [
            'PhantomJS',
            // 'Chrome',
        ],

        // Which plugins to enable
        plugins: [
            'istanbul-instrumenter-loader',
            'karma-chrome-launcher',
            'karma-coverage',
            'karma-coverage-istanbul-reporter',
            'karma-jasmine',
            'karma-jasmine-html-reporter',
            'karma-phantomjs-launcher',
            'karma-remap-coverage',
            'karma-sourcemap-loader',
            'karma-spec-reporter',
            'karma-webpack'
        ],

        client: {
            clearContext: false, // necessary for karma-jasmine-html-reporter
            jasmine: {
                random: true  // run tests in natural order
            }
        },

        reporters: [
            // 'kjhtml',
            'spec',
            'coverage',
            // 'coverage-istanbul',
            'remap-coverage'
        ],

        specReporter: {
            maxLogLines: 5,         // limit number of lines logged per test
            suppressErrorSummary: true,  // do not print error summary
            suppressFailed: false,  // do not print information about failed tests
            suppressPassed: true,  // do not print information about passed tests
            suppressSkipped: true,  // do not print information about skipped tests
            showSpecTiming: false // print the time elapsed for each spec
        },

        preprocessors: {
            'app/scripts/**/*.ts': ['webpack', 'sourcemap']
        },

        coverageReporter: {
            type: 'in-memory'
        },

        remapCoverageReporter: {
            'text-summary': null,
            json: './coverage/coverage.json',
            html: './coverage/html'
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            noInfo: true,
            stats: {
                chunks: false
            }
        },

        coverageIstanbulReporter: {
            reports: ['json-summary'],
            dir: './coverage'
        },

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true,

        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO

        // Uncomment the following lines if you are using grunt's server to run the tests
        // proxies: {
        //   '/': 'http://localhost:9000/'
        // },
        // URL root prevent conflicts with the site root
        // urlRoot: '_karma_'
    });
};
