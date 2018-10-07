var HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');


module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [ {
        test: /\.mustache$/,
        loader: 'mustache-loader'
        // loader: 'mustache?minify'
        // loader: 'mustache?{ minify: { removeComments: false } }'
        // loader: 'mustache?noShortcut'
    },{
      test:/\.css$/,
      use:['style-loader','css-loader']
    }
  ]
  },
  resolve: {
    alias: {
      Templates: path.resolve(__dirname, './src/templates/'),
      Utils: path.resolve(__dirname, './src/utils/'),
    }
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        mustacheLoader: {}
      }
    }), 
    new HtmlWebpackPlugin({
      template: 'index.mustache',
      inject: 'body',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
 ]
};