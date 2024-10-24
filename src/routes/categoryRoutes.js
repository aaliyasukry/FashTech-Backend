// routes/categoryRoutes.js
const express = require('express');
const {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');

const router = express.Router();

// CRUD routes
router.post('/', createCategory); // Create a new category
router.get('/', getAllCategories); // Get all categories
router.get('/:id', getCategoryById); // Get category by ID
router.put('/:id', updateCategory); // Update category by ID
router.delete('/:id', deleteCategory); // Delete category by ID

module.exports = router;
