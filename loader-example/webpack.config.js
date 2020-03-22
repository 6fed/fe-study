var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].js',
    libraryTarget: 'commonjs2'//意味着模块用于 CommonJS 环境：
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.md$/,
        exclude: /node_modules/,
        use: [
          { loader: "html-loader" },
          {
            loader: path.resolve(__dirname, "./loaders/md.loader1.js")
          }
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'public/index.html' }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    port: 5000,
    contentBase: path.join(__dirname, 'dist')
  }

};
