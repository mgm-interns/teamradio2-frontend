const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const WebpackBar = require('webpackbar');
const FriendlyErrorsWebpackPlugin = require('@nuxtjs/friendly-errors-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const paths = require('./paths');

module.exports = {
  entry: [paths.appIndexJs],
  mode: 'production',
  stats: 'errors-only',
  output: {
    path: paths.appBuild,
    filename: 'static/js/[name].bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    plugins: [new TsconfigPathsPlugin({ configFile: paths.appTsConfigJson })],
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(ts|tsx)$/,
            include: paths.appSrc,
            exclude: /node_modules/,
            use: [
              {
                loader: require.resolve('babel-loader'),
                options: {
                  compact: true,
                  highlightCode: true,
                },
              },
              {
                loader: require.resolve('ts-loader'),
                options: {
                  happyPackMode: true,
                  configFile: paths.appTsConfigJson,
                },
              },
            ],
          },
          {
            test: /\.(scss|css)$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  minimize: true,
                },
              },
              {
                loader: require.resolve('sass-loader'),
                options: { workParallelJobs: 2 },
              },
            ],
          },
          {
            exclude: [/\.(ts|tsx|js|jsx)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([paths.appBuild], {
      root: paths.appRoot,
      beforeEmit: true,
    }),
    new WebpackBar({
      profile: true,
    }),
    new Dotenv(),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[chunkhash:8].css',
      chunkFilename: 'static/css/[name].[chunkhash:8].chunk.css',
    }),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.IgnorePlugin(/\.d\.ts$/), // Makes webpack ignore declaration files
    new CopyWebpackPlugin([{ from: './public/img', to: 'img' }], {
      copyUnmodified: false,
    }),
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  performance: {
    hints: false,
  },
};
