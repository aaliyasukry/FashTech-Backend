const express = require('express');
const router = express.Router();
const BagItemController = require('../controllers/bagItemController');

// Route to add an item to the bag
router.post('/', BagItemController.addItemToBag);

// Route to update the quantity of an item in the bag
router.put('/', BagItemController.updateItemQuantity);

// Route to remove an item from the bag
router.delete('/', BagItemController.removeItemFromBag);

router.get('/:bagId', BagItemController.getItemsInBag);

module.exports = router;
