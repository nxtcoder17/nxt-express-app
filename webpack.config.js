const path = require('path');
const webpack = require('webpack');
const NodemonPlugin = require('nodemon-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

const productionOnly = {
  mode: 'production',
  entry: './index.js',
  optimization: {
    minimize: false,
    // minimize: true,
    // minimizer: [
    // new UglifyWebpackPlugin({
    // uglifyOptions: {
    // mangle: false,
    // },
    // }),
    // ],
  },
};

const developmentOnly = {
  mode: 'development',
  entry: './index.dev.js',
  externals: [nodeExternals()],
};


module.exports = (env = {production: false }) => {
  const isProduction = env.production;
  console.log(
      `Build Environment set to ${isProduction ? 'production' : 'development'}`
  );

  return ({
    target: 'node',
    ...(isProduction ? productionOnly : developmentOnly),
    entry: './index.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'index.js',
    },
    module: {
      rules: [
        {
          test: /.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              rootMode: 'upward',
            },
          },
        },
      ],
    },
    plugins: [
      new NodemonPlugin(),
      // new webpack.ContextReplacementPlugin(
      //     /(express\/lib|any-promise|fastest-validator|typeorm|app-root-path)/,
      //     'node_modules'
      // ),
      // new FilterWarningsPlugin({
      //   exclude: [ /mongodb/ ],
      // }),
    ],
    resolve: {
      alias: {
        '#commons': path.resolve(__dirname, './src/commons'),
        '#app': path.resolve(__dirname, './src/app'),
        '#modules': path.resolve(__dirname, './src/modules'),
        '#config': path.resolve(__dirname, './config'),
      },
      extensions: ['.js'],
    },
  });
};
