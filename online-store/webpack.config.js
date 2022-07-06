const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = (isProd) => ({
  entry: path.resolve(__dirname, './src/index.ts'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(jpg|png|svg|gif|ico|mp4)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(ejs)/,
        loader: 'ejs-compiled-loader',
      },
      {
        test: /\.(s[ca]ss)$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@common': path.resolve(__dirname, 'src/common'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@core': path.resolve(__dirname, 'src/core'),
      '@assets': path.resolve(__dirname, 'assets'),
    },
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'index.css'
    })
  ],
});

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig(isProductionMode), envConfig);
};
