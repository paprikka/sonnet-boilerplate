module.exports = function(config) {
  config.set({

    autoWatch: true,
    singleRun: false,
    basePath: '',

    frameworks: ['chai', 'mocha', 'sinon-chai', 'commonjs'],

    files: [
    'test/**/*.spec.js',
    'src/utils/events/helpers.js',
    'src/utils/log.js'
    ],

    exclude: [],

    preprocessors: {
      'test/**/*.spec.js': ['babel', 'sourcemap', 'commonjs'],
      'src/**/*.js': ['babel', 'sourcemap', 'commonjs']
    },

    babelPreprocessor: {
      options: {
        sourceMap: 'inline'
      }
    },

    reporters: ['nyan'],

    mochaReporter: {
      output: 'full'
    },

    plugins: [
      "karma-mocha",
      "karma-chai",
      "karma-sinon-chai",
      "karma-commonjs",
      "karma-babel-preprocessor",
      "karma-nyan-reporter",
      "karma-chrome-launcher",
      "karma-phantomjs-launcher",
      "karma-sourcemap-loader"
    ],

    browsers: ['Chrome'],

    phantomjsLauncher: {
      exitOnResourceError: true
    }
  });
};