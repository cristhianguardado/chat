const config = require('./config/config');
const app = require('./config/express');
require('./config/mongoose');

var http = require('http').createServer(app);
var io = require('socket.io')(http);

http.listen(config.port, () => {
  console.info(`server started on port ${config.port} (${config.env})`);
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('message', (msg, userName) => {
    console.log("server: " + userName + " " + msg);
    socket.broadcast.emit('message-broadcast', msg);
   });
});

module.exports = app;
