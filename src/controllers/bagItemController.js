const BagItem = require('../models/BagItem');

// Add an item (piece) to a bag
const addItemToBag = async (req, res) => {
    const { bagId, pieceId, quantity } = req.body;

    if (!bagId || !pieceId || !quantity) {
        return res.status(400).json({ error: 'Bag ID, Piece ID, and Quantity are required' });
    }

    try {
        await BagItem.addToBag(bagId, pieceId, quantity);
        res.status(200).json({ message: 'Item added to bag successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding item to bag' });
    }
};

// Update the quantity of an item in the bag
const updateItemQuantity = async (req, res) => {
    const { bagId, pieceId, quantity } = req.body;

    if (!bagId || !pieceId || quantity === undefined) {
        return res.status(400).json({ error: 'Bag ID, Piece ID, and Quantity are required' });
    }

    try {
        await BagItem.updateQuantity(bagId, pieceId, quantity);
        res.status(200).json({ message: 'Item quantity updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating item quantity' });
    }
};

// Remove an item from the bag
const removeItemFromBag = async (req, res) => {
    const { bagId, pieceId } = req.body;

    if (!bagId || !pieceId) {
        return res.status(400).json({ error: 'Bag ID and Piece ID are required' });
    }

    try {
        await BagItem.removeFromBag(bagId, pieceId);
        res.status(200).json({ message: 'Item removed from bag successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error removing item from bag' });
    }
};

const getItemsInBag = async (req, res) => {
    const { bagId } = req.params;

    if (!bagId) {
        return res.status(400).json({ error: 'Bag ID is required' });
    }

    try {
        const items = await BagItem.getItemsInBag(bagId);
        if (items.length === 0) {
            return res.status(404).json({ error: 'No items found in the bag' });
        }

        res.status(200).json({ items });
    } catch (error) {
        console.error('Error retrieving items for the bag:', error);
        res.status(500).json({ error: 'Error retrieving items for the bag' });
    }
};

module.exports = {
    addItemToBag,
    updateItemQuantity,
    removeItemFromBag,
    getItemsInBag
};
