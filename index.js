// Main starting point of the app
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');

const app = express();

// App Setup
// both morgan and body-parser are middleware in express
// Any incoming request will be passed into the middleware
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app); // http low level built in node library
server.listen(port);
console.log('Server listening on: ', port);
