const knex = require('../config/database'); 

class ShoppingBag {
    static async create(pieceId, bagRFID, quantity, totalAmount) {
        return await knex('ShoppingBag').insert({
            PieceId: pieceId,
            BagRFID: bagRFID,
            Quantity: quantity,
            TotalAmount: totalAmount
        }).returning('BagId');
    }

    static async getAll() {
        return await knex('ShoppingBag').select('*');
    }

    static async getById(id) {
        return await knex('ShoppingBag').where({ BagId: id }).first();
    }

    static async update(id, pieceId, quantity, totalAmount) {
        const result = await knex('ShoppingBag').where({ BagId: id }).update({
            PieceId: pieceId,
            Quantity: quantity,
            TotalAmount: totalAmount
        });
        return result > 0;
    }

    static async delete(id) {
        const result = await knex('ShoppingBag').where({ BagId: id }).del();
        return result > 0;
    }
}

module.exports = ShoppingBag;
