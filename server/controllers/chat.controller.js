const messageModel = require('../models/message.model');
const userCountModel = require('../models/userCount.model')
const ReadPreference = require('mongodb').ReadPreference;


module.exports = {
  insertMessage,
  getAllUsers
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

function getAllUsers(req, res, next) {
  const docquery = messageModel.find({}).read(ReadPreference.NEAREST);
  docquery
      .exec()
      .then(preVendors => {
          res.status(200).json(preVendors);
      })
      .catch(error => res.status(500).send(error));
}
