const Request = require('../models/Request'); // Adjust path if necessary

// Create a new request
exports.createRequest = async (req, res) => {
    try {
        const { variantId } = req.body;

        // Validate input
        if (!variantId) {
            return res.status(400).json({ message: "VariantId is required" });
        }

        const [id] = await Request.create(variantId);
        return res.status(201).json({
            success: true,
            message: "Request created successfully",
            id
        });
    } catch (error) {
        console.error("Error creating request:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the request",
            error: error.message
        });
    }
};

// Get all requests
exports.getAllRequests = async (req, res) => {
    try {
        const requests = await Request.getAll();
        return res.status(200).json({
            success: true,
            data: requests
        });
    } catch (error) {
        console.error("Error fetching requests:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching requests",
            error: error.message
        });
    }
};

// Get request by ID
exports.getRequestById = async (req, res) => {
    const { id } = req.params;

    try {
        const request = await Request.getById(id);
        if (!request) {
            return res.status(404).json({ success: false, message: "Request not found" });
        }
        return res.status(200).json({ success: true, data: request });
    } catch (error) {
        console.error("Error fetching request:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching the request",
            error: error.message
        });
    }
};

// Update a request
exports.updateRequest = async (req, res) => {
    const { id } = req.params;
    const { variantId } = req.body;

    try {
        const updated = await Request.update(id, variantId);
        if (!updated) {
            return res.status(404).json({ success: false, message: "Request not found" });
        }
        return res.status(200).json({ success: true, message: "Request updated successfully" });
    } catch (error) {
        console.error("Error updating request:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the request",
            error: error.message
        });
    }
};

// Delete a request
exports.deleteRequest = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Request.delete(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Request not found" });
        }
        return res.status(200).json({ success: true, message: "Request deleted successfully" });
    } catch (error) {
        console.error("Error deleting request:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the request",
            error: error.message
        });
    }
};
