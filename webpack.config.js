const webpack = require('webpack'),
path = require('path'),
HtmlWebpackPlugin = require('html-webpack-plugin'),
ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'),
CleanWebpackPlugin = require('clean-webpack-plugin'),
buildDirectory = path.resolve(__dirname, 'build'),
isDevelopment = (process.env.NODE_ENV !== 'production'),
port = process.env.PORT || 8000;

var enableHMR = true, generateManifest = true, generateReport = false, WebpackAssetsManifest, BundleAnalyzerPlugin
enableHMR = isDevelopment ? enableHMR : false //HMR always false for prod build
WebpackAssetsManifest = generateManifest && require('webpack-assets-manifest')
BundleAnalyzerPlugin = generateReport && require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const rules = [
    {
        test: /\.js$/,
        loader: 'babel-loader'
    },
    {
        test: /\.less$/,
        use: ExtractTextWebpackPlugin.extract({
            fallback: 'style-loader',
            publicPath: '../',
            use: [
                //minimize css in prod build to avoid bundling newline chars in js chunk
                { loader: 'css-loader', options: { sourceMap: isDevelopment, minimize: !isDevelopment } },
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
]

const plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new ExtractTextWebpackPlugin({
        filename: 'style/[contenthash:20].css',
        disable: enableHMR
    }),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
        favicon: path.resolve(__dirname, 'src/img/favicon.png')
    }),
    // To prevent longterm cache of vendor chunks
    // extract a 'manifest' chunk, then include it to the app
    new webpack.optimize.CommonsChunkPlugin({
        names: [ 'manifest' ]
    })
]

generateManifest && plugins.push(
    new WebpackAssetsManifest({
        output: path.resolve(buildDirectory, 'webpack-manifest.json'),
        writeToDisk: true
    })
)

generateReport && plugins.push(
    new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: path.resolve(__dirname, 'report.html'),
        openAnalyzer: false
    })
)

const devPlugins = enableHMR ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
] : new Array()

const buildPlugins = [
    new CleanWebpackPlugin(
        buildDirectory
    ),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            drop_console: true
        }
    })
]

let mainEntry = [ path.resolve(__dirname, 'src/js/main') ]
isDevelopment && mainEntry.push('react-hot-loader/patch')

module.exports = {

    entry: {
        main: mainEntry,
        lib: [ 'es6-promise', 'react', 'react-dom' ]
    },

    output: {
        path: buildDirectory,
        //HMR requires [hash]. It doesn't work with [chunkhash]
        filename: enableHMR ? 'js/[name].[hash:20].js' : 'js/[name].[chunkhash:20].js'
    },

    module: {
        rules: rules
    },

    devtool: isDevelopment ? 'source-map' : false,

    plugins: isDevelopment ? [].concat(plugins, devPlugins) : [].concat(plugins, buildPlugins),

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
}
