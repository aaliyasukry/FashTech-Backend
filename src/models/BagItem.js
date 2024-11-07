const knex = require('../config/database');

class BagItem {
    // Add an item (piece) to a bag
    static async addToBag(bagId, pieceId, quantity) {
        return knex('BagItems').insert({
            BagId: bagId,
            PieceId: pieceId,
            Quantity: quantity
        });
    }

    // Get all items in a specific bag
    static async getItemsInBag(bagId) {
        try {
            const result = await knex('BagItems')
                .join('Pieces', 'BagItems.PieceId', 'Pieces.PieceId')
                .join('Variants', 'Pieces.VariantId', 'Variants.VariantId')
                .join('Items', 'Variants.ItemId', 'Items.ItemId')
                .select('Items.Name', 'Variants.SizeLabel', 'Variants.ColorName', 'Items.Price', 'BagItems.Quantity')
                .where('BagItems.BagId', bagId);

            return result;
        } catch (error) {
            console.error('Error retrieving items from bag:', error);
            throw error;  // Re-throw error to be handled in the controller
        }
    }

    // Update the quantity of an item in the bag
    static async updateQuantity(bagId, pieceId, quantity) {
        return knex('BagItems')
            .where('BagId', bagId)
            .andWhere('PieceId', pieceId)
            .update({ Quantity: quantity });
    }

    // Remove an item from the bag
    static async removeFromBag(bagId, pieceId) {
        return knex('BagItems')
            .where('BagId', bagId)
            .andWhere('PieceId', pieceId)
            .del();
    }

}

module.exports = BagItem;