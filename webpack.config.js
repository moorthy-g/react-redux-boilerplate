const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const buildDirectory = path.resolve(__dirname, 'build');
const isDevelopment = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 8000;

let enableHMR = true;
let generateManifest = true;
let generateReport = false;
let WebpackAssetsManifest, BundleAnalyzerPlugin;

enableHMR = isDevelopment ? enableHMR : false; //HMR always false for prod build
WebpackAssetsManifest = generateManifest && require('webpack-assets-manifest');
BundleAnalyzerPlugin = generateReport && require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const rules = [
  {
    test: /\.js$/,
    include: path.resolve(__dirname, 'src'),
    loader: 'babel-loader',
    options: {
      cacheDirectory: true
    }
  },
  {
    test: /\.less$/,
    use: ExtractTextWebpackPlugin.extract({
      fallback: 'style-loader',
      publicPath: '../',
      use: [
        //minimize css in prod build to avoid bundling newline chars in js chunk
        {
          loader: 'css-loader',
          options: { sourceMap: isDevelopment, minimize: !isDevelopment }
        },
        { loader: 'postcss-loader', options: { sourceMap: isDevelopment } },
        { loader: 'less-loader', options: { sourceMap: isDevelopment } }
      ]
    })
  },
  {
    test: /\.(jpe?g|png|gif|webp|svg)$/,
    loader: 'file-loader?name=img/[name].[hash:8].[ext]'
  },
  {
    test: /\.(woff|woff2|ttf|eot)$/,
    loader: 'file-loader?name=font/[name].[hash:8].[ext]'
  }
];

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV || 'development'
    )
  }),
  new ExtractTextWebpackPlugin({
    filename: 'style/[name].[contenthash:20].css',
    disable: enableHMR
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src/index.html'),
    favicon: path.resolve(__dirname, 'src/img/favicon.png'),
    minify: isDevelopment
      ? false
      : {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
  }),
  // To prevent longterm cache of vendor chunks
  // extract a 'manifest' chunk, then include it to the app
  new webpack.optimize.CommonsChunkPlugin({
    names: ['manifest']
  }),
  // Prevent importing all moment locales
  // You can remove this if you don't use Moment.js:
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
];

generateManifest &&
  plugins.push(
    new WebpackAssetsManifest({
      output: path.resolve(buildDirectory, 'webpack-manifest.json'),
      writeToDisk: true
    })
  );

generateReport &&
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: path.resolve(__dirname, 'report.html'),
      openAnalyzer: false
    })
  );

const devPlugins = enableHMR
  ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ]
  : new Array();

const buildPlugins = [
  new CleanWebpackPlugin(buildDirectory),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: true
    },
    mangle: {
      safari10: true,
    }
  })
];

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/js/main'),
    lib: ['es6-promise']
  },

  output: {
    path: buildDirectory,
    //HMR requires [hash]. It doesn't work with [chunkhash]
    filename: enableHMR
      ? 'js/[name].[hash:20].js'
      : 'js/[name].[chunkhash:20].js'
  },

  module: {
    rules: rules
  },

  devtool: isDevelopment ? 'source-map' : false,

  plugins: isDevelopment
    ? [].concat(plugins, devPlugins)
    : [].concat(plugins, buildPlugins),

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.css'],
    descriptionFiles: ['package.json', 'bower.json', '.bower.json']
  },

  devServer: {
    host: '0.0.0.0',
    port: port,
    disableHostCheck: true,
    inline: true,
    hot: enableHMR,
    compress: true,
    stats: 'errors-only'
  },

  stats: 'minimal',

  watchOptions: {
    ignored: /(node_modules)/
  }
};
