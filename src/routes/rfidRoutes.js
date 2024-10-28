const express = require('express');
const router = express.Router();
const rfidController = require('../controllers/rfidController');

router.post('/retrieveTag', rfidController.listenForRFIDTags);

module.exports = router;
