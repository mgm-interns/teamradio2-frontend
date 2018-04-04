const webpack = require('webpack');
const os = require('os');

const Dotenv = require('dotenv-webpack');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const FriendlyErrorsWebpackPlugin = require('@nuxtjs/friendly-errors-webpack-plugin');

const paths = require('./paths');

module.exports = (env = {}) => {
  return {
    entry: [paths.appIndexJs],
    mode: 'development',
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
      runtimeChunk: true,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      plugins: [new TsconfigPathsPlugin({ configFile: paths.appTsConfigJson })],
    },
    stats: 'errors-only',
    devtool: 'eval',
    devServer: {
      contentBase: paths.appBuild,
      port: 3000,
      compress: false,
      hot: true,
      open: true,
      historyApiFallback: true,
    },
    module: {
      rules: [
        { parser: { requireEnsure: false } },
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
                    importLoaders: 2,
                    sourceMap: true,
                  },
                },
                {
                  loader: require.resolve('sass-loader'),
                  options: { sourceMap: true },
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
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new Dotenv(),
      new HtmlWebpackPlugin({
        inject: true,
        template: './public/index.html',
      }),
      new FriendlyErrorsWebpackPlugin(),
      new CopyWebpackPlugin([{ from: './public/img', to: 'img' }], {
        copyUnmodified: false,
      }),
      new webpack.IgnorePlugin(/\.d\.ts$/), // Makes webpack ignore declaration files
    ],
    node: {
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },
  };
};
