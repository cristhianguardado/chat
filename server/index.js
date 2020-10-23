const config = require('./config/config');
const app = require('./config/express');
require('./config/mongoose');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

http.listen(config.port, () => {
  console.info(`server started on port ${config.port} (${config.env})`);
});

io.on('connection', (socket) => {
  var total=io.engine.clientsCount;
  console.log(total)
  connectCounter = total;
  console.log('a user connected');
  socket.on('message', (msg) => {
    socket.broadcast.emit('message-broadcast', msg);
   });
  socket.emit('active-users',total)
});


app.locals.io = io;

module.exports = app;
