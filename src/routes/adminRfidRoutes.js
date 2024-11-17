// routes/rfidRoutes.js
const express = require('express');
const router = express.Router();
const rfidController = require('../controllers/adminRfidController');

// Endpoint to get the latest RFID data (admin side)
router.get('/', rfidController.getLatestAdminRFIDData);

module.exports = router;
