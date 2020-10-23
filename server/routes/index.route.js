const express = require('express');
const chatRoutes = require('./chat.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);


router.use('/chat', chatRoutes);

module.exports = router;
