const express = require('express');
const router = express.Router();
const rfidController = require('../controllers/rfidController');

router.get('/retrieveTag', rfidController.getLatestRFIDData);

module.exports = router;
