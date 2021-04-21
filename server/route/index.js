const Router = require('@koa/router');
const baseConf = require('../../config/base');
const os = require('os');

const router = new Router({
  prefix: baseConf.reqNameSpace.portal,
});

router.get('/user', (ctx) => {
  const user = ctx.request.headers.staffname || os.userInfo().username;

  ctx.body = user;
});

const route = router.routes();

module.exports = route;
