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
        res.json(bags);
    } catch (error) {
        console.error("Error fetching bags:", error);
        res.status(500).json({ error: "Failed to fetch bags" });
    }
};

module.exports = {
    createBag,
    getBagDetails,
    getAllBags
};
