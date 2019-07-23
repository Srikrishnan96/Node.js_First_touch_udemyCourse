const http = require('http');

const route = require('./route.js');

const server = http.createServer(route);

server.listen(3000);