var server = require('./Server');
var router = require('./Router');

server.startServer(router.route);