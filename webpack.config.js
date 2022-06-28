const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const prod = process.env.NODE_ENV === 'production';

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: {
    reactComp: './src/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        exclude: /node_modules/,
        use: ['file-loader'],
      },
      {
        test: /\.(otf|ttf|woff)$/,
        exclude: /node_modules/,
        use: ['file-loader'],
      },
    ],
  },
  devtool: prod ? undefined : 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './src/template.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: './src/images', to: './images' }],
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: './src/fonts', to: './fonts' }],
    }),
  ],
};
