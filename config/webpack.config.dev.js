const webpack = require('webpack');
const os = require('os');

const Dotenv = require('dotenv-webpack');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const FriendlyErrorsWebpackPlugin = require('@nuxtjs/friendly-errors-webpack-plugin');

const paths = require('./paths');

module.exports = {
  entry: [paths.appIndexJs],
  mode: 'development',
  output: {
    path: paths.appBuild,
    filename: 'static/js/[name].bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    plugins: [new TsconfigPathsPlugin({ configFile: paths.appTsConfigJson })],
  },
  stats: 'errors-only',
  serve: {
    dev: {
      stats: 'none', // Silent webpack since it's not necessary.
      publicPath: '/',
    },
    port: 3000,
    logLevel: 'warn',
    add: (app, middleware, options) => {
      app.use(convert(history({})));
    },
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
                loader: require.resolve('cache-loader'),
              },
              {
                loader: require.resolve('thread-loader'),
                options: {
                  workers: os.cpus().length - 2, // one for system, one for fork-ts-checker-webpack-plugin
                },
              },
              {
                loader: require.resolve('babel-loader'),
                options: {
                  cacheDirectory: true,
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
              {
                loader: require.resolve('style-loader'),
                options: { sourceMap: true },
              },
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  sourceMap: true,
                },
              },
              {
                loader: require.resolve('sass-loader'),
                options: { sourceMap: true, workParallelJobs: 2 },
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
    new WebpackBar(),
    new Dotenv(),
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
    }),
    new FriendlyErrorsWebpackPlugin(),
    new CopyWebpackPlugin([{ from: './public/img', to: 'img' }], {
      copyUnmodified: false,
    }),
    new webpack.IgnorePlugin(/\.js$/, /\.d\.ts$/), // Makes webpack ignore declaration files
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};
