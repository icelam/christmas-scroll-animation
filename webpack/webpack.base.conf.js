const Path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: Path.resolve(__dirname, '../src/assets/js/xmas.js')
  },
  output: {
    path: Path.join(__dirname, '../dist'),
    filename: 'assets/js/[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { root: Path.resolve(__dirname, '..') }),
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, '../src/assets/images/og'), to: 'assets/images/og' }
    ]),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../src/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src'),
      '@style': Path.resolve(__dirname, '../src/assets/scss'),
      '@images': Path.resolve(__dirname, '../src/assets/images'),
      '@fonts': Path.resolve(__dirname, '../src/assets/fonts'),
      'TweenLite': Path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
      'TweenMax': Path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
      'TimelineLite': Path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
      'TimelineMax': Path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
      'animation.gsap': Path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
      'debug.addIndicators': Path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.(html|htm)(\?.*)?$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [
          Path.resolve(__dirname, '../src/assets/fonts')
        ],
        options: {
          // limit: 10000,
          limit: -1,
          name: 'assets/images/[ext]/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // limit: 10000,
          limit: -1,
          name: 'assets/media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [
          Path.resolve(__dirname, '../src/assets/images')
        ],
        options: {
          // limit: 10000,
          limit: -1,
          name: 'assets/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  }
};
