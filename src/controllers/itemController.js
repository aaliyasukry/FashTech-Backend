const Item = require('../models/Item'); 

exports.createItem = async (req, res) => {
    try {
        const { Name, Description, Price, StockQuantity, CategoryId, Material, Type } = req.body;

        // Validate input
        if (!Name || !Price) {
            return res.status(400).json({ message: "Item name and price are required" });
        }

        const itemData = {
            Name,
            Description,
            Price,
            StockQuantity: StockQuantity || 0, // Default to 0 if not provided
            CategoryId,
            Material,
            Type,
        };

        const itemId = await Item.create(itemData);
        return res.status(201).json({
            success: true,
            message: "Item created successfully",
            itemId,
        });
    } catch (error) {
        console.error("Error creating item:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the item",
            error: error.message,
        });
    }
};

exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.getAll();
        return res.status(200).json({
            success: true,
            data: items,
        });
    } catch (error) {
        console.error("Error fetching items:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching items",
            error: error.message,
        });
    }
};

exports.getItemById = async (req, res) => {
    const { id } = req.params;

    try {
        const item = await Item.getById(id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }
        return res.status(200).json({ success: true, data: item });
    } catch (error) {
        console.error("Error fetching item:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching the item",
            error: error.message,
        });
    }
};

exports.updateItem = async (req, res) => {
    const { id } = req.params;
    const { Name, Description, Price, StockQuantity, CategoryId, Material, Type } = req.body;

    try {
        const updated = await Item.update(id, {
            Name,
            Description,
            Price,
            StockQuantity,
            CategoryId,
            Material,
            Type,
        });

        if (!updated) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }

        return res.status(200).json({ success: true, message: "Item updated successfully" });
    } catch (error) {
        console.error("Error updating item:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the item",
            error: error.message,
        });
    }
};

exports.deleteItem = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Item.delete(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }
        return res.status(200).json({ success: true, message: "Item deleted successfully" });
    } catch (error) {
        console.error("Error deleting item:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the item",
            error: error.message,
        });
    }
};
