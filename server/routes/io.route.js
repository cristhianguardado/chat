const express = require('express');
const router = express.Router();

module.exports = router;

router.get('/', (req, res) => {
  const io = req.app.locals.io
  let ioResponse = req.app.locals.io.eio.clientsCount
  res.json({total: ioResponse})
});

module.exports = router;
