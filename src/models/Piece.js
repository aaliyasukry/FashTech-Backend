const knex = require('../config/database'); 

class Piece {
    static async getByTagUID(tagUID) {
        const result = await knex('Pieces').where({ TagUID: tagUID }).first();
        return result
    }

    static async create(variantId, tagUID) {
        return await knex('Pieces').insert({ VariantId: variantId, TagUID: tagUID }).returning('PieceId');
    }

    static async getAll() {
        return await knex('Pieces').select('*');
    }

    static async getById(id) {
        return await knex('Pieces').where({ PieceId: id }).first();
    }

    static async update(id, variantId, tagUID) {
        const result = await knex('Pieces').where({ PieceId: id }).update({ VariantId: variantId, TagUID: tagUID });
        return result > 0;
    }

    static async delete(id) {
        const result = await knex('Pieces').where({ PieceId: id }).del();
        return result > 0;
    }
}

module.exports = Piece;
