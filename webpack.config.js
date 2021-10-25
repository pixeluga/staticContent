const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (webpackConfigEnv, argv) => {
  return {
    mode: argv.mode,
    entry: './src/index.js',
    optimization: {
      minimizer: [
        '...',
        new CssMinimizerPlugin(),
        new HtmlMinimizerPlugin({
          minimizerOptions: {
              minifyCSS: true,
              minifyJS: true,
            },
          }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: "html-loader",
          options: {
            minimize: argv.mode === 'production',
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'news-and-updates.html',
        template: 'src/news-and-updates.html',
      }),
      new HtmlWebpackPlugin({
        filename: 'review.html',
        template: 'src/review.html',
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/**/*.svg', to: '[name][ext]' },
          { from: 'src/**/*.png', to: '[name][ext]' },
        ],
      }),
    ],
    output: {
      clean: true,
      publicPath: '',
    },
  };
}