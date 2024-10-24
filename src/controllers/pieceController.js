const Piece = require('../models/Piece'); // Adjust path if necessary

// Create a new piece
exports.createPiece = async (req, res) => {
    try {
        const { variantId, tagUID } = req.body;

        // Validate input
        if (!variantId || !tagUID) {
            return res.status(400).json({ message: "VariantId and TagUID are required" });
        }

        const [id] = await Piece.create(variantId, tagUID);
        return res.status(201).json({
            success: true,
            message: "Piece created successfully",
            id
        });
    } catch (error) {
        console.error("Error creating piece:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the piece",
            error: error.message
        });
    }
};

// Get all pieces
exports.getAllPieces = async (req, res) => {
    try {
        const pieces = await Piece.getAll();
        return res.status(200).json({
            success: true,
            data: pieces
        });
    } catch (error) {
        console.error("Error fetching pieces:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching pieces",
            error: error.message
        });
    }
};

// Get piece by ID
exports.getPieceById = async (req, res) => {
    const { id } = req.params;

    try {
        const piece = await Piece.getById(id);
        if (!piece) {
            return res.status(404).json({ success: false, message: "Piece not found" });
        }
        return res.status(200).json({ success: true, data: piece });
    } catch (error) {
        console.error("Error fetching piece:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching the piece",
            error: error.message
        });
    }
};

// Update a piece
exports.updatePiece = async (req, res) => {
    const { id } = req.params;
    const { variantId, tagUID } = req.body;

    try {
        const updated = await Piece.update(id, variantId, tagUID);
        if (!updated) {
            return res.status(404).json({ success: false, message: "Piece not found" });
        }
        return res.status(200).json({ success: true, message: "Piece updated successfully" });
    } catch (error) {
        console.error("Error updating piece:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the piece",
            error: error.message
        });
    }
};

// Delete a piece
exports.deletePiece = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Piece.delete(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Piece not found" });
        }
        return res.status(200).json({ success: true, message: "Piece deleted successfully" });
    } catch (error) {
        console.error("Error deleting piece:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the piece",
            error: error.message
        });
    }
};
