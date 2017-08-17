const restify = require('restify');
const server = restify.createServer();
const routes = require('../http/routes');

routes(server);

module.exports = server;