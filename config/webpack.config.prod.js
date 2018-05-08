const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('@nuxtjs/friendly-errors-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const paths = require('./paths');

const getClientEnvironment = require('./getEnvironment');

// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
module.exports = {
  // These are the "entry points" to our application.
  // This means they will be the "root" imports that are included in JS bundle.
  entry: [paths.appIndexJs],
  mode: 'production',
  stats: 'errors-only', // Only output when errors happen
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
    modules: [paths.appScss, paths.appNodeModules, paths.appSrc],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    plugins: [new TsconfigPathsPlugin({ configFile: paths.appTsConfigJson })],
  },
  module: {
    rules: [
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          // "url" loader works like "file" loader except that it embeds assets
          // smaller than specified limit in bytes as data URLs to avoid requests.
          // A missing `test` is equivalent to a match.
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          // Compile .tsx
          {
            test: /\.(ts|tsx)$/,
            include: paths.appSrc,
            exclude: /node_modules/,
            use: [
              {
                loader: require.resolve('thread-loader'),
              },
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
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // "style" loader turns CSS into JS modules that inject <style> tags.
          // "sass" loader loads a Sass/SCSS file and compiles it to CSS.
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
          // "file" loader makes sure those assets get served by WebpackDevServer.
          // When you `import` an asset, you get its (virtual) filename.
          // In production, they would get copied to the `build` folder.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            exclude: [/\.(ts|tsx|js|jsx)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      // ** STOP ** Are you adding a new loader?
      // Make sure to add the new loader(s) before the "file" loader.
    ],
  },
  plugins: [
    // A webpack plugin to remove/clean your build folder(s) before building
    new CleanWebpackPlugin([paths.appBuild], {
      root: paths.appRoot,
      beforeEmit: true,
    }),
    // Elegant ProgressBar and Profiler for Webpack
    new WebpackBar({
      profile: true,
    }),
    // Generates an `index.html` file with the <script> injected.
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
    //  It creates a CSS file per JS file which contains CSS. It supports On-Demand-Loading of CSS and SourceMaps.
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[chunkhash:8].css',
      chunkFilename: 'static/css/[name].[chunkhash:8].chunk.css',
    }),
    // Friendly-errors-webpack-plugin recognizes certain classes of webpack errors and cleans,
    // aggregates and prioritizes them to provide a better Developer Experience.
    new FriendlyErrorsWebpackPlugin(),
    // Makes webpack ignore declaration files
    new webpack.IgnorePlugin(/\.d\.ts$/),
    // Copies individual files or entire directories to the build directory
    new CopyWebpackPlugin([
      { from: './public/img', to: 'img' },
      { from: './public/fonts', to: 'fonts' },
    ], {
      copyUnmodified: false,
    }),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: paths.appTsConfigJson,
      tslint: paths.appTsLintJson,
      watch: paths.appSrc,
      async: false,
      checkSyntacticErrors: true,
    }),
    new webpack.DefinePlugin(getClientEnvironment().stringified),
    new WorkboxPlugin.GenerateSW({
      swDest: paths.appServiceWorker,
      // clientsClaim instructs the latest service worker
      // to take control of all clients as soon as it's activated.
      clientsClaim: true,
      // skipWaiting instructs the latest service worker
      // to activate as soon as it enters the waiting phase.
      skipWaiting: true,
    }),
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};
