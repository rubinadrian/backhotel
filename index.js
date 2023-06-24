const server = require('./server');
const routes = require('./routes');
const express = require('express');

const app = express();
server.configure(app,express);
routes(app);
server.start(app);