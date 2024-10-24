const express = require('express');
const router = express.Router();
const requestsController = require('../controllers/requestController');

// Create a new request
router.post('/', requestsController.createRequest);

// Get all requests
router.get('/', requestsController.getAllRequests);

// Get request by ID
router.get('/:id', requestsController.getRequestById);

// Update a request
router.put('/:id', requestsController.updateRequest);

// Delete a request
router.delete('/:id', requestsController.deleteRequest);

module.exports = router;
