const mongoose = require('mongoose');

const userCountSchema = new mongoose.Schema({
  userCount: Number
}, {
  versionKey: false,
  collection: 'UserCount'
});


module.exports = mongoose.model('UserCount', userCountSchema);
