const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function(env) {
  const baseConfig = {
    mode: env,
    context: path.resolve(__dirname, 'src'),
    entry: ['./index.js'],
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
      filename: 'app.bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [{ loader: 'babel-loader' }],
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/,
          use: [{ loader: 'url-loader', options: { limit: 40000 } }],
        },
        {
          test: /\.(woff|woff2)$/,
          use: [
            { loader: 'url-loader', options: { prefix: 'font/', limit: 5000 } },
          ],
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'url-loader',
              options: { limit: 10000, mimetype: 'application/octet-stream' },
            },
          ],
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          use: [{ loader: 'file-loader' }],
        },
      ],
    },
    plugins: [
      // *** EnvironmentPlugin ***
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      // Make bundle.js build vars available via "process.env"

      // *** CopyWebpackPlugin ***
      new CopyWebpackPlugin([{ from: path.resolve(__dirname, 'public') }]),
      // Serves content in the /public folder at the domain root
    ],
  };

  if (env === 'development') {
    return merge(baseConfig, {
      entry: [
        'webpack-hot-middleware/client?reload=false',
        // ?reload=false parameter tells webpack to avoid page reloads
      ],
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
          },
          {
            test: /\.(scss|sass)$/,
            use: [
              {
                loader: 'style-loader',
              },
              {
                loader: 'css-loader',
              },
              {
                loader: 'sass-loader',
              },
            ],
          },
        ],
      },
      plugins: [
        // *** HotModuleReplacementPlugin ***
        new webpack.HotModuleReplacementPlugin(),
        // Enable Hot Module Replacement in development

        // *** NamedModulesPlugin ***
        new webpack.NamedModulesPlugin(),
        // Print more readable module names in the browser console on HMR updates

        // *** NpmInstallWebpackPlugin ***
        // new NpmInstallWebpackPlugin(),
        // Automatically installs and uninstalls npm packages in development
        // Unfortunately the NpmInstallWebpackPlugin is not yet compatible w/ Webpack 4
        // https://github.com/webpack-contrib/npm-install-webpack-plugin/issues/122

        // *** HtmlWebpackPlugin ***
        new HtmlWebpackPlugin({
          template: 'index.ejs',
          favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
          inject: true,
          // Pass arbitrary data to template
          NODE_ENV: process.env.NODE_ENV,
        }),
      ],
    });
  } else if (env === 'production') {
    return merge(baseConfig, {
      output: {
        filename: '[name].[hash].js',
      },
      module: {
        rules: [
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              use: [{ loader: 'css-loader' }],
            }),
          },
          {
            test: /\.(scss|sass)$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader'],
            }),
          },
        ],
      },
      plugins: [
        // *** ExtractTextPlugin ***
        new ExtractTextPlugin({
          filename: '[name].[contenthash].css',
        }),
        // Generate an external css file with a hash in the filename

        // *** CleanWebpackPlugin ***
        new CleanWebpackPlugin(['dist']),

        // *** HtmlWebpackPlugin ***
        new HtmlWebpackPlugin({
          template: 'index.ejs',
          favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
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
          inject: true,
          // Pass arbitrary data to template
          NODE_ENV: process.env.NODE_ENV,
        }),
      ],
    });
  }
};
