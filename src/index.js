const app = require('./app');
const config = require('./config/config');

// eslint-disable-next-line import/order
const http = require('http');
// socket initialization
const server = http.createServer(app);
// eslint-disable-next-line import/order


server.listen(config.port, () => {});
