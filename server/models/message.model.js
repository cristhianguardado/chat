const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  userName: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false,
  collection: 'Message'
});


module.exports = mongoose.model('Message', MessageSchema);
