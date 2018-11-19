
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const common = require('./webpack.config.common')

const resolve = pathName => {
  return path.resolve('.', pathName)
}

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 
          'style-loader',
          {loader: 'css-loader',options: {importLoaders: 2}},
          {loader: 'postcss-loader',options:{ident:"postcss",plugins:[require("autoprefixer")("last 100 versions")]}},
          'sass-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [ 
          'style-loader',
          {loader: 'css-loader',options: {importLoaders: 2}},
          {loader: 'postcss-loader',options:{ident:"postcss",plugins:[require("autoprefixer")("last 100 versions")]}},
          'sass-loader'
        ]
      }
    ]
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': "'development'"
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
})