const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
    try {
        console.log('Request Body:', req.body); 
        const { name } = req.body;

        // Validate input
        if (!name) {
            return res.status(400).json({ message: "Category name is required" });
        }

        console.log('Attempting to create category with name:', name);

        const [id] = await Category.create(name);
        console.log('Category created with ID:', id);
        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            id
        });
    } catch (error) {
        console.error("Error creating category:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the category",
            error: error.message
        });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.getAll();
        return res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching categories",
            error: error.message
        });
    }
};

exports.getCategoryById = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.getById(id);
        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }
        return res.status(200).json({ success: true, data: category });
    } catch (error) {
        console.error("Error fetching category:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching the category",
            error: error.message
        });
    }
};

exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const updated = await Category.update(id, name);
        if (!updated) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }
        return res.status(200).json({ success: true, message: "Category updated successfully" });
    } catch (error) {
        console.error("Error updating category:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the category",
            error: error.message
        });
    }
};

exports.deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Category.delete(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }
        return res.status(200).json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the category",
            error: error.message
        });
    }
};
