/* global require process console */
/* jshint esversion: 6 */

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const colors = require('colors');
const swaggerDocument = require('./swagger.json');
const db = require('./data-layer/database');

// Web Server
const app = express();
const PORT = process.env.PORT || 9000;
const HOST = process.env.HOST || 'http://localhost';

// Database
db.authenticate()
.then(() => console.log('Database connected'.green))
.catch(err => console.log(('Error', err).red))

// CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

// WebSockets
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const connections = [];

const notifyAll = (topic, type) => {
  for (let index = 0; index < connections.length; index++) {
    connections[index].emit(topic, {type: type});
  }
};

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

require('./routes')(app, notifyAll);

io.on('connection', (socket) => {
  connections.push(socket);
  notifyAll('connection');
  console.log('Socket client connected'.green);
});

// Run Service
server.listen(PORT, () => {
  console.log(('Server running on ' + HOST + ':' + PORT).green);
});
