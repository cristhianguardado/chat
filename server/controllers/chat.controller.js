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
    nickName: body.nickName,
    message: body.message,
  };
  const newNotification = new Model(data);
  newNotification.save()
    .then(notification => {
      res.json(notification)
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
