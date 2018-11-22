
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const common = require('./webpack.config.common')

const resolve = (...arg) => {
  return path.resolve('.', ...arg)
}

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: resolve('build'),
    filename: '[name].[contenthash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [
          resolve('src')
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 
            {loader: 'css-loader',options: {importLoaders: 2}},
            {loader: 'postcss-loader',options:{ident:"postcss",plugins:[require("autoprefixer")("last 100 versions")]}},
            'sass-loader'
          ]
        })
      },
      {
        test: /\.scss$/,
        include: [
          resolve('src')
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 
            {loader: 'css-loader',options: {importLoaders: 2}},
            {loader: 'postcss-loader',options:{ident:"postcss",plugins:[require("autoprefixer")("last 100 versions")]}},
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': "'production'"
      }
    }),
    new ExtractTextPlugin('style/index.css')
  ]
})