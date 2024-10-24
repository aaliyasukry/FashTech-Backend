const ShoppingBag = require('../models/ShoppingBag'); // Adjust path if necessary

// Create a new shopping bag entry
exports.createShoppingBagEntry = async (req, res) => {
    try {
        const { pieceId, bagRFID, quantity, totalAmount } = req.body;

        // Validate input
        if (!pieceId || !bagRFID || !quantity || !totalAmount) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const [id] = await ShoppingBag.create(pieceId, bagRFID, quantity, totalAmount);
        return res.status(201).json({
            success: true,
            message: "Shopping bag entry created successfully",
            id
        });
    } catch (error) {
        console.error("Error creating shopping bag entry:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the shopping bag entry",
            error: error.message
        });
    }
};

// Get all shopping bag entries
exports.getAllShoppingBagEntries = async (req, res) => {
    try {
        const shoppingBags = await ShoppingBag.getAll();
        return res.status(200).json({
            success: true,
            data: shoppingBags
        });
    } catch (error) {
        console.error("Error fetching shopping bag entries:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching shopping bag entries",
            error: error.message
        });
    }
};

// Get shopping bag entry by ID
exports.getShoppingBagEntryById = async (req, res) => {
    const { id } = req.params;

    try {
        const shoppingBag = await ShoppingBag.getById(id);
        if (!shoppingBag) {
            return res.status(404).json({ success: false, message: "Shopping bag entry not found" });
        }
        return res.status(200).json({ success: true, data: shoppingBag });
    } catch (error) {
        console.error("Error fetching shopping bag entry:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching the shopping bag entry",
            error: error.message
        });
    }
};

// Update a shopping bag entry
exports.updateShoppingBagEntry = async (req, res) => {
    const { id } = req.params;
    const { pieceId, quantity, totalAmount } = req.body;

    try {
        const updated = await ShoppingBag.update(id, pieceId, quantity, totalAmount);
        if (!updated) {
            return res.status(404).json({ success: false, message: "Shopping bag entry not found" });
        }
        return res.status(200).json({ success: true, message: "Shopping bag entry updated successfully" });
    } catch (error) {
        console.error("Error updating shopping bag entry:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the shopping bag entry",
            error: error.message
        });
    }
};

// Delete a shopping bag entry
exports.deleteShoppingBagEntry = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await ShoppingBag.delete(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Shopping bag entry not found" });
        }
        return res.status(200).json({ success: true, message: "Shopping bag entry deleted successfully" });
    } catch (error) {
        console.error("Error deleting shopping bag entry:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the shopping bag entry",
            error: error.message
        });
    }
};
