const express = require('express');
const router = express.Router();
const shoppingBagController = require('../controllers/shoppingBagController');

// Create a new shopping bag entry
router.post('/', shoppingBagController.createShoppingBagEntry);

// Get all shopping bag entries
router.get('/', shoppingBagController.getAllShoppingBagEntries);

// Get shopping bag entry by ID
router.get('/:id', shoppingBagController.getShoppingBagEntryById);

// Update a shopping bag entry
router.put('/:id', shoppingBagController.updateShoppingBagEntry);

// Delete a shopping bag entry
router.delete('/:id', shoppingBagController.deleteShoppingBagEntry);

module.exports = router;
