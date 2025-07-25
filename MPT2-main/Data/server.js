const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data.json');
const middlewares = jsonServer.defaults();
const path = require('path');
const routes = require('./routes.json');
const rewriter = jsonServer.rewriter(routes);

server.use(middlewares);
server.use(rewriter);
server.use(router);

server.listen(4000, '0.0.0.0', () => {
  console.log('JSON Server is running at http://0.0.0.0:4000');
});