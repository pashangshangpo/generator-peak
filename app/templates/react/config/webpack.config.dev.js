
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
        include: [
          resolve('src')
        ],
        use: ['style-loader', 'css-loader']
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