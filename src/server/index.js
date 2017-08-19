const restify = require('restify');
const server = restify.createServer();
const routes = require('../http/routes');
const cors = require('./cors');

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser({ mapParams: true }));

routes(server);

module.exports = server;