const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;

/**
 * Remote locations differ between local development and GitHub Pages.
 * They are resolved here at build time rather than hardcoded in source, so
 * no deployment-specific URL appears anywhere in the application code.
 *
 * Independent deployment still holds: redeploying a remote publishes new
 * code at the same URL, and the shell picks it up on the next page load
 * without being rebuilt.
 */
const REMOTES = {
  development: {
    angular: 'http://localhost:4201/',
    vue: 'http://localhost:4202/',
  },
  production: {
    angular: 'https://soulhay.github.io/amor-lineribus-angular/',
    vue: 'https://soulhay.github.io/amor-lineribus-vue/',
  },
};

module.exports = (env, argv) => {
  const mode = argv.mode === 'production' ? 'production' : 'development';
  const isProd = mode === 'production';
  const remotes = REMOTES[mode];

  return {
    entry: './src/index.js',
    mode,
    devServer: {
      port: 3000,
      historyApiFallback: true,
    },
    output: {
      publicPath: isProd ? '/amor-lineribus-shell/' : 'auto',
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      clean: true,
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        { test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader' },
        { test: /\.s?css$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'shell',
        remotes: {
          angularRemote: `amorLineribusAngular@${remotes.angular}remoteEntry.js`,
          vueRemote: `vueRemote@${remotes.vue}remoteEntry.js`,
        },
        shared: {
          react: { singleton: true, requiredVersion: deps.react },
          'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
        },
      }),
      new HtmlWebpackPlugin({ template: './public/index.html' }),
    ],
  };
};