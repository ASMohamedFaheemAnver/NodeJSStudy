var server = require('./Server');
var router = require('./Router');
var handler = require('./Handler');

var handle = {};
handle["/"] = handler.home;
handle["/home"] = handler.home;
handle["/review"] = handler.review;
server.startServer(router.route, handle);