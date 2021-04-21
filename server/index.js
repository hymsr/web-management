const Koa = require('koa');
const fs = require('fs');
const koaStatic = require('koa-static');
const path = require('path');
const cors = require('@koa/cors');
const logger = require('koa-logger');
const serverConf = require('./config');
const route = require('./route');

const app = new Koa();

let html;

if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
  html = fs.readFileSync(path.join(__dirname, '../dist/index.html'), { encoding: 'utf8' });
} else {
  html = 'missing index.html';
}

app.use(logger());

app.use(cors());

app.use(koaStatic(path.join(__dirname, '../dist')));

app.use(route);

app.use(async (ctx) => {
  ctx.response.headers['content-type'] = 'text/html';
  ctx.body = html;
});


app.listen(serverConf.serverPort, () => {
  console.log(`run at http://localhost:${serverConf.serverPort}`);
});
