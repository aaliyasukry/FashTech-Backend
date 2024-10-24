const knex = require('../config/database'); // Adjust the path as necessary

class Request {
    static async create(variantId) {
        return await knex('Requests').insert({ VariantId: variantId }).returning('RequestId');
    }

    static async getAll() {
        return await knex('Requests').select('*');
    }

    static async getById(id) {
        return await knex('Requests').where({ RequestId: id }).first();
    }

    static async update(id, variantId) {
        const result = await knex('Requests').where({ RequestId: id }).update({ VariantId: variantId });
        return result > 0;
    }

    static async delete(id) {
        const result = await knex('Requests').where({ RequestId: id }).del();
        return result > 0;
    }
}

module.exports = Request;
