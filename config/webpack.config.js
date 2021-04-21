const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = () => ({
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js',
    chunkFilename: '[name].[contenthash].js',
    publicPath: '/',
  },
  entry: {
    main: path.resolve(__dirname, '../src/index.tsx'),
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                '@babel/plugin-transform-runtime',
                '@babel/plugin-syntax-dynamic-import',
                ['babel-plugin-import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
              ],
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
        exclude: [
          /node_modules\//,
        ],
      },
      {
        test: /\.css$/i,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.less$/i,
        exclude: [/node_modules/, /module\.(css|less)/],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          'less-loader',
        ],
      },
      {
        test: /module\.(css|less)$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'less-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['*', '.ts', '.js', '.tsx', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].css',
      ignoreOrder: true,
    }),
    new webpack.ContextReplacementPlugin(
      /moment[/\\]locale$/,
      /zh-cn/,
    ),
  ],
});
