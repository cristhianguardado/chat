const express = require('express');
const chatRoutes = require('./chat.route');
const ioRoutes = require('./io.route')

const router = express.Router();

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/chat', chatRoutes);
router.use('/getTotalUsers', ioRoutes)

module.exports = router;
