const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const WebpackBar = require('webpackbar');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('@nuxtjs/friendly-errors-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const paths = require('./paths');

const getClientEnvironment = require('./getEnvironment');

// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
// The production configuration is different and lives in a separate file.
module.exports = {
  // These are the "entry points" to our application.
  // This means they will be the "root" imports that are included in JS bundle.
  entry: [paths.appIndexJs],
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: paths.appBuild,
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: 'static/js/[name].bundle.js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: 'static/js/[name].chunk.js',
    // Webpack uses `publicPath` to determine where the app is being served from.
    // In development, we always serve from the root. This makes config easier.
    publicPath: '/',
  },
  resolve: {
    modules: [paths.appScss, paths.appNodeModules, paths.appSrc],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    plugins: [new TsconfigPathsPlugin({ configFile: paths.appTsConfigJson })],
  },
  stats: 'errors-only', // Only output when errors happen
  serve: {
    dev: {
      stats: 'none', // Silent webpack since it's not necessary.
      publicPath: '/',
    },
    open: true,
    port: 8080,
    logLevel: 'warn',
    add: (app, middleware, options) => {
      app.use(convert(history({})));
    },
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
                  cacheDirectory: true,
                  highlightCode: true,
                },
              },
              {
                loader: require.resolve('ts-loader'),
                options: {
                  happyPackMode: true,
                  configFile: paths.appTsConfigJson,
                  transpileOnly: true,
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
                options: { sourceMap: true },
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
    // Elegant ProgressBar and Profiler for Webpack
    new WebpackBar(),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
    }),
    // Friendly-errors-webpack-plugin recognizes certain classes of webpack errors and cleans,
    // aggregates and prioritizes them to provide a better Developer Experience.
    new FriendlyErrorsWebpackPlugin(),
    // Copies individual files or entire directories to the build directory
    new CopyWebpackPlugin([
      { from: './public/img', to: 'img' },
      { from: './public/fonts', to: 'fonts' },
    ], {
      copyUnmodified: false,
    }),
    // Makes webpack ignore declaration files
    new webpack.IgnorePlugin(/\.js$/, /\.d\.ts$/),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: paths.appTsConfigJson,
      tslint: paths.appTsLintJson,
      watch: paths.appSrc,
      async: false,
      checkSyntacticErrors: true,
    }),
    new webpack.DefinePlugin(getClientEnvironment().stringified),
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
  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed. These warnings become cumbersome.
  performance: {
    hints: false,
  },
};
