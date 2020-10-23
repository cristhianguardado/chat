const express = require('express');
const messageCtrl = require('../controllers/chat.controller');
const router = express.Router();

module.exports = router;

router.get('/getTotalUsers', messageCtrl.getAllUsers);
router.post('/', messageCtrl.insertMessage);


