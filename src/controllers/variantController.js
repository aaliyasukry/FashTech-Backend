const Variant = require('../models/Variant.js');
const Item = require('../models/Item'); 

exports.createVariant = async (req, res) => {
    try {
        const { ItemId, SizeLabel, ColorName, ImageUrl, StockQuantity } = req.body;

        // Validate input
        if (!ItemId || !SizeLabel || !ColorName) {
            return res.status(400).json({ message: "Item ID, size label, and color name are required" });
        }

        // Check if the ItemId exists
        const itemExists = await Item.getById(ItemId);
        if (!itemExists) {
            return res.status(400).json({ message: "The specified ItemId does not exist" });
        }

        const variantData = {
            ItemId,
            SizeLabel,
            ColorName,
            ImageUrl,
            StockQuantity: StockQuantity || 0 // Default to 0 if not provided
        };

        const variantId = await Variant.create(variantData);
        return res.status(201).json({
            success: true,
            message: "Variant created successfully",
            variantId,
        });
    } catch (error) {
        console.error("Error creating variant:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the variant",
            error: error.message,
        });
    }
};

exports.getAllVariants = async (req, res) => {
    try {
        const variants = await Variant.getAll();
        return res.status(200).json({
            success: true,
            data: variants,
        });
    } catch (error) {
        console.error("Error fetching variants:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching variants",
            error: error.message,
        });
    }
};

exports.getVariantById = async (req, res) => {
    const { id } = req.params;

    try {
        const variant = await Variant.getById(id);
        if (!variant) {
            return res.status(404).json({ success: false, message: "Variant not found" });
        }
        return res.status(200).json({ success: true, data: variant });
    } catch (error) {
        console.error("Error fetching variant:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching the variant",
            error: error.message,
        });
    }
};

exports.updateVariant = async (req, res) => {
    const { id } = req.params;
    const { SizeLabel, ColorName, ImageUrl, StockQuantity } = req.body;

    try {
        const updated = await Variant.update(id, { SizeLabel, ColorName, ImageUrl, StockQuantity });
        if (!updated) {
            return res.status(404).json({ success: false, message: "Variant not found" });
        }
        return res.status(200).json({ success: true, message: "Variant updated successfully" });
    } catch (error) {
        console.error("Error updating variant:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the variant",
            error: error.message,
        });
    }
};

exports.deleteVariant = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Variant.delete(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Variant not found" });
        }
        return res.status(200).json({ success: true, message: "Variant deleted successfully" });
    } catch (error) {
        console.error("Error deleting variant:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the variant",
            error: error.message,
        });
    }
};
