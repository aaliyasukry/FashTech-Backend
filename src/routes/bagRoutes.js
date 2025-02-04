const express = require('express');
const router = express.Router();
const BagController = require('../controllers/bagController'); 

// Route to create a new bag
router.post('/', BagController.createBag);

// Route to get details of a specific bag
router.get('/:bagId', BagController.getBagDetails);

router.get('/', BagController.getAllBags);

module.exports = router;
