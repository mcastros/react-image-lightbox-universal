import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'react-image-lightbox': './src/index',
    },
    output: {
        path: path.join(__dirname, 'dist', 'umd'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'ReactImageLightbox',
    },
    resolve: {
        extensions: ['', '.js']
    },
    devtool: 'source-map',
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('bundle.min.css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
        }),
    ],
    externals: {
        react: 'react',
        'react-dom': 'react-dom',
        'react-modal': 'react-modal',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css-loader','sass-loader'),
                include: path.join(__dirname, 'src')
            },
        ]
    }
};
