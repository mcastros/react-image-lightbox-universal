import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        demo: './src/examples/cats/app',
    },
    output: {
        path: 'build',
        filename: 'static/[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: true,
            template: './src/examples/cats/index.html',
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
                'BABEL_ENV': JSON.stringify('production')
            },
        }),
        new ExtractTextPlugin('bundle.min.css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
        }),
    ],
    postcss: [
        autoprefixer,
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css-loader?importLoaders=1!sass','postcss','sass-loader'),
                include: path.join(__dirname, 'src/style.scss')
            },
            {
                test: /\.scss$/,
                loaders: [
                    'style-loader',
                    'css-loader?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
                    'postcss-loader',
                    'sass-loader',
                ],
                include: path.join(__dirname, 'src/examples')
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                loaders: [
                    'file-loader?name=static/[name]-[hash:6].[ext]',
                ],
                include: path.join(__dirname, 'src')
            },
        ],
    }
};
