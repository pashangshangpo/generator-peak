const path = require('path')

const resolve = pathName => {
  return path.resolve('.', pathName)
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve('build'),
    filename: '[contenthash].js'
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '$api': resolve('src/api'),
      '$common': resolve('src/common'),
      '$components': resolve('src/components'),
      '$store': resolve('src/store'),
      '$router': resolve('src/router'),
      '$style': resolve('src/style')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          resolve('src')
        ],
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)/,
        include: [
          resolve('src')
        ],
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'image/[name].[hash].[ext]',
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  plugins: [
  ]
}
