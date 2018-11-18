
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const common = require('./webpack.config.common')

const resolve = pathName => {
  return path.resolve('.', pathName)
}

let webpackConfig = merge(common, {
  mode: 'production',
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': "'production'"
      }
    }),
    new ExtractTextPlugin('style/index.css')
  ]
})

webpack(webpackConfig, (err, stats) => {
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')
})