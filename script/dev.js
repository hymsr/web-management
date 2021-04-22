const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { merge } = require('webpack-merge');
const baseConf = require('../config/base');
const serverConf = require('../server/config');
let webpackConf = require('../config/webpack.config')();

webpackConf = merge(webpackConf, {
  mode: 'development',
  devtool: 'eval-source-map',
});

const server = new WebpackDevServer(webpack(webpackConf), {
  hot: true,
  inline: true,
  index: 'index.html',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  historyApiFallback: true,
  // 本地开发模式下的转发规则
  proxy: {
    // 统一后台服务，转发往后台网关
    [baseConf.reqNameSpace.api]: {
      target: 'https://www.liiux.cn',
      pathRewrite: { [`^${baseConf.reqNameSpace.api}`]: '/server' },
      changeOrigin: true,
    },
    // portal服务，直接转发给本地portal
    [baseConf.reqNameSpace.portal]: {
      target: `http://localhost:${serverConf.serverPort}`,
      changeOrigin: true,
    },
  },
});

server.listen(serverConf.devPort, 'localhost', () => {
  console.log(`start dev at http://localhost:${serverConf.devPort}/`);
});
