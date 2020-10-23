const messageModel = require('../models/message.model');
const ReadPreference = require('mongodb').ReadPreference;
const ConnectCounter = require('../index')


module.exports = {
  insertMessage
}

function insertMessage(req, res, next) {
  var body = req.body;
  const data = {
    userName: body.userName,
    message: body.message,
  };

  const newMessage = new messageModel(data);
  newMessage.save()
    .then(message => {
      res.json(message)
    })
    .catch(e => res.status(500).send(e));
}
