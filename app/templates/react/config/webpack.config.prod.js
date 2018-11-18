
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
  if (err) {
    process.exit(0)
  }
  else {
    let assets = stats.compilation.assets
    let template = require('fs').readFileSync(resolve('public/index.html')).toString()
    let replaceHTML = ''

    Object.keys(assets).forEach(key => {
      replaceHTML += `\n  <script src="${key}"></script>`
    })

    require('fs').writeFileSync(resolve('build/index.html'), template.replace('<!-- inject script -->', replaceHTML))
  }
})