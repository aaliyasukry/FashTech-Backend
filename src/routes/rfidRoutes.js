const express = require('express');
const router = express.Router();
const rfidController = require('../controllers/rfidController');

// Check RFID for bag or piece
router.post('/retrieveTag', rfidController.listenForRFIDTags)
// router.post('/check', rfidController.checkRFID);
// Add other routes if needed...

module.exports = router;
