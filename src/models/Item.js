// src/models/itemModel.js
const knex = require('../config/database');

class Item {
    static async create(itemData) {
        const [itemId] = await knex('Items').insert(itemData).returning('ItemId');
        return itemId; // Return the newly created item ID
    }

    static async getAll() {
        return await knex('Items').select('*');
    }

    static async getById(itemId) {
        return await knex('Items').where({ ItemId: itemId }).first();
    }

    static async update(itemId, itemData) {
        return await knex('Items').where({ ItemId: itemId }).update(itemData);
    }

    static async delete(itemId) {
        return await knex('Items').where({ ItemId: itemId }).del();
    }
}

module.exports = Item;
