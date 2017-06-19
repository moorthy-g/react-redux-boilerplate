const webpack = require('webpack'),
path = require('path'),
HtmlWebpackPlugin = require('html-webpack-plugin'),
ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'),
CleanWebpackPlugin = require('clean-webpack-plugin'),
buildDirectory = path.resolve(__dirname, 'build'),
isDevelopment = (process.env.NODE_ENV !== 'production'),
port = process.env.PORT || 8000;

const rules = [
    {
        test: /\.js$/,
        loader: 'babel-loader'
    },
    {
        test: /\.less$/,
        use: ExtractTextWebpackPlugin.extract({
            fallback: 'style-loader',
            use: [
                //minimize css in build to avoid bundling newline chars in js chunk
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
        disable: false
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


module.exports = {

    entry: {
        main: path.resolve(__dirname, 'src/js/main'),
        lib: [ 'jquery' ]
    },

    output: {
        path: buildDirectory,
        publicPath: '/',
        filename: 'js/[name].[chunkhash].js'
    },

    module: {
        rules: rules
    },

    devtool: isDevelopment ? 'source-map' : false,

    plugins: isDevelopment ? plugins : [].concat(plugins, buildPlugins),

    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.css'],
        descriptionFiles: ['package.json', 'bower.json', '.bower.json']
    },

    devServer: {
        host: '0.0.0.0',
        port: port,
        inline: true,
        compress: true
    },

    stats: 'minimal',

    watchOptions: {
        ignored: /(node_modules)/
    }
}
