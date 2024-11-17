const Bag = require('../models/Bag');
const BagItem = require('../models/BagItem');

// Create a new bag
const createBag = async (req, res) => {
    const { bagRFID } = req.body;

    if (!bagRFID) {
        return res.status(400).json({ error: 'Bag RFID is required' });
    }

    try {
        const [bagId] = await Bag.create(bagRFID);
        res.status(201).json({ message: 'Bag created successfully', bagId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating bag' });
    }
};

// Get bag details
const getBagDetails = async (req, res) => {
    const { bagId } = req.params;

    if (!bagId) {
        return res.status(400).json({ error: 'Bag ID is required' });
    }

    try {
        const bag = await Bag.findById(bagId);
        if (!bag) {
            return res.status(404).json({ error: 'Bag not found' });
        }

        // Fetch items in the bag using BagItem model
        const items = await BagItem.getItemsInBag(bagId);
        res.status(200).json({ bag, items });
    } catch (error) {
        console.error('Error retrieving bag details:', error);
        res.status(500).json({ error: 'Error retrieving bag details' });
    }
};

const getAllBags = async (req, res) => {
    try {
        const bags = await Bag.getAll(); // Assume Bag.getAll() fetches all bags
        return res.status(200).json({
            success: true,
            data: bags
        });
    } catch (error) {
        console.error("Error fetching bags:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching bags",
            error: error.message
        });
    }
};

// Update an existing bag
const updateBag = async (req, res) => {
    const { bagId } = req.params;
    const { bagRFID } = req.body;

    if (!bagRFID) {
        return res.status(400).json({ error: 'Bag RFID is required' });
    }

    try {
        const bag = await Bag.findById(bagId);
        if (!bag) {
            return res.status(404).json({ error: 'Bag not found' });
        }

        // Update the bag's RFID
        await Bag.update(bagId, bagRFID);

        res.status(200).json({ message: 'Bag updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating bag' });
    }
};

// Delete a bag
const deleteBag = async (req, res) => {
    const { bagId } = req.params;

    try {
        const bag = await Bag.findById(bagId);
        if (!bag) {
            return res.status(404).json({ error: 'Bag not found' });
        }

        await Bag.delete(bagId);
        res.status(200).json({ message: 'Bag deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting bag' });
    }
};

module.exports = {
    createBag,
    getBagDetails,
    getAllBags,
    updateBag,
    deleteBag
};
