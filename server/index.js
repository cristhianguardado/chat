const config = require('./config/config');
const app = require('./config/express');
require('./config/mongoose');

var http = require('http').createServer(app);
var io = require('socket.io')(http);

var connectCounter = 0;

http.listen(config.port, () => {
  console.info(`server started on port ${config.port} (${config.env})`);
});

io.on('connection', (socket) => {
  var total=io.engine.clientsCount;
  console.log(total)
  console.log('a user connected');
  socket.on('message', (msg) => {
    socket.broadcast.emit('message-broadcast', msg);
   });
  socket.emit('active-users',total)
});

console.log(connectCounter)

module.exports = app;
