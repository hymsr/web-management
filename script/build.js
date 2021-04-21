const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge, mergeWithRules } = require('webpack-merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
let webpackConf = require('../config/webpack.config')();

webpackConf = merge(webpackConf, {
  mode: 'production',
  plugins: [
    new webpack.ProgressPlugin((percentage, msg) => {
      console.log(`${(percentage * 100).toFixed(2)}%: ${msg}`);
    }),
    new CleanWebpackPlugin({
      verbose: true,
      dry: false,
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
});

webpackConf.module = mergeWithRules({
  rules: {
    test: 'match',
    use: {
      loader: 'match',
      options: 'replace',
    },
  },
})(webpackConf.module, {
  rules: [
    {
      test: /\.(tsx?|jsx?)$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      ],
    },
  ],
});

webpack(webpackConf).run((err, stats) => {
  if (err) {
    console.error('err: ', err.stack || err.details || err);
    return;
  }

  const statsJson = stats.toJson();

  if (stats.hasErrors()) {
    console.error('stats: ', statsJson.errors);
    return;
  }

  console.log(`build done in ${statsJson.time} ms`);
});
