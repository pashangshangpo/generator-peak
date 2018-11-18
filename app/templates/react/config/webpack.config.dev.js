
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const common = require('./webpack.config.common')

const resolve = pathName => {
  return path.resolve('.', pathName)
}

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [
          resolve('src')
        ],
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            }
          ]
        }))
      }
    ]
  },
  devtool: 'eval-source-map',
  plugins: [
    new ExtractTextPlugin('style/index.css'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': "'production'"
      }
    })
  ]
})