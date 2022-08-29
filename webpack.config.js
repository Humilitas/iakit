const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packagee = require('./package.json')

const banner = `${packagee.name}.js v${packagee.version}
(c) 2016-${(new Date()).getFullYear()} xiaoyann<0x0886@gmail.com>
Released under the MIT License.`

const config = {
  entry: './src/index.js',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    library: packagee.name,
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(styl|css)$/,
        loader: ExtractTextPlugin.extract({
          use: ['css-loader?minimize', 'postcss-loader', 'stylus-loader']
        })
      },
      {
        test: /\.(?:jpg|gif|png)$/,
        loader: 'url-loader?limit=8000'
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'global_version': JSON.stringify(packagee.version)
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('style.css'),
    new webpack.BannerPlugin(banner)
  ]
}

webpack(config, (err, stats) => {
  if (err) throw err
  // eslint-disable-next-line no-console
  console.log(stats.toString({
    colors: true,
    chunks: false,
    modules: false
  }))
})
